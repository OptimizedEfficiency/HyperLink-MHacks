// // background.js

// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

var score = 0;
var running = false;
var numClicksLeft = 10;
var word = "";

chrome.webNavigation.onCompleted.addListener(function(details) { // sends message to page as soon as it loads

    if(details.frameId === 0) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"greeting": "reportNumWords", "word": "hello", "score" :score}, function(response) {
                    score += response.count();
                });
            });
            numClicksLeft--;
            if(numClicksLeft <= 0) {
                
            }
    }

    // //if(detail.frameId === 0) {
    //     // log("word = " + word);
    //     if(running && details.frameId === 0) {
    //         log("score: " + score);
    //         log("running: " + running);
    //         log("numClicksLeft: " + numClicksLeft);

    //         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //             var activeTab = tabs[0];
    //             chrome.tabs.sendMessage(activeTab.id, {"greeting": "reportNumWords", "word": word});
    //         });
    //         numClicksLeft--;
    //         if(numClicksLeft <= 0) {
    //             running = false;
    //         }
    //     } else {
    //         log("queing");
    //         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //             var activeTab = tabs[0];
    //             chrome.tabs.sendMessage(activeTab.id, {"greeting": "start"});
    //         });
    //     }
    // //}
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.greeting == "setWord") {
        word = greeting.word;
        running = true;
        log("Word set");
    }
});


function log(val) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"greeting": "log", "message": val});
    });
}


// chrome.runtime.onMessage.addListener(  
//     function(request, sender, sendResponse) {
//         count += request.count;
//         sendResponse({"totalCount": count});
//     }
// );

// chrome.extension.onMessage.addListener( function(request,sender,sendResponse) //recieves message from popup
// {
//     	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     		var activeTab = tabs[0];
//     		chrome.tabs.sendMessage(activeTab.id, request);
//   		});
// }