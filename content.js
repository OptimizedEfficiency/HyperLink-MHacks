
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if(request.greeting == "reportNumWords") {
      chrome.runtime.sendMessage({count: getCount("LaunchPad")}, function(response) {
        console.log(response);
      });
    }
  });

function getCount(str) {
	
  var markup = document.body.outerHTML;

  ["script", "style"].forEach(function(tag) {
    console.log(tag);
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

  console.log(markup);

  return markup.split(str.toLowerCase()).length - 1;

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