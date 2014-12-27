---
title: Naming Workspaces in i3
categories: blog
date: 2012-05-17
time: 12:37AM
---
I'm not sure how many other WMs have this feature... but naming workspaces is awesome. Using [i3](http://i3wm.org), by way of its [IPC](http://i3wm.org/docs/userguide.html) you can have renamable workspaces. I've found renaming my workspaces to be extremelly helpful in staying on task as I define what I'm going to do in a goal driven manner. See the following small script:

[workspace.rb ](https://github.com/mil/configs-and-bins/blob/master/bins/workspace.rb) *(/home/mil/bin/workspace.rb)*

<pre class="sh_c">
#!/usr/bin/ruby
require 'json'
JSON.parse(%x[i3-msg -t get_workspaces]).each do |workspace|
	if (workspace['focused']) then
		number = workspace['name'].split(/:/)[0]
		newName = "#{number}: #{ARGV[0].chomp}"
		%x[i3-msg 'rename workspace "#{workspace['name']}" to "#{newName}"']
		%x[i3-msg 'bindsym Mod4+#{number} workspace "#{newName}"']
	end
end
</pre>

This just sets whatever was passed in as the new workspace name.Then rebinds the sym. This script can be run by simply opening up Dmenu with a hotkey and typing the command as:

<pre class="sh_c">workspace.rb workspacename</pre>

And as simple as that the workspace has a name. 

<img src="/blog/Naming-Workspaces-in-i3/workspace-naming.png" alt="Workspace Renaming in i3"/>

But why would you want to rename a workspace in the first place? Well say you have a certain task at hand that you want accomplish. Cognitivly if you tend to drift, naming the workspace could be a great way to remind yourself of the task at mind. Hell, you could even make these named workspaces persist from session to session if you are handy with xpra as well.
