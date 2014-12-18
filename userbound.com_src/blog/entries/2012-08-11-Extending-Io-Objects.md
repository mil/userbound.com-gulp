---
title: Extending Io's Objects
categories: blog
time: 11:47PM
---
Recently, I've been working in a little language called [Io](http://iolanguage.com). Io is a prototype-based programming language that feels a lot like Smalltalk. Io takes the object message passing style very seriously. Resulting, everything in Io is an object. Io's syntax is very succint and incredibly extendable. It's very meta, and thats a good thing.

In Io, when you create a string, it is of type **Sequence** which is a more broad object providing a sequence of data elements to manipulate. The fact that a string is really just a **Sequence** is good, but can be troubling. For example, how does one determine the character at a certain location of a **Sequence**? The **Sequence**'s handy **at** message will just give you the integer of the entry at a specific location in the sequence:

<pre class="sh_c">
Io> myString := "abcdefgh"
==> abcdefgh
Io> myString at(4)
==> 100
</pre>

Well I don't think 100 was what I was looking for. However, 100 being a **Number** object, can use the **asCharacter** message to find out what character 100 represents in ASCII.

<pre class="sh_c">
Io> 100 asCharacter
==> d
</pre>

But this is all very round about. How about adding our own atCharacter() method to Sequence to make the process simpler:

<pre class="sh_c">
Io> Sequence charAt := method(pos, thisContext at(pos) asCharacter)
==> method(pos, thisContext at(pos) asCharacter)
</pre>

Io has no problem with this as why should you not be able to extend objects as such? After you add the **charAt** method to **Sequence**, you can more simply determine the character at a specific location in a string:

<pre class="sh_c">
Io> myString := "abcdefgh"
==> abcdefgh
Io> myString charAt(3)
==> d
</pre>

This is the kind of thing that makes Io very badass.
