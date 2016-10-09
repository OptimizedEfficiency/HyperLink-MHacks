// // background.js

// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

var count = 0;

chrome.webNavigation.onCompleted.addListener(function(details) { // sends message to page as soon as it loads
	if(details.frameId === 0) {
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    		var activeTab = tabs[0];
    		chrome.tabs.sendMessage(activeTab.id, {"greeting": "reportNumWords"});
  		});
	}
});

chrome.runtime.onMessage.addListener(  
    function(request, sender, sendResponse) {
        count += request.count;
        sendResponse({"totalCount": count});
    }
);

chrome.extension.onMessage.addListener( function(request,sender,sendResponse) //recieves message from popup
{
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    		var activeTab = tabs[0];
    		chrome.tabs.sendMessage(activeTab.id, request);
  		});
}