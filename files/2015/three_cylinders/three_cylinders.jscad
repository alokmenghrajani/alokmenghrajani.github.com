function main() {
  C = cylinder({r: 1, h: 4}).translate([0,0,-2]).scale(10);
  C1 = C.setColor(1, 0, 0);
  C2 = C.rotateX(90).setColor(0, 1, 0);
  C3 = C.rotateY(90).setColor(0, 0, 1);

  return C1.intersect(C2).intersect(C3).translate([0, 0, 10]);
}

