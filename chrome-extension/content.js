console.log("hello content");
chrome.storage.onChanged.addListener(function(changes, namespace){
    console.log("changes found");
    let newVals = changes["wrap"]["newValue"];
    let origin = newVals["original"];
    let text = newVals["text"];
    document.body.innerHTML = document.body.innerHTML.replace(origin,text);
});

