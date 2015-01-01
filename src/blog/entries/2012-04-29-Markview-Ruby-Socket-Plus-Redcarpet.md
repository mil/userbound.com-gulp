---
title: Ruby Socket + Redcarpet = Browser-Based Markdown Preview
categories: blog
date: 2012-04-29
time: 1:48AM
---
So it's finals time and I've been preparing some single page study sheets with [markdown](http://daringfireball.net/projects/markdown/). I use Markdown for generating PDFs for printing ([mkd2pdf](https://github.com/jdodds/mkd2pdf)). 
In anycase, I had been using my [Markdown Tree](/projects/markdown-tree) project in order to faciliate a sort of "live-preview" of the documents I send to mkd2pdf. Nothing against [Sinatra](http://sinatrarb.com) but I wanted a lighter solution.  Using Markdown-Tree (and Sinatra) purely for its Markdown rendering capability didn't make sense to me. Really I was just working with Redcarpet and Socket. Sinatra wasn't doing a damn thing for me. 

Thus, I felt Sinatra had no place in the task at hand.  What I wanted was a simple commandline tool I could use like *markview.rb somefile.md* and it would give me a live URL on localhost of the markdown file rendered as HTML.

Luckily Ruby provides an excellent [Socket Class](http://www.ruby-doc.org/stdlib-1.9.3/libdoc/socket/rdoc/Socket.html). Combine that with a markdown renderer such as [Redcarpet](http://github.com/tanoku/redcarpet) and you have a simplistic web-based markdown viewing utility. Basically this is just a bit of ruby that interpolates Redcarpet's rendered results with some HTML. Then, along with a HTTP Header, the HTML is served on port 2000. A CSS file for styling is stored in *~/.config/markview*.

[markview.rb](https://github.com/mil/configs-and-bins/blob/master/bins/markview.rb) *(/home/mil/bin/markview.rb)*

<pre class="sh_ruby">
#!/usr/bin/ruby
require "socket"
require "redcarpet"

def generatePage(filePath)
	#Read style file
	style = File.read("/home/mil/.config/markview/style.css")

	#Use Redcarpet to convert Markdown-&gt;HTML
	redcarpet = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
	markdown = redcarpet.render(File.read(filePath))

	#The Content Header Well Be Serving
	header = "HTTP/1.1 200/OK\r\nContent-type:text/html\r\n\r\n"

	#The Content We'll Be Serving
	content = %(
	&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;
	&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
	&lt;head&gt;
		&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
		&lt;title&gt;Markview : #{filePath}&lt;/title&gt;
		&lt;style type="text/css"&gt;#{style}&lt;/style&gt;
	&lt;/head&gt;
	&lt;body&gt;#{markdown}&lt;/body&gt;
	)
	return header, content
end

#Start it Up
server = TCPServer.new('localhost', 2000)
loop do
	header, content = generatePage("#{Dir.getwd}/#{ARGV[0]}")
	Thread.start(server.accept) do |session|
		session.print(header)
		session.print(content)
		session.close
	end
end
</pre>

And that's it. Instead of using some graphical tool, you can just replace your markdown preview utility with a single-purpose web server. Redcarpet and Socket are all that is needed. Starting this script up is very snappy in comparison with Sinatra scripts.
