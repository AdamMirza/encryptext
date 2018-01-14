//TODO: change domain
//request user name, private key, public key
function refreshUser(){
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET","http://localhost:3000/api/me",true);
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 ) {
            let data = xhr.responseText;
            let wrapper = {}; 
            let wrapper2= {};
            wrapper["contacts"] = data; 
            wrapper2["contacts"] = wrapper;
            chrome.storage.local.set(wrapper2);
        }
    };
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
}

refreshUser();

//encrypt text
//take message + friend's pub key, go through pgp and run
function encrypt(text, friend){
    message = text.split("@")[0];

    let xhr = new XMLHttpRequest(); 
    let data= "";

    //query for friend's public key from friend's username
    xhr.open("POST","http://localhost:3000/api/messages/encrypt",false);
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 ) {
            data = xhr.responseText;
        }
    };
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send({
        "msg":message, 
        "friendPK":friend
    });
   
    while (data == "");
    return JSON.parse(data)["Encrypted"];
};

//decrypt text
//take encripted message => decript the message
function decrypt(text){
    let xhr = new XMLHttpRequest(); 
    let data= "";

    //query for a decrypted message
    xhr.open("POST","http://localhost:3000/api/messages/decrypt/",false);
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 ) {
            console.log(xhr.responseText);
            data = JSON.parse(xhr.responseText);
            console.log(data);
        }
    };
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send({
        "msg":text
    });
   
    while (data == "");
    return data["Decrypted"] || data["error117"];
};

function addFriend(origin){
    //name = origin.substring(0,origin.length-8);
    ////query for a decrypted message
    //xhr.open("GET","http://localhost:3000/api/addFriend/"+name,false);
    //xhr.onreadystatechange = function() { 
    //    if (xhr.readyState == 4 ) {
    //        data = JSON.parse(xhr.responseText);
    //    }
    //};
    //xhr.setRequestHeader('Content-Type','application/json');
    //xhr.send();

    //console.log("adding friends");
    //while (data == "");
    //return data;
};

//onclick handler of the context-menus 
//whenever user clicks on option of right click
function getWord(info,tab){
    console.log("line 93ing");
    let origin = info.selectionText;
    if (info.menuItemId.includes("decrypt")){
        //chrome.storage.local.get("myInfos",function(res){
        //    let text = decrypt(origin,res["privateKey"]);
        //    let pusher = {};
        //    let wrapper = {};
        //    pusher["original"] = origin; 
        //    pusher["text"] = text; 
        //    wrapper["wrap"] = pusher
        //    chrome.storage.sync.set(wrapper);
        //});
        let text = decrypt(origin);
        let pusher = {};
        let wrapper = {};
        pusher["original"] = origin; 
        pusher["text"] = text; 
        wrapper["wrap"] = pusher;
        chrome.storage.sync.set(wrapper);

    } else if (info.menuItemId.includes("encrypt")){ 
        let text = encrypt(origin,info.menuItemId.split("@")[0]);
        let pusher = {};
        let wrapper = {};
        pusher["original"] = origin; 
        pusher["text"] = text; 
        wrapper["wrap"] = pusher;
        chrome.storage.sync.set(wrapper);
    } else {
        //add friend 
        addFriend(origin);
    }
};

chrome.contextMenus.onClicked.addListener(getWord);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    let contexts = ["page","selection","link","editable","image","video", "audio"];
    
    let id = chrome.contextMenus.create({"title": "Convert This String", "contexts":contexts, "id": "context"});

    //choices
    //chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
    chrome.contextMenus.create(
        {"title": "decrypt", "parentId": id, "id": "decrypt", "contexts": contexts});
    chrome.contextMenus.create(
        {"title": "encrypt", "parentId": id, "id": "encrypt", "contexts": contexts});
    chrome.contextMenus.create( {"title": "Add as Friend", "parentId": id, "id": "AddFriend", "contexts": contexts});
    //get friends name from local storage
    chrome.storage.local.get("contacts",function(res){
        for (let child of ["decrypt","encrypt"]){
            for (let ele of JSON.parse(res["contacts"]["contacts"])["contacts"]){
                chrome.contextMenus.create({"title": ele["eb"], "parentId": child, "id": ele["key"]+"@"+child, "contexts": contexts});
            }
        }
    });
});
