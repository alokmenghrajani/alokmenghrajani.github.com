---
layout: post
title:  'Bioinspired Adaptive Machines'
permalink: '/adaptive_machines/'
tags: ['machine learning']
---
A course taught at the Microengineering department by [Prof. Floreano](https://people.epfl.ch/dario.floreano). There were two major homeworks: a research assignment and a mini project.

## Research assignment
Our assignment was the study of "Bionics of Flights". We studied how bioinspired techniques are used to design flying vehicules such as planes or hand gliders.

Some of my work included looking at various designs for "winglets". An interesting thing we found was that birds adapt the shape of their winglets based on their speed, while man-made objects usually always have fixed wings.

<img src="/files/2004/adaptive_machines/wingsuit.jpg"/>
<small>wing suits, an example of bioinspired flight</small>

## Mini project
"Evolution of vision-based navigation. Simulation using a simple, ultra-fast simulator".

The project consists in exploring how various parameters (like field-of-view, number of pixel, arena shape, quantity of contrast in environment, etc) affect the evolution of vision-based navigation. The objective is to find suitable parameters in order to evolve controllers for a Khepera in a few different environment types.

We used a genetic algorithms and the goevo simulator. The objective function was the speed of the wheels (i.e. the goal was to maximize the robots movements).

The following video shows one of our results.
<iframe width="640" height="360" src="https://www.youtube.com/embed/kfY0SHfK-YU" frameborder="0" allowfullscreen></iframe>
<br/>

## Links
- <a href="/files/2004/adaptive_machines/report.pdf">mini project report</a>
- <a href="/files/2004/adaptive_machines/summary.pdf">exam preparation</a>. Useful if you are planning to take a similar course.
- <a href="http://en.wikipedia.org/wiki/Bio-inspired_computing">Bio-inspired computing (Wikipedia)</a>
- <a href="http://en.wikipedia.org/wiki/Wingsuit_flying">Wingsuit flight (Wikipedia)</a>
- <a href="http://en.wikipedia.org/wiki/Khepera_mobile_robot">Khepera robot (Wikipedia)</a>
- <a href="http://www.cyberbotics.com/">Webots</a>: an amazing robot simulator
- <a href="http://lis2.epfl.ch/resources/evo/goevo.php">Goevo</a>: an application for evolutionary robotics with neural controllers
- <a href="http://en.wikipedia.org/wiki/Wingtip_device">Winglets (Wikipedia)</a>
