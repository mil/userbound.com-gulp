---
title: Markdown Tree
description: Serve a hierarchy of Markdown files as a live styled site.
category: web
sort_index: 2
links:
    'Source' : http://github.com/something
    'Example Site': http://sdjfoidsfjoi.com
---
## Overview
As a freshman in college, I tried just about every notes SAAS and package I could find. Meanwhile, I was teaching myself to use `vim`, and eventually convinced myself, it'd be better to just take my notes as plain-text markdown in `vim`. Taking notes in `vim` was great, but I needed a way to display my notes. I decided to write a simple little ruby script to solve my problem.


## Default Template
The default template has a navigation bar at top, the content, and a footer on each page. The navigation bar looks like this:

![Markdown Tree Navigation](/interfaces/Markdown-Tree/markdown-tree-nav.png)

I also wanted to stay with a simplistic style for my content elements. Hierarchical structure within lists was important for me. Thus: 

![Markdown Tree Navigation](/interaces/Markdown-Tree/markdown-tree-list.png)

As for the footer, it would be purely functional. Tell me when the page was generated and let me validate if need be.

![Markdown Tree Navigation](/interfaces/Markdown-Tree/markdown-tree-footer.png)

<hr class="dotted" />

## Technical Details
Sinatra was an quite ideal solution. Sinatra is a ruby library that gives you a simple method of creating web applications. Also Red Carpet, included with Sinatra, gave me a way to render Markdown! All I needed was the logic of the application and it was done. All said and done the whole thing (the ruby/logic) came out only 70 lines!

Feel free to [grab the source on GitHub](https://github.com/mil/markdown-tree) for yourself.
