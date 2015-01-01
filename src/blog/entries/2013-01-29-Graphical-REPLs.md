---
title: Graphical REPLs?
categories: blog
date: 2013-01-29
time: 12:30AM
---
Where are all the Graphical Read Evaluate Print Loop Interfaces? Where is the graphical shell? There was [TermKit](http://github.com/unconed/TermKit) a bit back, but TermKit relied on Node.JS plus Webkit.. which was a fragile solution. Though, conceptually, TermKit was right on target.  But what might the "ideal" graphical REPL look like? 

Is a HTML DOM tree styled with CSS adequate to represent *any* output?  Does it make sense to wrap it all in Webkit? How do we hook into files?  Or do we need a new way to represent the output of command line applications?  A new shell with a new objects system too? 

Say we build this Graphical REPL.. Will the line then blur between graphical and command-line-applications? Or are graphical and command line enviroments destined to stay divided?
