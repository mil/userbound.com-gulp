module a(size) {
  rotate([0,90,0])
  translate([-1,1,1])
  difference() {
    cube(size, center = true);
    translate([-1,0,0])
    cube(size - 0.2, center = true);
  }
}
module b() {
  translate([0,0,0.125])
  cylinder(r1 = 1.5, r2 = 5, h = 5, $fn = 50);
}
module c() {
  translate([1.75,1.65,1.5])
  rotate([90,25,-45])
  cylinder(r2 = 0.1,r1 = 0.01, h = 5, $fn = 50);
}
module d() {
  translate([0,-.5,-0.2])
  union() {
    c();
    translate([0.5,2,-0.25])
    rotate([20,30,20])
    c();
    translate([0.9,-0.1,-0.3])
    rotate([15,0,30])
    c();
  }
}
module e() {
  difference()  {
    translate([0,0,-1.35])
    difference() {
      cube([2,0.05,2]);
      d();
      translate([-0.5,-1,1.7])
      cube([3,2,1]);
      translate([-0.5,-1,-0.28])
      cube([3,2,1]);
      f();
    }
    translate([-0.5,-1,-2])
    cube([3,2,2]);
  }
}
module f() {
  for (x = [-0.10 : 0.05 : 20]) {
    translate([x,-0.1,1.75])
    rotate([0,45,0])
    cube([0.38,0.4,0.3]);
  }
}

module g() {
  inset();
  difference() {
    union() {
      translate([0,0,0])
      e();
      difference() {
        a(2);
        b();
      }
    }
    translate([3,5,-0.7])
    b();
  }
}
module h() {
  translate([-15,10,-4])
  rotate([0,50,0])
  cylinder(r1 = 2, r2 = 5, h = 20);
}
module i() {
  translate([1.5,0.8,0.1])
  cube(3);
  translate([1.5,0.5,1.8])
  cube(1);
}
module j() {
  translate([0.5,4.5,-2.5])
  rotate([0,0,-60])
  difference() {
    translate([2,1,2])
    scale(1.138)
    g();
    i();
  }
}
module k() {
  translate([-3,14.3,17])
  sphere(14);
}
module l() {
  union() {
    scale(5)
    g();
    j();
    translate([1.5,3.0,0.2])
    scale(2/4)
    scale(1.138)
    rotate([0,0,-45])
    a(2);
  }
}
difference() { l(); k(); }
