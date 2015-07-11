---
title: My New Alarm Clock
categories: blog
date: 2012-10-13
time: 10:52AM
---
Sometimes I can't get myself out of bed and to a conscious state before a certain hour. However, if there is something to think about, a challenge to face, or simply just a blaring 22 inch monitor flicking 600 times every minute while blaring music is playing -- I tend to extract myself from bed. Without further ado, I present my new alarm clock:

[xcalib](http://xcalib.sourceforge.net) + [xset](http://linux.die.net/man/1/xset) + [slock](http://tools.suckless.org/slock) + [mplayer](http://www.mplayerhq.hu) + [cron](http://en.wikipedia.org/wiki/Cron) = a wonderful seizure-style start to your day!

Before I go to sleep, I kill my display with goodnight:

<pre data-language="c">
alias goodnight='xset dpms force off'
</pre>


And then I have a script that I call wakeup:

<pre data-language="c">
#!/usr/bin/env ruby
ENV['DISPLAY'] = ':0'
%x[xset dpms force on]

Thread.new do
    %x[slock]
    %x[xcalib -a clear]
    exit
end

Thread.new do
    loop do
        %x[mplayer ~/.alarm.mp3]
    end
end

loop do
    %x[xcalib -a -invert]
    sleep 0.2
end
</pre>

I'll see you at 9 AM in the morning cron. In crontab -e:

<pre data-language="c">
0 9 * * * /home/mil/bin/x/wakeup
</pre>

Nice, I'm awake and there's a 22 inch screen inverting colors at a rate of 10 times per second illuminating my room while blaring music is playing. I have to type my password for slock to stop this madness. Annoying enough to make me get out of bed? You bet.
