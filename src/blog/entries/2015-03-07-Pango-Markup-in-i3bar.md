---
title: Pango Markup in i3bar
categories: blog
date: 2015-03-20
time: 9:38Pm
footnotes:
    - This is great, because previously if you wanted to style the output of `i3status` or your `status_command` in i3, you were limited to setting only foreground colors. Now you have all of Pango markup at your disposal.
    - While nothing close to the styling available in browser or with [otherbar](), this is a monumental improvement from i3bar's previous styling support.
    - Pango markup supports a number of [text attribute styling options]()<sup>1</sup>, including background, forgroung color, and underlining.
    
---

Since of about a month ago, [i3bar]() supports inline [pango markup](https://github.com/i3/i3/issues/1468) for styling your statusline and workspaces<sup>1</sup>.  So after figuring this out, this past weekend I took some time to redo my statusline. 

I wrote a small [ruby script]() to serve as my i3 statusline commmand which generates little aesthetic blocks (styled with Pango markup) for time, weather, network, audio level, and power... looking like: 

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

Each block get's passed through a `map` function to stylize with Pango. This way I get a consistent feel for each block and I keep my code DRY. The final output is assembled as `JSON` and passed onto `i3bar`<sup>3</sup>:
<pre class='sh_javascript'>
blocks.map do |f|
    text = [
       "&lt;span rise='-110000' size='large' underline_color='#ffffff' underline='double'&gt;",
      "#{" #{f[:symbol]} ".fg(f[:bg]).bg(f[:fg])}",
      "&lt;/span&gt;",
      "&lt;span rise='-109900' size='8900' underline='double' underline_color='#ececec'&gt;",
      "#{" #{f[:text]} ".fg("#2b2b2b").bg('#f9f9f9')}",
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

So yeah -- Pango + i3bar is nice. Feel free to [steal my status bar generating script]() featuring the block aesthetic. It took me a while to get Pango to cooperate, so I hope I'll save some folks some effort! 

Thanks to [acrisci]() who was the one who dropped Pango into [i3]() upstream.
