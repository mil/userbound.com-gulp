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

Markdown Tree is a small ruby script that serves a heirarchy of markdown files as a live styled site. This is good for browsing a folder of markdown files you maintain in the browser.

<div class='captioned-image'>
<img src="/interfaces/Markdown-Tree/rep.png">
<span class='caption'>A representation of what markdown tree does for you. Converts a (nested) folder of markdown files into a live styled site.</span>
</div>

As a college freshman, after trying just about every notes software I could find, I bit the bullet and decided to take my notes in plain-text `markdown` using `vim`. 

I decided I needed a to review my notes in a prettier format than the within the terminal where I took the notes. So I made [Markdown Tree]().  Feeding it a [folder of markdown files](), yields a minimal live styled site with a navigation header allowing you to traverse the tree:

<div id="markdown-tree" class='interface-demo'>
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

Markdown Tree is implemented as a [simple under 100 line ruby script](). It's a little bit ameturish, but completly functional. The evolution of Markdown Tree eventually inspired my [mil edit]() and further developments<sup>1</sup>.

<ol class='footnotes'>
    <li>The default template looks [pretty](). Here's [another]() template someone developed.</li>
    <li>Ask me to show you my failed start-up inspired by [markdown tree](), built around [mil edit]() and [Mmvp.js]()</li>
</ol>
