---
page:
  variables:
    title: X Cursors and Gumby
    time: 3:19AM
    date: 2012-05-14
---
I've been playing around with Xlib lately and I found out that X11 comes with a great set of cursors included by default. I was pretty excited when I found out the X developers decided to throw Gumby into the mix! Look at this cursor here:

![Gumby X Cursor Light](/images/gumby_light.gif)
![Gumby X Cursor Dark](/images/gumby_dark.gif) 

Yep Gumby is included in Xlib. Check out cursor number 56 in [Xlib Appendix B: X Font Cursors](http://tronche.com/gui/x/xlib/appendix/b) which defines XC_gumby. Gumby can be used in an Xlib program like this:

<pre class="sh_c">
//Assumes you have previously defined display and window
Cursor cursor;
cursor = XCreateFontCursor(display, 56);
XDefineCursor(display, *window, cursor);
</pre>


[XCreateFontCursor()](http://tronche.com/gui/x/xlib/pixmap-and-cursor/XCreateFontCursor.html), part of [Xlib](http://tronche.com/gui/x/xlib), takes in two parameters: your display (type Display) and the shape for the cursor (type unsigned int). XCreateFontCursor() gives you a variable (of type Cursor) which you can use with [XDefineCursor()](http://tronche.com/gui/x/xlib/window/XDefineCursor.html) to set the cursor for the given display and window.

In anycase, I just wanted to share this and thank the X developers for including Gumby as a standard cursor! He'll come in use.
