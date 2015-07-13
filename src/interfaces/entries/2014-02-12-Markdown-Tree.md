---
title: Markdown Tree
description: Markdown Site Generator
category: web
status: 'production'
sort_index: 2
links:
    'Source' : http://github.com/mil/markdown-tree
    'Example Site': http://markdown-tree.bladdo.net
    'My College Notes': http://notes.bladdo.net
footnotes:
    - Feel free to install a <code>Procfile</code> and deploy to <a href="http://heroku.com">Heroku</a> or any Passanger-enabled web host.
    - 'Ask me to show you my failed start-up which I developed in college, evolving out of Markdown Tree, <a href="/interfaces/Mil-Edit">Mil Edit</a>, and <a href="/interfaces/Mmvp.js">Mmvp.js</a>.'
---

Markdown Tree is a small [Sinatra](http://www.sinatrarb.com)-based Ruby [script](https://github.com/mil/markdown-tree/blob/master/markdown-tree.rb) which serves a [folder of markdown files](https://github.com/mil/markdown-tree/tree/master/content) as a minimalistic [live styled site](http://markdown-tree.bladdo.net).  E.g. given the folder structure:

<pre data-language>
My Notes/
    Schedule.md
    History/
    Science/
        Some-Note.md
</pre>

You'll get a dynamic site on `localhost:3000`<sup>1</sup> with a navigation header for browsing looking like:

<div id="markdown-tree" class='interface-demo'>
    <div id="path">
        <a href="#">My Notes</a>
    </div>
    <div id="menu">
        <ul>
            <li class='current'><a href="#">Schedule</a></li>
            <li class='folder'><a href="#">History</a></li> 
            <li class='folder'><a href="#">Science</a></li> 
        </ul>
    </div>
</div>

For a live example, visit [my notes from college](http://notes.bladdo.net) and compare against the [raw folder structure](http://github.com/mil/School) of my notes<sup>2</sup>.
