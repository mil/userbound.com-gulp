---
title: Window Resizing in Xlib
time: 2:02AM
date: 2012-05-29
---
In many minimal X window managers, the model for resizing windows follows the form of: hold down a modifier key, press the secondary click, and drag. This functionality can be seen in [i3](http://i3wm.org) and [TinyWM](http://incise.org/tinywm.html) among many other X window managers.  But what happens when you're in resize mode, dragging, and hit the border on the left or top side (i.e. the window is as small as it can get vertically/horizontally)? Well you've hit the border. 

Below is a snippet of the window manager I'm working on. In my window manager, instead of just hitting the border / threshold when resizing, the window actually flips. So if you start to drag over the border to left or the top, the window will actually invert (not the content but the layout). 


<pre class="sh_c">
//This struct's values are set in the ButtonPress Event
typedef struct {
  XButtonEvent       buttonEvent;
  XWindowAttributes  attributes;
} PointerMotion;
PointerMotion origin;
</pre>
<pre class="sh_c">
//Within the MotionNotify Event
/* Calculate Difference between current position original click */
int xDifference = event -&gt; xbutton.x_root - origin.button.x_root;
int yDifference = event -&gt; xbutton.y_root - origin.button.y_root;

/* Data for XMoveResize if contracting/expanding normally */
int newX = origin.attributes.x;
int newY = origin.attributes.y;
int newWidth = origin.attributes.width + xDifference;
int newHeight = origin.attributes.height + yDifference;

/* Check if Drag is to the left or top of window, flip window */
if (newWidth == 0) { newWidth = 1; } else if (newWidth &lt; 1 ) {
  newX     = newX + xDifference + origin.attributes.width;
  newWidth = (xDifference * -1) - origin.attributes.width;
}
if (newHeight == 0) { newHeight = 1; } else if (newHeight &lt; 1) {
  newY      = newY + yDifference + origin.attributes.height;
  newHeight = (yDifference * -1) - origin.attributes.height;
}

/* Fire to XMoveResizeWindow */
XMoveResizeWindow(display, origin.button.subwindow,newX, newY, newWidth, newHeight);
</pre>

Basically, if drag difference plus the window's original width/height is less than one, then we're dragging over the border of the top/left. In that case, the width/height is effectivly inverted and the x/y is set accordingly. Note: the check for the height/width == 0 is to prevent X from erroring out.

For a more in context sample see my project, [Simple WM](http://github.com/mil/simple-wm), on GitHub. 
