// Connect to the background page.
var port = chrome.runtime.connect();

// Handle click events on the toolbar button.
document.querySelector("#toggle").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  port.postMessage({"msg": "toggle-in-page-toolbar"});
});


function getUrls(href) {
  var hashes = href.slice(href.indexOf('?') + 1).split('&');
  console.log(hashes);

  for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        console.log(hash);

        if (hash[0] == 'urls') {
          return hash[1].split(',');
        }
  }
  return null;
}


var urls = getUrls(document.URL)

for (var i = 0; i < urls.length; i++) {
  console.log("result" + i);
  var ul = document.getElementById("result" + i);
  ul.innerHTML = urls[i];
}

