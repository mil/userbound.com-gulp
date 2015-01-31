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
Markdown Tree is a small ruby script that serves a heirarchy of markdown files as a live styled site. This is good if you maintain a folder with a bunch of markdown files to view in-browser.

I developed this as a college freshman. After trying just about every notes software I could find, I got sick, bit the bullet and decided to take my notes in plain-text `markdown` using `vim`.  Giving myself a simple `yaml` configuration file, it let you specify, the folder with your markdown files and a Liquid template<sup>1</sup>.

<pre class='sh_ruby'>
site-title: Markdown Tree Example Site 
template-folder: template
hierarchy-folder: content 
markdown-extension: md
</pre>

Given a [folder of markdown files](), you get a minimal live styled site with a header navigation allows you to traverse the folders and files looking like:

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
