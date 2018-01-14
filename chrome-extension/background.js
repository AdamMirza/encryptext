//encript text
function encript(text){
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
    
    return "encripting: "+text;
};

//decript text
function decript(text){
    return "decripting: "+text;
};

//onclick handler of the context-menus 
//whenever user clicks on option of right click
function getWord(info,tab){
    chrome.storage.local.set({"text": info.selectionText});
    if (info.menuItemId ==  "decript"){
        chrome.storage.local.set({"text": decript(info.selectionText)});
    } else { 
        chrome.storage.local.set({"text": encript(info.selectionText)});
    }
};

chrome.contextMenus.onClicked.addListener(getWord);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    let contexts = ["page","selection","link","editable","image","video", "audio"];
    //for (let i = 0; i < contexts.length; i++) {
    //    let context = contexts[i];
    //    chrome.contextMenus.create({"title": "Convert This String "+contexts[i], "contexts":[context], "id": "context " + context});
    //}
    let id = chrome.contextMenus.create({"title": "Convert This String", "contexts":contexts, "id": "context"});

    //choices
    //chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
    chrome.contextMenus.create(
        {"title": "decript", "parentId": id, "id": "decript", "contexts": contexts});
    chrome.contextMenus.create(
        {"title": "encript", "parentId": id, "id": "encript", "contexts": contexts});
});
