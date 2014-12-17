---
title: Mplayer's FIFO
date: 2012-08-14
time: 9:01AM
---
I was incredibly excited when I found out that mplayer can be controlled via a FIFO. It wasn't a huge suprise as ofcourse there must be some IPC for mplayer, but still, this is awesome.

First make the FIFO for mplayer:

<pre class="sh_c">
mkfifo /home/mil/fifos/mplayer
</pre>

Now, you can control mplayer via the FIFO by specifying a file with -input:

<pre class="sh_c">
mplayer -input file=/home/mil/fifos/mplayer somemediafiles 
echo "pt_step 1" > /home/mil/fifos/mplayer
echo "pause" > /home/mil/fifos/mplayer
</pre>

Let's see all the available commands that the FIFO accepts:

<pre class="sh_c">mplayer -input cmdlist</pre>

And finally if you don't want to have to use the -input file= syntax every time you start mplayer, you can have mplayer by default open the FIFO by specifying the path to your FIFO in your ~/.mplayer/config:

<pre class="sh_c">
> cat ~/.mplayer/config
# mplayer config file
input=file=/home/mil/fifos/mplayer
</pre>

And that's all. Use mplayer's FIFO.
