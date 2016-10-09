

document.addEventListener('DOMContentLoaded', function() {
  console.log("")
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

  }, false);
}, false);

function sendStartInfo() {
    console.log("sending start info");
    chrome.extension.sendMessage({greeting: "startInfo", word: document.getElementById().innerHTML.trim()},
        function (response) {
            console.log(response);
            // tabURL = response.navURL;
            // $("#tabURL").text(tabURL);
        });
}