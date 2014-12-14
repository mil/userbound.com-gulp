---
page:
  variables:
    title: b(ar) a(in't) r(ecursive)
    date: 2012-07-19
    time: 10:53PM
---
[b(ar) a(in't) r(ecurisve)](http://github.com/LemonBoy/bar) or bar for short is a new XCB based bar by the Lemon Man. Think dzen2 or conky, only zero bloat. Bar is only what's needed and nothing more. Under 300 lines of C, bar is a quality piece of software that I am glad to throw in my .xinitrc.

So how does bar work? Basically it just reads STDIN and draws the read text to an XCB bar. Configuration is along the lines of dwm and other minimalist software. You set your configuration in bar's config.h and it's baked in at compile time.  Within the config.h, you can specify: ten colors which can be used to visually style the bar, your desired font, and the height of the bar. 

Other than that, for formatting text you can left, center, and right align text and style your bar's text foreground and background colors with your defines from the config.h.

Simple, minimal, and functional. If only all software were like this.
