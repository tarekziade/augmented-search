# augmented-search

## Pitch

We're all doing the same searches again & again on the
internet, sometimes to try to find back a page we visited 
some time ago.

It takes time and discipline to manage bookmarks, or search
our history, and we usually end up just searching again for 
the page we want to go back to.

This little WebExtension saves the last 5 links you
clicked for a given search, and the next time you do
the same search, shows them to you. It's like
an automatic bookmarker.


## What it does

This extension includes:

* a content script, "content-script.js", that is injected into all pages
* a background script, "background-script.js"
* a toolbar page, in toolbar"

The content script listens for clicks in the page it's attached to.
If a click is on a link, on a DuckDuckGo results page, the content 
script sends the link to the background script, with its associated
search term.

The background script listens for this message. When the background script
receives the message, it stores the linked page with its associated 
search term.

When the user search for the same term again, if the storage has URLs
stored, a footer displays them. The user can click on them or
remove them.

