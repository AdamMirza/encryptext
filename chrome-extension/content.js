console.log("yo bitches");

chrome.storage.onChanged.addListener(function(changes, namespace){
    console.log("changes found");
    for (key in changes) {
        let storageChange = changes[key]; 
        console.log("updated storage: %s::%s", key, storageChange.newValue);
    }
});

chrome.storage.local.get("text", function(res){
    console.log("grabbing");
    console.log(res);
});
