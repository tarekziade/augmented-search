/*
  Stores the last five URLs clicked for each search on DuckDuckGo
*/

function notify(message) {
  console.log("background script received message");

  var searchTerm = message.searchTerm;
  var url = message.url;

  chrome.storage.local.get(function(result) {

    if(typeof(result[searchTerm]) !== 'undefined' && 
       result[searchTerm] instanceof Array) {
      if (result[searchTerm].indexOf(url) == -1) {
        result[searchTerm].splice(0, 0, url);
        result[searchTerm] = result[searchTerm].slice(0, 5)
        chrome.storage.local.set(result);
      }
    } else {
      result[searchTerm] = [url];
      chrome.storage.local.set(result);
    }

    chrome.storage.local.get(function(res) {console.log(res);});

  });
}

chrome.runtime.onMessage.addListener(notify);
