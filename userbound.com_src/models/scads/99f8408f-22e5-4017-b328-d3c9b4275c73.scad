module a(f_value) {
  if (f_value == 3) {
    difference() {
      cylinder(r1 = 1, h = 0.5, $fn = 40);
      translate([0,0,-1])
        cylinder(r = 0.7, h = 2, $fn = 3);
    }
  } else {
    if (f_value < 16) {
      difference() {
        cylinder(r1 = 1, h = 0.5, $fn = 30);
        translate([0,0,-1])
          cylinder(r = 0.9, h = 5, $fn = 10);
      }
    } else {
      cube(f_value/8, center = true);
    }
  }
}
module b() {
  difference() {
    cylinder(r1 = 1, h = 0.5, $fn = 30);
    translate([0,0,-1])
      cylinder(r = 0.9, h = 5, $fn = 10);
  }
}
module c() {
  for (x = [0 : 1 : 20]) {
    translate([0,0,-x*0.2])
      rotate([10,x*10,x])
      a(x);
  }
}
module d() {
  for (x = [0 : 1 : 20]) {
    translate([0,0,-x*0.2])
      rotate([10,x*10,x])
      scale([1,1,1])
      difference() {
        cylinder(r1 = 1, r2 = 0.10, h = 0.5, $fn = 40);
        translate([0,0,-1])
          cylinder(r = .1, h = 2, $fn = 50);
      }

  }
}
module e() {
  difference() {
    union() {
      translate([0,-3,-1.8])
        for (x = [0 : 0.1 : 2]) {
          rotate([round(x*2*x),1,round(x*10000)])
            translate([0.2,0.8*x*x*1.1,x])
            union() {
              b();
            }
        }
    }
    union() {
      translate([6,-3,-1])
        cube([4,3,3]);
      translate([-1,-8,-1])
        cube([4,3,3]);
    }
  }
}
union() { 
  e(); 
  translate([0,-3,-2]) union() { d(); c(); } 
  translate([0,-7,0]) c(); 
}
