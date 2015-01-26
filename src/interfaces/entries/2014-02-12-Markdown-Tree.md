---
title: Markdown Tree
description: Serve a hierarchy of Markdown files as a live styled site.
category: web
status: 'production'
sort_index: 2
links:
    'Source' : http://github.com/mil/markdown-tree
    'Example Site': http://markdown-tree.bladdo.net
    'My Notes': http://notes.bladdo.net
---


<div class='interface-hero'>
<div class='window-chrome'><img src="/interfaces/Asciiw/screenshot.png"></div>
<span class='caption'></span>
</div>

Serve a hierarchy of Markdown files as a live styled site.


Markdown Tree is a small ruby script that serves a heirarchy of markdown files as a live styled site. 

As a freshman in college, I tried just about every notes SAAS and package I could find. Meanwhile, I was teaching myself to use `vim`, and eventually convinced myself, it'd be better to just take my notes as plain-text markdown in `vim`. Taking notes in `vim` was great, but I needed a way to display my notes. I decided to write a simple little ruby script to solve my problem.

Sinatra was an quite ideal solution. Sinatra is a ruby library that gives you a simple method of creating web applications. Also Red Carpet, included with Sinatra, gave me a way to render Markdown! All I needed was the logic of the application and it was done. All said and done the whole thing (the ruby/logic) came out only 70 lines!

<div id="markdown-tree">
    <div id="path">
        <a href="#">Top Level</a>
    </div>
    <div id="menu">
        <ul>
            <li class='folder'><a href="#">One</a></li>
            <li class='page'><a href="#">Two</a></li>
            <li class='current'><a href="#">Three</a></li>
        </ul>
    </div>
</div>
