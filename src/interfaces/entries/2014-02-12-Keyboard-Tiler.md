---
title: Keyboard Tiler
#description: Simple window tiling script for floating window managers.
description: Window Tiling Script
category: linux
status: 'production'
links:
    Source: https://github.com/mil/keyboard-tiler
    Python Port: https://github.com/ShadowKyogre/keyboard-tiler
sort_index: 101
---


Keyboard Tiler is a simple script which given 2 keys on your keyboard, maps a window to the screen using the keyboard grid as referent.  

On a keyboard, the keys from **1** down to **Z** over to **/**, and up to **0** is a 4x10 grid. Given the 40 from your keyboard, keyboard tiler maps the visual space of your screen to the grid of your keyboard.

<div class='interface-hero block'><table id="keyboard">
	<tr> <td class="hit act">1</td> <td class="hit">2</td> <td class="hit">3</td> <td class="hit">4</td> <td class="hit">5</td> <td>6</td> <td>7</td> <td>8</td> <td>9</td> <td>0</td> </tr>

	<tr> <td class="hit">Q</td> <td class="hit">W</td> <td class="hit">E</td> <td class="hit">R</td> <td class="hit">T</td> <td>Y</td> <td>U</td> <td>I</td> <td>O</td> <td>P</td> </tr>

	<tr> <td class="hit">A</td> <td class="hit">S</td> <td class="hit">D</td> <td class="hit">F</td> <td class="hit">G</td> <td>H</td> <td>J</td> <td>K</td> <td>L</td> <td>;</td> </tr>

	<tr> <td class="hit">Z</td> <td class="hit">X</td> <td class="hit">C</td> <td class="hit">V</td> <td class="hit act">B</td> <td>N</td> <td>M</td> <td>&lt;</td> <td>&gt;</td> <td>/</td> </tr>
</table></div>

So in the above example, hitting **1 and B** would place and resize a window to occupy the entire **left half your screen because that's the left half of your keyboard**. This works for any two keys.  My intention was to create an obvious and intuitive mental model for keyboard-driven window management.

I scripted around `xdotool` so I could focus on the logic of processing the two points and positioning the window on the screen rather than building out a full window manager. The [entire script](http://github.com/mil/keyboard-tiler/blob/master/keyboard-tiler.rb) works to calculate the variables used, ultimatly pushing to xdotool as:

<pre class="sh_ruby">
%x[xdotool getactivewindow windowmove --sync #{startX} #{decorationsHeight + startY}]
%x[xdotool getactivewindow windowsize --sync #{newWidth} #{newHeight - (decorationsHeight * 2)}]
</pre>

Providing keybindings is another task separate from the logic of my key processing script. For the keybindings my first thought was to use [xchainkeys](http://code.google.com/p/xchainkeys). This way I could have emacs style key chording for pressing two keys in positioning.  To generate the keybindings for xchainkeys, I created the [logic to generate all permutations](https://github.com/mil/keyboard-tiler/blob/master/utils/generate-xchains.rb) for any two keys on the grid being pressed:

<pre class="sh_ruby">
$tiles = [
	[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ],
	[ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p' ],
	[ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';' ],
	[ 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/' ]
]

def crawl(s)
	$tiles.each_with_index do |row, column|
		row.each_with_index do |cell, count|	
			# This is 1 Permutation! 
			# This will be hit 1560 times!
		end
	end
end

$tiles.each_with_index do |row, column|
	row.each_with_index do |cell, count|
		crawl(cell)
	end
end
</pre>

You can also use this script with [Dmenu](http://tools.suckless.org/dmenu/) if your handy with pipes and the only disadvantage over xbindkeys is you have to hit enter after your two keys. An example of how to setup Dmenu can be found in the project's [README](http://github.com/mil/keyboard-tiler).
