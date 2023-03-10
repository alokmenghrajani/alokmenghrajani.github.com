---
layout: post
title:  'A VGA controller in VHDL'
permalink: '/vga_controller/'
tags: ['vga', 'vhdl']
---
A VGA controller in VHDL which renders image and runs Conway's Game of Life

A project I worked on as part of an Advanced Digital Design course at EPFL, in 2004. We designed a VGA controller and 3 demonstration applications.

The first application is very simple and displays a "snow" effect based on random pixels (something resembling what a TV set displays when there is no signal). It required building a hardware pseudo-random number generator. The second application allows us to display a simple color image on the screen (digital picture frame). The third application runs Conway's Game of Life (the cells get computed in parallel).

We also designed a unit for bi-directional communication with a PC using the serial port. The goal of this course was to provide us with an overview of what the challenges are when developing a large hardware project. The code was synthesized on an Altera board and connected to a standard VGA monitor.

- <a href="/files/2004/vga_controller/vga_controller_report.pdf">report (contains vhdl source)</a>
- <a href="/files/2004/vga_controller/vga_controller_slides.pdf">slides</a>
