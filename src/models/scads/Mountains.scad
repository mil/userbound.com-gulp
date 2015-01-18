for(x = [3.2 : 0.5 : 14]) {
  for (y = [0 : 1 : 8]) {
    translate([x -0.1 *x , 0 ,  rands(0, 1,1000)[x*y]]) 
      translate([0 , y , 0 ]) 
      if (rands(0, 1, 1, x*y)[0] > 0.5) {
        translate([0,0.4,0])
          rotate([0,x,20])
          cylinder(r1 = 0.81*(x*.15), r2= 0.1/x, h = (x*y)/20);
        rotate([45,0,45])
          translate([0,0,0])
          cube(0.8);
        rotate([25,45,45])
          cylinder(r = 0.05, h = 2);
      } else {
        if (rands(-1, 0.4, 1, x*y)[0] > 0.7) {
          cylinder(r1 = 0.15, r2 = 0.1, h = 0.1);
        } else {
          if (rands(-1, 0, 1, x*y)[0] > 0.5) {
            rotate([20,20,x*1.5])
              cube([9,1.2,x*y*0.04]);
          } else {
            translate([2,0,0])
              rotate([-20,20,x*1.5])
              union() {
                cube([1.2,0.2,x*y*0.04]);
                translate([0.6,-0.9,0])
                  cube([0.1,2,0.1]);
              }
          }
        }
      }
  }
}
