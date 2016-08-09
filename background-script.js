/*
  Stores the last five URLs clicked for each search on DuckDuckGo
*/

function notify(message) {
  console.log("background script received message");

  var searchTerm = message.searchTerm;
  var url = message.url;
  var innerHTML = message.innerHTML;

  
  if (url == 'close-toolbar') {
    toggleToolbar(searchTerm); 
    return;
  }
  
  if (url == "searching") {
    // we're searching
    console.log("Searching");
    chrome.storage.local.get(function(result) {
       if (typeof(result[searchTerm]) !== 'undefined' && result[searchTerm] instanceof Array) {
         console.log(result[searchTerm]);
         if (result[searchTerm].length > 0) {
           toggleToolbar(searchTerm);
         }
       }
    });

  } else {
    // we clicked
    console.log("Clicked");
    var item = {'url': url, 'innerHTML': innerHTML};

    chrome.storage.local.get(function(result) {
      var items = result[searchTerm];
      if (typeof(items) !== 'undefined' && items instanceof Array) {
        var updated = false;

        for (var i = 0; i < items.length; i++) {
          console.log(items[i].url);
    
          // update
          if (items[i].url == url) {
            result[searchTerm][i] = item;
            updated = true;
            chrome.storage.local.set(result);
          }
        }

        if (!updated) {
           result[searchTerm].splice(0, 0, item);
           result[searchTerm] = result[searchTerm].slice(0, 5);
           chrome.storage.local.set(result);
        }

      } else {
        result[searchTerm] = [item];
        chrome.storage.local.set(result);
      }

      chrome.storage.local.get(function(res) {console.log(res);});

    });
  }
}

chrome.runtime.onMessage.addListener(notify);

// Send a message to the current tab's content script.
function toggleToolbar(searchTerm) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {"msg": "toggle-in-page-toolbar", 
                                         "searchTerm": searchTerm, 
                                         });
  });
}

// Handle connections received from the add-on toolbar ui iframes.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.sender.url == chrome.runtime.getURL("toolbar/ui.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(toggleToolbar);
  }
});


