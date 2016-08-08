/* extract the search term for DuckDuckGo */
function getSearchTerm(href) {
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash[0] == 'q') {
          return hash[1];
        }
    }
    return null;
}

function notifyExtension(e) {
  var target = e.target;
  while ((target.tagName != "A" || !target.href) && target.parentNode) {
    target = target.parentNode;
  }
  if (target.tagName != "A")
    return;
  var searchTerm = getSearchTerm(document.URL);
  console.log(searchTerm);
  console.log(target.href);
  chrome.runtime.sendMessage({"url": target.href, "searchTerm": searchTerm});
}

window.addEventListener("click", notifyExtension);
