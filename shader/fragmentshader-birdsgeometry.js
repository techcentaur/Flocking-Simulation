// fragment shader for the design and geometry of boids. JSON exporter from Blender - three.js (flaps problem)
uniform vec3 color;
varying vec4 vertexcolors;
varying float zcoordinate;

void main() {
	float z = 0.2 + (1000. - zcoordinate)/1000. * vertexcolors.x;
	gl_FragColor = vec4(z, z, z, 1.);
}
