
chrome.runtime.onMessage.addListener( // Receive messages from backend
  function(request, sender, sendResponse) {
    // console.log("request Received from background : ");
    // console.log(request);


    // request for number of a word on the page
    if(request.greeting == "reportNumWords") {
      alert("Your score right now is " + request.score);
      chrome.runtime.sendMessage({count: getCount("hello")}, function(response) {
        // console.log(response);
      }); 
    }

    if(request.greeting == "start") {
      start();
    }

    //request to log a value
    if(request.greeting == "log") {
      console.log(request.message);
    }
  });

function getCount(str) {
	
  var markup = document.body.outerHTML;

  ["script", "style"].forEach(function(tag) {
    // console.log(tag);
    while(markup.indexOf("<" + tag) >= 0) {
      var start = markup.indexOf("<" + tag);
      var end = markup.indexOf("</" + tag + ">") + ("</" + tag + ">").length;
      markup = markup.substring(0, start) + " " + markup.substring(end);
    }
  });

  markup = markup.split("<").map(function(e) {
    var tag = e.substring(0, e.indexOf(">"));
    return e.split(">")[1];
  }).join(" ");

  markup = markup.toLowerCase();

  // console.log(markup);

  return markup.split(str.toLowerCase()).length - 1;

}

function start() {
  console.log("in start");
    var person = prompt("Enter a word", "Hello");
    if (person != null) {
      console.log("sending");
        chrome.runtime.sendMessage({"greeting":"setWord", "word": person});
    }
}

// // content.js
// chrome.runtime.onMessage.addListener(
// // 	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
// // 		console.log(response);
// // 	});
//   function(request, sender, sendResponse) {
//     if(request.message === "clicked_browser_action" ) {
//       var firstHref = $("a[href^='http']");
//
//       console.log()
//     }
//   }
// );