---
title: Garden with Clojurescript
categories: blog
date: 2015-02-21
time: 2:46PM
footnotes:
  - The real power here is that you get access to Clojure's full battery of rich data transformation capabilities directly available to you while writing styles! This beats out Sass loops and logic 10-to-1 from my perspective -- assuming your stack is already Clojure(script)-based.
  - For prototyping the style tag approach is nice, but if you can save time and processing power on the client's end for a production site, you should.
---

[Garden](https://github.com/noprompt/garden) is a neat Clojure *and* Clojurescript library that lets you render CSS by writing your styles in a simple Clojure(script) DSL<sup>1</sup>.

Garden stylesheets are written ambivalent to whether Clojure (JVM host) or Clojurescript (Javascript host) is being used for their compilation -- as such the below snippet will render the same in both contexts.

<pre data-language='clojure'>
(garden/css [:h1 {:color "blue"}])
; "h1 { color: blue; }"
</pre>

Being available in both Clojure and Clojurescript, I've found for rapid prototyping, Garden via Clojurescript is simple and accesible. For quickly getting moving in an existing Clojurescript app, I've found it helpful to just output my styles returned from Garden into a simple style tag:

<pre data-language='clojure'>
(defn generate-and-inject-style-tag
  "Injects a style tag with the id 'injected-css' into the page's head tag
   Returns generated style tag"
  []
  (let [ page-head (.-head js/document)
         style-tag (.createElement js/document "style")]    
       (.setAttribute style-tag "id" "injected-css")
       (.appendChild page-head style-tag)))

(defn update-page-css
  "Updates #injected-css with provided argument (should be some CSS string 
   -- e.g. output from garden's css fn) If page does not have #injected-css then
   will create it via call to generate-and-inject-style-tag"
  [input-css]
  (let [ style-tag-selector "#injected-css"
         style-tag-query (.querySelector js/document style-tag-selector)
         style-tag (if (nil? style-tag-query)
                       (generate-and-inject-style-tag) 
                       style-tag-query)]
       (aset style-tag "innerHTML" input-css)))

; Usage 
; (Assumes you've required garden in your namespace)
; (Optionally throw this in your boot-reload / figwheel reload CB)
(update-page-css
	(garden/css [:h1 {:color "blue"}]))
</pre>

Although, I'll likely move my Garden styles to Clojure eventually<sup>2</sup>...  for prototyping purposes, in combination with [boot-reload](https://github.com/adzerk-oss/boot-reload), the above <code>defn</code>s get you on-the-fly style updating similar to [figwheel](https://github.com/bhauman/lein-figwheel)'s CSS reloading capabilities but without the extra file IO overhead. And you get to keep everything in Clojurescript!
