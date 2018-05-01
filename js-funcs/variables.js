var bounds = 800;
var window_widthhalf = window.innerWidth / 2;
var window_heighthalf = window.innerHeight / 2;

var last = performance.now();

var gpu;
var vel;
var pos;
var uniform_pos;
var uniform_vel;
var uniform_boid;

//usual configurational variable for camera amd view point adjusting
var container, stats;
var camera, scene, renderer, geometry, i, h, color;
var mouse_move_width = 0, mouse_move_height = 0;
