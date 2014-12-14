---
page:
  variables:
    title: ii - A Better Way to IRC
    date: 2012-06-11
    time: 9:23PM
---
[ii](http://tools.suckless.org/ii) is a better IRC client created by the great folk at [suckless](http://suckless.org). ii is an IRC client that works completely via the filesystem and FIFOs to provide files and folders representing the servers, channels, and chats you are in on IRC. Sound interesting? To me it sure did -- but I found rather sparse documentation on using ii. Thus, the creation of this post. ii doesn't need much explanation as its usage is basic and it is just 500 lines of C, but it can seem intimidating and impractical for personal use at first glance. However, its a joy once you have ii working and realize its simplicity. This guide should get you headed in that path.


### Setting Up ii
So how does one use the ii in practicality? The first step is to grab yourself a copy of [ii from suckless](http://tools.suckless.org/ii), extract the .tar.gz, and do a standard make/install (I'll assume you can do that much on your own).

Once you've done that, run **ii** for the first time with:

<pre class="sh_c">ii -s irc.freenode.net -n yournick</pre>

The folder **~/irc** will be created containing all of your IRC data as such: 

<pre class="sh_c">
irc/irc.freenode.net
|-- chanserv
|   `-- out
|-- nickserv
|   |-- in
|   `-- out
|-- out
`-- in
</pre>

While ii is running that means you are connected to the server. If you look in **~/irc** you should see a folder named **irc.freenode.net** and within that folder, two folders: **chanserv** and **nickserv**. Keep an eye on **~/irc** though usage as all ii does is work with the data in that folder.

If you have a registered nickname you'd like to identify with, simply go into the **nickserv** folder, echo to the **in** FIFO, and verify the results with tail like so:

<pre class="sh_c">cd ~/irc/irc.freenode.net/nickserv
echo "identify mysupersecretpassword" > in
tail -n 2 out
</pre>

Assuming you entered the correct password, the nickserv should have identified you. Now your free to enter any channels you might like. The method for joining channels is just like how you talked to the **nickserv**. Here is an example of joining **#testchannel** within **irc.freenode.net**:

<pre class="sh_c">cd ~/irc/irc.freenode.net/
echo "/j #testchannel" > in
</pre>

Now in the **irc.freenode.net** folder you should see a folder named **#testchannel**. Within that folder again, there are **in** and **out** files. Echo something to **in** it will be sent to the channel. The **out** file contains everything you get back from the channel. This should be pretty basic and simple to understand, and that's the point.

So what about viewing the **out** file? cat? No. I don't think you want to be cat'ing the **out** file every few seconds to check for new conversation. This is the exact kind of thing **tail** was built for. Additionally tail can be combined another script in order to add syntax highlighting. Another option is using [multitail](http://www.vanheusden.com/multitail) and [some rules](http://nion.modprobe.de/blog/archives/440-Using-the-ii-irc-client.html). However, I didn't want to install another package, so I just wrote [my own script](http://github.com/mil/configs-and-bins/blob/master/bins/regexColorize) for syntax highlighting with **tail**. Here's what my ii **out** files look like when viewed:

<img src="/images/regex-colorize.png" alt="Colorizing ii output with regex-colorize" />

The colors can be changed easily via my script. Feel free to grab and modify [my regexColorize script from my github]( http://github.com/mil/configs-and-bins/blob/master/bins/regexColorize). I use my **regexColorize** to view my out files like this:

<pre class="sh_c">tail -f -n 500 out | regexColorize</pre>

And that's about it... A simple setup for using the ii irc client. I usually throw my tails piped to regexColorize in tmux, but you can read about using tmux or screen in many other places.  Finally - if you don't like my methods for using ii, other options include: [PCW - Popup Chat Windows](http://bitbucket.org/emg/pcw) or a [Multitail Solution](http://nion.modprobe.de/blog/archives/440-Using-the-ii-irc-client.html). Regardless, I hope I will have made a few irssi, xchat, etc fans convert to ii.
