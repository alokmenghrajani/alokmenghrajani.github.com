---
layout: post
title: "Rounding to nearest half mark"
permalink: '/rounding_to_nearest_half_mark/'
tags: ['math', 'float', 'rounding']
---

There are several common ways to round numbers. This post explains some of these rounding methods, what to do when a rounding method isn't available, and an analysis of rounding behavior across different version of Java.

Common rounding methods include floor (round down), ceil (round up), truncate (round towards zero), banker's rounding, etc. Usually you can use all these different rounding methods out of the box.

Example: floor rounds numbers down. This means `floor(2.7)` is `2` and `floor(-2.7)` is `-3`.

You might come across cases where rounding towards the nearest
half mark (i.e. rounding towards the nearest 0.5) is missing. As a work around, you can double the value and then half the result of rounding. I.e. `round_to_closest_half(x) = round(x*2)/2`.

It is however important to keep in mind that floating point computations have tricky edge cases. A naive rounding implementation can therefore hide bugs.

For example, Java 6 [implemented rounding](https://github.com/openjdk/jdk6/blob/3e49aa876353eaa215cde71eb21acc9b7f9872a0/jdk/src/share/classes/java/lang/Math.java#L678) as `floor(x+0.5)`, which causes it to return an [incorrect value](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6430675) for `0.49999999999999994`. The reason is that
adding `0.5` to `0.49999999999999994` cannot be accurately represented as a floating point. The addition is approximate and the result is rounded to `1`. Perhaps they should have implemented rounding as `floor(x-0.5)+1`?

Java 7 [changed the rounding logic](https://github.com/openjdk/jdk7/commit/b4d4e3bed48fae16f01345fc624715588d112697) and [updated the documentation accordingly](https://docs.oracle.com/javase/7/docs/api/java/lang/Math.html#round)

[The story doesn't end here](https://mail.openjdk.org/pipermail/core-libs-dev/2013-January/014129.html) and the implementation of rounding had to be [changed again](https://github.com/openjdk/jdk9/blob/master/jdk/src/java.base/share/classes/java/lang/Math.java#L739).

One way to discover such edge cases is to re-implement the floating point library as a tiny float (e.g. with 8-bit instead of 64-bit) and then check every possible value, something I discuss in a [PagedOut! #7](/pagedout_issue7/) article.
