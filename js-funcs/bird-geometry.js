if ( !Detector.webgl ) Detector.addGetWebGLMessage();

var number_of_birds = document.location.hash.substr(1);
if(number_of_birds){
	number_of_birds = parseInt(number_of_birds, 0);
}
var texture_width = number_of_birds || 50;
var birds = texture_width;

THREE.BirdGeometry = function () {
	var shape = birds*3;
	var vertex = shape*3;

	THREE.BufferGeometry.call(this);

	var vertices = new THREE.BufferAttribute( new Float32Array( points*3 ), 3 );
	var boid_colors = new THREE.BufferAttribute( new Float32Array( points*3 ), 3 );
	var references = new THREE.BufferAttribute( new Float32Array( points*2 ), 2 );
	var boid_vertex = new THREE.BufferAttribute( new Float32Array( points ), 1 );

	this.addAttribute( 'position', vertices );
	this.addAttribute( 'boid_color', boid_colors );
	this.addAttribute( 'reference', references );
	this.addAttribute( 'boid_vertex', boid_vertex );
	this.addAttribute( 'normal', new Float32Array( points * 3 ), 3 );

	var v = 0;
	function vertex_push() {
		for (var i=0; i < arguments.length; i++) {
			vertices.array[v++] = arguments[i];
		}}

	for (var j=0; j<birds; j++ ) {
		vertex_push( 0, -0, -8, 0, 2, -10, 0, 0, 15 );// Body
		vertex_push( 0, 0, -10, -5, 0, 0, 0, 0, 10 );// Left Wing
		vertex_push( 0, 0, 10, 5, 0, 0, 0, 0, -10 ); // Right Wing
	}

	for( var v=0; v<shape*3; v++) {
		var i = ~~(v / 3);
		var x = (i % texture_width) / texture_width;
		var y = ~~(i / texture_width) / texture_width;
		var c = new THREE.Color( 0x000000 + ~~(v / 9) / BIRDS * 0x000000 );

		boid_colors.array[v*3] = c.r;
		boid_colors.array[v*3+1] = c.g;
		boid_colors.array[v*3+2] = c.b;
		references.array[v*2] = x;
		references.array[v*2+1] = y;
		boid_vertex.array[v] = v % 9;
	}
	this.scale( 0.3, 0.3, 0.3);
};
THREE.BirdGeometry.prototype = Object.create(THREE.BufferGeometry.prototype );
