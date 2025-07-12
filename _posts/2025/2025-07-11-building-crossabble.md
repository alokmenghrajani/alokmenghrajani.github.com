---
layout: post
title: "On Building Crossabble"
permalink: '/building-crossabble/'
tags: ['web', 'developer notes']
---
I recently built [crossabble](https://crossabble.com/), a free web word puzzle
game. I was surprised by the number of edge cases I had to take into account.
This post is based on my developer notes.

Crossabble is a browser game: html, css, and javascript. The javascript
part is quite minimal and trivial -- I spent most of my time on css,
polishing the game's look and feel. I'm primarily a backend software
engineer -- when working on frontends, I'm punching a little above my
weight.

My goal for Crossabble is to have a game that works well across all common
modern web environments: laptops, tablets, phones, in landscape and portrait
mode, etc. I own many devices, it however takes a lot of discipline to test each
and every change with each and every device, browser, and orientation
combination. Backend engineering seems simpler in this respect.

## Virtual Keyboard

When browsing with touch devices, most web word games re-implement a virtual
keyboard instead of using the device's native one. Some notable examples,
New York Times' [Wordle](https://www.nytimes.com/games/wordle/index.html):

<img src="/files/2025/building-crossabble/wordle_virtual_keyboard.png" style="width: 50%; border: 1px solid black">

New York Times' [Mini Crossword](https://www.nytimes.com/crosswords/game/mini):

<img src="/files/2025/building-crossabble/mini_crossword_virtual_keyboard.png" style="width: 50%; border: 1px solid black">

The Atlantic's [Bracket City](https://www.theatlantic.com/games/bracket-city/):

<img src="/files/2025/building-crossabble/bracket_city_virtual_keyboard.png" style="width: 50%; border: 1px solid black">

Some of these implementations are however buggy. For example, Wordle mishandles
touch events and records the wrong letter when quickly typing adjacent letters,
an issue which was brought up on [r/wordle](https://www.reddit.com/r/wordle/comments/1eddr06/does_anyone_elses_wordle_keyboard_have_glitches/) about a year ago:

<img src="/files/2025/building-crossabble/wordle_buggy_event_handling.gif" style="width: 50%; border: 1px solid black">

Besides potential bugs, re-implementing the virtual keyboard has several downsides:

- The keyboard layout might not match the user's preference. There's no browser
API to query the user's preferred keyboard layout. It can be quite annoying for
someone used to one keyboard layout to have to type on a different layout.
- The color might not match the native interface.
- The spacing between keys might not match the native interface.
- The interface might not reflect features available in the native interface,
such as speech-to-text or swipe. Some of these features might be important
in terms of accessibility.
- Subtle other differences can make the re-implementation feel off, inferior,
or simply different.

Knowing these issues, I initially attempted to use the native virtual keyboard.
There are multiple possible approaches to achieve the look and feel of
filling boxes. I tried using [one input field per letter](/files/2025/building-crossabble/one_input_per_letter.html)
which has many hard to solve quirks. I then tried using [hidden
input fields](/files/2025/building-crossabble/hidden_input_fields.html) with
somewhat better results.

I was however unhappy with the native keyboard:

- The keyboard takes too much screen space. Several keys are not needed for
my game (e.g. shift, space, numbers, emojis).
- The user gets suggestions (even with <code>autocomplete="off"</code>). These
suggestions don't respect the field's <code>maxlength</code> attribute. Text
suggestions can be disabled by making the field a hidden password field with
some caveats.
- It's a pain to account for the keyboard's size (there doesn't seem to be
any css unit similar to <code>svh</code> which takes the native virtual keyboard
size into account).

<img src="/files/2025/building-crossabble/native_virtual_keyboard_not_ideal.png" style="width: 50%; border: 1px solid black">

Reluctantly, I re-implemented a virtual keyboard -- a less buggy version than
what's out there hopefully.

During these experiments, I did run into and filed a Chrome [bug](https://issues.chromium.org/issues/420460315)
in addition to reporting that input field suggestions should perhaps take the
field maxlength into account.

## Chrome refresh issue

While trying to build an accurate web interface, I noticed that hitting refresh
in Chrome sometimes moves things around. I didn't immediately realize that I
had content which was wider than the page and it was the scrollbar
position hopping around (it's unfortunate that scrollbars are hidden by default
nowadays) and I was left confused for a bit.

<img src="/files/2025/building-crossabble/scrollbar_weirdness.gif" style="width: 50%; border: 1px solid black">

[Try it for yourself](/files/2025/building-crossabble/scroll_position_weirdness.html)

## Undesirable text nodes

[This file](/files/2025/building-crossabble/text_nodes.html) displays 9 squares
which should be contained inside the green box. Depending on the window size,
the squares however overflow:

<img src="/files/2025/building-crossabble/text_nodes.gif" style="width: 50%; border: 1px solid black">

The overflow is caused by empty nodes taking up height. The empty nodes were
added by the auto-formatter -- you would think that a code formatter wouldn't
have any side effects!

I found a couple ways to work around this issue:

- [Don't auto-format the file on save](/files/2025/building-crossabble/text_nodes_no_autoformatter.html)
- [Use some javascript to remove empty text nodes](/files/2025/building-crossabble/text_nodes_javascript.html)
- [Set the font-size to 0](/files/2025/building-crossabble/text_nodes_font_size_zero.html)

## Allocating enough space for clues

The New York Times' Mini Crossword grid shrinks when the clue is too long. This
is caused by not allocating enough space for the clue area:

<img src="/files/2025/building-crossabble/mini_crossword_resize.gif" style="width: 50%; border: 1px solid black">

I avoid this situation by using a clever trick with css grids. Several <code>&lt;div&gt;</code>
elements can be assigned the same grid coordinates, causing them to overlap.
Visibility or opacity can then be used to pick which clue is shown.

<img src="/files/2025/building-crossabble/clues.gif" style="width: 50%; border: 1px solid black">

[Try it for yourself!](/files/2025/building-crossabble/clues.html)

## Notifying users and DAU NaN

Given that my puzzle is released on a weekly basis, some form of notification
might be useful to remind people to come back and play. I however believe
the web is a better place when sites don't track their users. So I didn't
want to collect people's email addresses or require them to create an account.

Instead, I created a simple way for users to add a calendar reminder to their
own calendar. They can then delete the reminder whenever they wish. Users can
also subscribe to the [RSS/Atom feed](http://crossabble.com/feed.xml), although
I'm not sure if anyone is still using RSS/Atom feeds.

I call my philosophy of not tracking users "DAU NaN". I know a small minority of
other people share this philosophy about online activity tracking.

Instead of showing ads, users can support me via a [buymeacoffee](https://buymeacoffee.com/crossabble) button.

## Infrastructure

To wrap up these notes, I'll briefly cover the infrastructure. In order to
minimize costs and maximize availability, the site is generated using a custom
script, akin to a static site generator. The code is hosted in a private
GitHub repo, but can easily be relocated anywhere. The static site is served by
Cloudflare, and again, I can easily relocate to some other service if needed.

I have the ability to draft puzzles ahead of time, to be released on a specific
schedule -- a Cloudflare worker regenerates all the static pages on a weekly
basis.

Crafting puzzles is the most time consuming part of this project -- which is
fine as long as I'm enjoying crafting puzzles. I do have a helper tool
to help me with this process and plan to expand this tool over time.
