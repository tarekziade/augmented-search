# augmented-search

## What it does

This extension includes:

* a content script, "content-script.js", that is injected into all pages
* a background script, "background-script.js"

The content script listens for clicks in the page it's attached to.
If a click is on a link, on a DuckDuckGo results page, the content 
script sends the link's href to the background script, with the search 
term.

The background script listens for this message. When the background script
receives the message, it stores the linked page with the search term.

When the user search for the same term again, if the storage has URLs
stored, a side bar displays them.

