---
title: Pango Markup in i3bar
categories: blog
date: 2015-03-20
time: 9:38Pm
footnotes:
    - This is great, because previously if you wanted to style the output of <code>i3status</code> or your <code>status_command</code> in i3, you were limited to setting only foreground colors. Now you have all of Pango markup at your disposal.
    - While nothing close to the styling available in browser or with <a href="https://github.com/Lokaltog/candybar">candybar</a>, this is a monumental improvement from i3bar's previous styling support.
    - Pango markup supports a number of <a href="https://developer.gnome.org/pango/stable/PangoMarkupFormat.html">text attribute styling options</a>, including background, forgroung color, and underlining.
    
---

Since a little over a month ago, [i3bar](http://i3wm.org/i3bar/manpage.html) supports inline [pango markup](https://github.com/i3/i3/issues/1468) for styling your statusline and workspaces<sup>1</sup>.  So after figuring this out, this past weekend I took some time to redo my statusline. 

I wrote a small [ruby script](https://github.com/mil/home/blob/master/Scripts/Utilities/json-bar) to serve my i3 statusline command which generates little aesthetic blocks (styled with Pango markup) for time, weather, network, audio level, and power... looking like: 

![Pango Markup in i3Bar screenshot](/blog/Pango-Markup-in-i3bar/bar.png)

Each block I define as a hash, specifying symbol, color, and the function which returns the data to display:

<pre class='sh_ruby'>
blocks = [
    {
        :symbol => "↬",
        :color=> "#530067",
        :text => fetchers.network
    }, ...
]
</pre>

Where `fetchers` holds some functions for retrieving system data:
<pre class='sh_ruby'>
class InfoFetchers
  def network
    %x[netctl list].split("\n").select { |n| 
      n if n[0] == "*"
    }.first.gsub!("* ", "")
  end ...
end
fetchers = Info_Fetchers.new
</pre>

Each block gets passed through a `map` function to stylize with Pango <sup>3</sup>. This way I get a consistent feel for each block and I keep my code DRY. The final output is assembled as `JSON` and passed onto `i3bar`:

<pre class='sh_javascript'>
blocks.map do |f|
   text = [
       "&lt;span rise='-110000' size='large' underline_color='#ffffff' underline='double'&gt;",
      "&lt;span bgcolor='#{f[:color]}' fgcolor='#ffffff'> #{f[:symbol]} &lt;/span&gt;",
      "&lt;/span&gt;",

      "&lt;span rise='-109900' size='8900' underline='double' underline_color='#ececec'&gt;",
      "&lt;span fgcolor='#2b2b2b' bgcolor='#f9f9f9'> #{f[:text]} &lt;/span&gt;",
      "&lt;/span&gt;"
    ].join

    {
      :separator => false,
      :separator_block_width => 10,
      :align => 'left',
      :min_width => 0,
      :full_text => text
    }
end.to_json
</pre>

So yeah -- Pango + i3bar is nice. Feel free to [steal my status bar generating script](https://github.com/mil/home/blob/master/Scripts/Utilities/json-bar) featuring the block aesthetic. It took me a while to get Pango to cooperate, so I hope I'll save some folks some effort! 

Thanks to [acrisci](https://github.com/acrisci) who was the one who dropped Pango into [i3](https://i3wm.org/) upstream.
