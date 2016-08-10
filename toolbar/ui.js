// Connect to the background page.
var port = chrome.runtime.connect();

// Handle click events on the toolbar button.
document.querySelector("#toggle").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  console.log("posting message");
  chrome.runtime.sendMessage({"url": "close-toolbar"});
  console.log("posted message");
});


document.querySelector("#b0").addEventListener("click", function() {
    removeItem(0);
});
document.querySelector("#b1").addEventListener("click", function() {
    removeItem(1);
});
document.querySelector("#b2").addEventListener("click", function() {
    removeItem(2);
});

document.querySelector("#b3").addEventListener("click", function() {
    removeItem(3);
});
document.querySelector("#b4").addEventListener("click", function() {
    removeItem(4);
});



function getSearchTerm(href) {
  var hashes = href.slice(href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash[0] == 'searchTerm') {
          return hash[1];
        }
  }
  return null;
}


var searchTerm = getSearchTerm(document.URL);

console.log(searchTerm);

chrome.storage.local.get(function(result) {
  console.log(result[searchTerm]);
  var items = result[searchTerm];

  if (typeof(items) !== 'undefined') {
    console.log("here");

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      console.log(item);
      var ul = document.getElementById("result" + i);
      ul.innerHTML = '<a href="' + item.url + '">' + item.innerHTML + '</a>';
      document.getElementById("li" + i).style.display = "block";
    }
  }
  else {
    console.log("what");
  }
});

if (searchTerm) {
  document.getElementById("searchTerm").innerHTML = searchTerm;
}


function removeItem(number) {
  chrome.storage.local.get(function(result) {
    var items = result[searchTerm];
    for (var i = 0; i < items.length; i++) {
      if (i == number) {
         console.log(items);
         items.splice(i, 1);
         chrome.storage.local.set(result);
         document.location.reload();
         return;
      }
    }
  });
}


