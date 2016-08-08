var toolbarUI;

// Create the toolbar ui iframe and inject it in the current page
function initToolbar(searchTerm) {
  var url = "toolbar/ui.html?searchTerm=" + searchTerm;
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "augmentedSearch");
  iframe.setAttribute("src", chrome.runtime.getURL(url));
  iframe.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 10000; width: 100%; height: 200px;");

  document.body.appendChild(iframe);

  return toolbarUI = {
    iframe: iframe, visible: true
  };
}

function toggleToolbar(toolbarUI, searchTerm) {
  console.log("toggleToolbar");
  if (toolbarUI.visible) {
    toolbarUI.visible = false;
    toolbarUI.iframe.style["display"] = "none";
  } else {
    toolbarUI.visible = true;
    toolbarUI.iframe.style["display"] = "block";
  }
}

// Handle messages from the add-on background page (only in top level iframes)
if (window.parent == window) {
  chrome.runtime.onMessage.addListener(function(msg) {
    console.log("something happen"); 
    if (msg.msg == "toggle-in-page-toolbar") {
      
      if (toolbarUI) {
        toggleToolbar(toolbarUI, msg.searchTerm);
      } else {
        toolbarUI = initToolbar(msg.searchTerm);
      }
    }
  });
}

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
  chrome.runtime.sendMessage({"url": target.href, "searchTerm": searchTerm,
                              "innerHTML": target.innerHTML});
}


window.addEventListener("click", notifyExtension);

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

/* showing the toolbar if we have saved searches */
if (extractDomain(document.URL) == 'duckduckgo.com') {
  var searchTerm = getSearchTerm(document.URL);
  chrome.runtime.sendMessage({"url": "searching", "searchTerm": searchTerm});
}

