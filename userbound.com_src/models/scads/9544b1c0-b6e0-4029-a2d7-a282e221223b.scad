module a(spacing) {
  for(x = [0 : spacing/0.10: -90]) {
    rotate([x,x/20,0])
      translate([0,1,0])
      cube([3.14,0.1,0.45]);
  }
}
module b() {
  for (x = [0 : 0.2 : 3.2]) {
    translate([x+0.05,0,0])
      scale([0.01,1,1]) a(2);
  }
}
module c() {
  for(x = [0 : 0.1 : -1.2]) { translate([0,1.4,x]) cube([3.14,0.2,0.05]); }
}
module d() { a(6); b(); }
module e() { rotate([60,0,0]) d(); d(); }
module f() { translate([0,0.6,0]) scale([0.6,0.5,1]) rotate([90,0,0]) e(); }
module g() {
  translate([0,1.16,-0.006])
    scale([0.185,0.14,0.05])
    import_stl("lwnkj.stl", convexity = 5);
}
module h() {
  for (i = [0.1 : 0.1 : 1.9 ]) {
    rotate([90,0,0])
      translate([i,0,-2.6]) 
      cylinder(r = 0.02, h = 1.50);
  }
}
module i() { translate([-0.17,0,0]) cube([0.2,4,1.3]); }
module j() { translate([2.02,0,0]) i(); i(); }
difference() { translate([0,-0.2,0]) union() { g(); h(); f(); } j(); }
f();
