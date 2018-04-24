uniform float clock;
uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;

attribute float boid_vertex;
attribute vec2 frame_vector;
attribute vec3 boid_color;

varying vec4 vertex_texture_4D;
varying float zcoordi;

void main() {
	vec4 temp_position = texture2D(texturePosition, frame_vector);
	vec3 boid_position = temp_position.xyz;
	vec3 boid_velocity = normalize(texture2D(textureVelocity, frame_vector).xyz);
	vec3 next_moment_position = boid_position;

	if (boid_vertex==4.0 || boid_vertex==7.0) {
		next_moment_position.y = sin(temp_position.w)*7.;
	}

	next_moment_position = mat3(modelMatrix)*next_moment_position;
	boid_velocity.z *= -1.;
	float mov1 = length(boid_velocity.xz);
	float mov2 = 1.;
	float mov3 = Math.sqrt(1. - Math.pow(boid_velocity.y, 2));

	float sin_roty = boid_velocity.z / mov1;
	float cos_roty = boid_velocity.x / mov1;
	float cos_rotz = mov3 / mov2;
	float sin_rotz = boid_velocity.y / mov2;

	mat3 matrixy =  mat3( cos_roty, 0, -sin_roty, 0, 1, 0, sin_roty, 0, cos_roty);
	mat3 matrixz =  mat3(cos_rotz , sin_rotz, 0, -sin_rotz, cos_rotz, 0, 0, 0, 1);
	
	next_moment_position =  matrixy*matrixz*next_moment_position;
	next_moment_position += boid_position;

	zcoordi = next_moment_position.z;
	// webGL position rendering - VOB
	vertex_texture_4D = vec4(boid_color, 1.0);
	gl_Position = projectionMatrix*viewMatrix*vec4(next_moment_position, 1.0);

}
