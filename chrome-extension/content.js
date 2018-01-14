chrome.storage.onChanged.addListener(function(changes, namespace){
    console.log("changes found");
    let newVals = changes["wrap"]["newValue"];
    let origin = newVals["original"];
    let text = newVals["text"];
    document.body.innerHTML = document.body.innerHTML.replace(origin,text);
});

chrome.storage.local.get(null, function(res){
    console.log("grabbing : "+res["text"]+" -- "+res["original"]);
});
