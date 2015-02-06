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
footnotes:
    - 'Ask me to show you my failed start-up inspired by <a href="/interfaces/Markdown-Tree">markdown tree</a>, built around <a href="/interfaces/Mil-Edit">mil edit</a> and <a href="/interfaces/Mmvp.js">Mmvp.js</a>'
---

Markdown Tree is a small ruby script that serves a hierarchy of markdown files as a live styled site. This is good for browsing a folder of markdown files you maintain in the browser.

I created Markdown Tree as a college freshman shortly after I started taking my notes in [plain text markdown](http://github.com/mil/School). At the time, I decided I needed a way to review my notes in a prettier format than within the terminal where I took down the notes. 


<div class='captioned-image'>
<img src="/interfaces/Markdown-Tree/rep.jpg" alt="Representation of Markdown Tree">
<span class='caption'>A representation of what markdown tree does for you. Converts a (nested) folder of markdown files into a live styled site.</span>
</div>


And [Markdown Tree](https://github.com/mil/markdown-tree) was born.  Feeding it a [folder of markdown files](https://github.com/mil/markdown-tree/tree/master/content), yields a [minimal live styled site](http://markdown-tree.bladdo.net) with a navigation header allowing you to traverse the tree. 

Here's what the default theme navigation header looks like:

<div id="markdown-tree" class='interface-demo'>
    <div id="path">
        <a href="#">Top Level</a>
    </div>
    <div id="menu">
        <ul>
            <li class='folder'><a href="#">One</a></li> <li class='page'><a href="#">Two</a></li>
            <li class='current'><a href="#">Three</a></li>
        </ul>
    </div>
</div>

Markdown Tree is implemented as a [simple under 100 line ruby script](https://github.com/mil/markdown-tree/blob/master/markdown-tree.rb). It's a little bit amateurish, but completely functional. The evolution of Markdown Tree eventually inspired my [mil edit](/interfaces/Mil-Edit) and further developments<sup>1</sup>.
