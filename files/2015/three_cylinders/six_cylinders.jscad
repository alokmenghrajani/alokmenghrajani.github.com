function main() {
  x = -1.2;
  return difference(
    cube({size: 3, center: true}),
    union(
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]),
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]).rotateX(90),
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]).rotateY(90),
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]).rotateX(-90),
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]).rotateY(-90),
      cylinder({r: 1, h: 1}).translate([0,0,-0.5]).translate([0,0,x]).rotateX(180)
    )
  ).scale(10).translate([0,0,15]);
}

