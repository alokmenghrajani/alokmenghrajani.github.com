---
layout: post
title:  'Combining React and Firebase: sample TicTacToe game &amp; chat widget'
permalink: '/react_tictactoe/'
tags: ['reactjs', 'firebase', 'realtime database']
---
I thought that it would be fun to experiment with <a href="http://facebook.github.io/react/index.html" class="external">React</a>
and <a href="https://www.firebase.com/index.html" class="external">Firebase</a>. I therefore implemented a TicTacToe game and a simple Chat widget.
Each person who is viewing this page is matched up against another random visitor.

## ~~Demo~~
The code no longer works as the Firebase API changed over time.

## Some info
When I started off, I was neither familiar with React, nor with Firebase. Intuitively, I figured that these two technologies should work great together.

React removes the need to manually do UI bookkeeping. The DOM gets updated automatically, as the state of things change.

Firebase makes it easy to build distributed web applications. It also fits nicely with the reactive paradigm: all reads are handled asynchronously in callback functions.

It didn't take too long to beat the learning curves of both technologies and get a working prototype. I initially had a few race conditions, and it took a few hours to clean things up.

Note: using Firebase lets me host this app directly on github pages, which is nice. It however implies that anyone can cheat and modify random game data.

The interesting pieces of code are:
- Matching players to each other (a player either waits to start a game or joins someone who is waiting). I used Firebase's transaction system to achieve this. I noticed the browser (at least Chrome) would sometimes setup two Firebase connections, so I had to be careful to write data in the onDisconnect's callback.

- Handling disconnects: when a disconnect happens, we can deal with it in three ways:
    - If the player waiting to play disconnects, the disconnect can be handled transparently (the player who came second just tries to find another player).
    - If a player disconnects while a game is on, the game ends in an incomplete state.
    - If a player disconnects after the game has ended, the disconnect can be simply ignored.

Check out the [source code](https://github.com/alokmenghrajani/alokmenghrajani.github.com/tree/master/react_tictactoe/).
