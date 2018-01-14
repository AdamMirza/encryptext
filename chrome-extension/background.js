//encrypt text
function encrypt(text){
    //myName = text.split("@")[0];
    //message = text.split("@")[1];
    //let xhr = new XMLHttpRequest(); 
    //xhr.open("POST", "URL", true); 
    //xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.send(JSON.stringify({
    //    "username": myName, 
    //    "message": message
    //}));

    //xhr.onreadyStateChange = function() { 
    //    if (this.ready.State != 4) return; 
    //    if (this.status == 200){ 
    //        let data = JSON.parse(this.responseText);
    //    }
    //};
    
    return "encrypting: "+text;
};

//decrypt text
function decrypt(text){
    return "decrypting: "+text;
};

//onclick handler of the context-menus 
//whenever user clicks on option of right click
function getWord(info,tab){
    if (info.menuItemId ==  "decrypt"){
        let origin = info.selectionText;
        let text = decrypt(origin);
        let pusher = {};
        let wrapper = {};
        pusher["original"] = origin; 
        pusher["text"] = text; 
        wrapper["wrap"] = pusher
        chrome.storage.sync.set(wrapper);

    } else { 
        let origin = info.selectionText;
        let text = encrypt(origin);
        let pusher = {};
        let wrapper = {};
        pusher["original"] = origin; 
        pusher["text"] = text; 
        wrapper["wrap"] = pusher
        chrome.storage.sync.set(wrapper);

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
});
