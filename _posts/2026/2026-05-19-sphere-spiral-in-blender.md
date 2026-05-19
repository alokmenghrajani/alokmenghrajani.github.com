---
layout: post
title: "Sphere Spiral in Blender: a tutorial"
permalink: '/sphere-spiral-in-blender/'
tags: ['blender', 'art', 'tutorial']
---
![sphere spiral rendered in Blender](/files/2026/sphere-spiral-in-blender/final.png)

I first learned about Sphere Spirals back in 2002 via a [POV-Ray Hall Of Fame
entry by Tor Olav Kristensen](https://hof.povray.org/Riemann_Sphere-Isosurface.html).
The entry points to a nice [mathematical write-up](http://www.clowder.net/hop/Riemann/Riemann.html)
of the underlying idea.
<small>([source code](/files/2026/sphere-spiral-in-blender/Riemann_Sphere-Isosurface.pov)
for the original work)</small>

In this post, I'll show one way to build a similar object in [Blender](https://www.blender.org/). Blender is
a free, open source, 3D modeling software that runs on most platforms. My
approach isn't mathematically exact, but visually it’s very similar.

Step 1. Start with a UV Sphere. 8 segments. 8 rings. 1m radius (you can use
other units if you prefer).

![step 1 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_01.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 2. Enter object edit mode and select the faces to keep. I like to remove
the top and bottom faces to cut a hole at each pole. You can experiment by
keeping or removing different sets of faces.

![step 2 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_02.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 3. Invert the selection.

![step 3 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_03.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 4. Delete the faces. We are now left with a single band.

![step 4 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_04.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 5. Add the “Array” modifier. We want the shape to be a circle. Set the
count to 4. Pick the Z axis. Enable merge. We now have 4 bands forming a sphere.

![step 5 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_05.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 6. Add the “Solidify” modifier. 0.1m thickness. Offset shouldn’t matter, I set it to 0.

![step 6 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_06.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 7. Add “Simple Deform” modifier. 90degrees around the Z axis. Things are starting to look good.

![step 7 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_07.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

Step 8. Add “Subdivision Surface”, pick levels 3-5 depending how smooth you want the sphere to look.

![step 8 screenshot](/files/2026/sphere-spiral-in-blender/screenshot_08.png)

<center><br>*&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;*<br><br></center>

That’s it. The order of the modifiers is important. If things don’t look quite
right, re-order the modifiers. You can also generate a UV sphere with a multiple
of 6 and have 3 bands instead of 4 (or try other numbers).

These little spheres are fun to 3D print and turn into keychains. You can also
make lamp shades. Leave the bottom filled to make a candle stand. Leave a
complete opening at the top and pair two for a fidget toy.

![fidget spiral sphere](/files/2026/sphere-spiral-in-blender/973881-fidget-spiral-sphere.jpeg) via [https://www.printables.com/model/973881-fidget-spiral-sphere](https://www.printables.com/model/973881-fidget-spiral-sphere)

![hand blown glass globe pendant](/files/2026/sphere-spiral-in-blender/hand-blown-glass-globe-pendant-light.jpg) via [https://www.etsy.com/ca/listing/1802486916/hand-blown-glass-globe-pendant-light](https://www.etsy.com/ca/listing/1802486916/hand-blown-glass-globe-pendant-light)