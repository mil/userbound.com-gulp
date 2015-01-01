---
title: Markdown Tree
description: Serve a hierarchy of Markdown files as a live styled site.
categories: [ misc ]
links:
    'Source' : http://github.com/something
    'Example Site': http://sdjfoidsfjoi.com
---
## Organization and Displaying Markdown Files
I hopped around between so many different note taking solutions as a college freshman I knew every service and application available, however none satisfied my need. Essentially what I was looking for was **a drop-dead simple way for taking textual notes**. I soon came to realize that what I needed out of a notes system was **2 interactions**:

The first interaction would be **taking the notes themselves**. Around the time I built Markdown Tree I had become quite accustomed to VIM's modal editing and I felt that I was a lot faster in VIM than any other interface. Thus, I needed a markup language to work with inside of VIM with. I chose Markdown as it was the most straightforward and simplistic solution I could find.

The second interaction would be **displaying the notes**. I wanted a way to display the notes on multiple devices of different sizes. A web interface was the most logical solution. I knew that I could work the CSS so that my notes would look good on any device. From there it was just a matter of figuring out how to get my Markdown notes in hierarchy structure to render as HTML.

<hr class="dotted" />

## Default Template
The default template has a navigation bar at top, the content, and a footer on each page. The navigation bar looks like this:

![Markdown Tree Navigation](/images/markdown-tree-nav.png)

I also wanted to stay with a simplistic style for my content elements. Hierarchical structure within lists was important for me. Thus: 

![Markdown Tree Navigation](/images/markdown-tree-list.png)

As for the footer, it would be purely functional. Tell me when the page was generated and let me validate if need be.

![Markdown Tree Navigation](/images/markdown-tree-footer.png)

<hr class="dotted" />

## Technical Details
Sinatra was an quite ideal solution. Sinatra is a ruby library that gives you a simple method of creating web applications. Also Red Carpet, included with Sinatra, gave me a way to render Markdown! All I needed was the logic of the application and it was done. All said and done the whole thing (the ruby/logic) came out only 70 lines!

Feel free to [grab the source on GitHub](https://github.com/mil/markdown-tree) for yourself.
