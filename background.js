chrome.contextMenus.create({
    id: "annotate",
    title: "Annotate this image",
    contexts:["image"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "annotate") {
     chrome.tabs.executeScript({
        code: "window.urlToFetch = '"+info.srcUrl+"';"
        
      }, append_jquery(tab));
    }
});
append_content_script = function(tab) {
  chrome.tabs.executeScript(tab.id, {file: 'jquery.min.js'});
}
append_jquery = function(tab) {
  chrome.tabs.executeScript(tab.id, {file: 'content.js'},  append_content_script(tab));
}
