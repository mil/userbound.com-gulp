#!/usr/bin/env node
require('prefs');


function pp(buffer) { console.log(JSON.stringify(buffer)); }
function fs_in(path)  { return prefs.in_folder  + "/" + path; }
function fs_out(path) { return prefs.out_folder + "/" + (path || ''); }
function read_file(path) { return fs.readFileSync(path, 'utf8'); }
function source_filepath_to_url(source_filepath) {
  var x = /^\d{4}-\d{2}-\d{2}-(.+)(?=\.md)?/.exec(source_filepath);
  // ... until i can get my regex to cooperate
  return x[1].split(".md")[0];
}
function date_to_string(obj) {
  var months = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September",
    "October", "November", "December"
  ];
  return months[obj.getMonth()] + " " + obj.getDate() + ", " + obj.getFullYear();
}
