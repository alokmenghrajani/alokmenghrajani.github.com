---
layout: post
title:  'Tab nabbing attack'
permalink: '/tab_nabbing/'
tags: ['web security', 'phishing']
---
An ingenious phishing vector: Aza Raskin found a clever way to phish users' credentials.
The idea consits of waiting until a visitor switches tabs to replace the favicon and
page content with a fake site.

<img src="/files/2010/tab_nabbing/gmail.png"/>

## Proof of concept
You can try the attack by visiting <a href="http://www.azarask.in/blog/post/a-new-type-of-phishing-attack/" class="external">http://www.azarask.in/blog/post/a-new-type-of-phishing-attack/</a>. After loading the page, switch tabs for a few seconds and then go back to Aza's site.

## Mitigation
You can avoid falling for this attack by:
- Always checking the URL before entering a password.
- Closing tabs you no longer need.
- Using your browser's account manager.
- Opening shady websites in a dedicated window, browser or laptop.
