---
layout: post
title:  'Taint support for PHP'
permalink: 'taint_support_for_php/'
tags: ['web security', 'php']
---
[Max](https://github.com/mxw), Scott and I worked on <a href="https://github.com/facebook/hhvm/commit/9d2b8ccffcdb42acba4bd2144e4c856fe80461e5" class="external">taint support</a> for PHP.

The idea is to detect & prevent security bugs such as SQL injections, shell injection, XSS, etc.

Taint support implies keeping track of which strings are controlled externally. The main implementation difficulty is making sure that the taint related code does not spread through the entire compiler. Max came up with a clever design involving a TaintObserver object.

Unfortunately, tracking taint currently implies a big performance loss and cannot be enabled site-wide.

Checkout <a href="http://www.jsflow.net/jsflow-challenge.html">http://www.jsflow.net/jsflow-challenge.html</a> for similar work and if you want to play with a JavaScript challenge.
