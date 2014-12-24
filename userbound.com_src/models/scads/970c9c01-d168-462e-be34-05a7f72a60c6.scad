/*
  sorry i lost the source for the actual
  model, this is where the start came from.
*/
for (y = [10 : 6 : 20]) {
  for (x = [0 : 2 : 20]) {
    if ( y % 4 != 0) {
      rotate([x*y/2,y*x/3,x/2])
        translate([x+1,y*x/10,0])
        cube([x,x + (x*y*0.1),x]);
    } else {
      rotate([x*y,y*x/3,x])
        translate([x+1,y*x/18,0])
        cube([x*2,x*2,x*2]);
    }
    union() {
      if (2/x*y*y/30 > 1) {
        translate([0,2,-5])
          rotate([y,70-(x)+100,90*y+10])
          cube([10-x,5+y,x*5]);
      }
    }
  }
}
