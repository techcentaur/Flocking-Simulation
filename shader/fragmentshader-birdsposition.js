/**the fragment shader for bird's position - webGL*/

uniform float clock;
uniform float delta;

void main()	{	
	vec2 coordinate_move = gl_FragCoord.xy / resolution.xy;
	vec4 temp_position = texture2D(texturePosition, coordinate_move);
	vec3 bird_position = temp_position.xyz;
	vec3 bird_velocity = texture2D(textureVelocity, coordinate_move).xyz;

	float 4th_entity = temp_position.w;
	4th_entity = mod((4th_entity + delta + length(bird_velocity.xz)*delta*3. + max(bird_velocity.y, 0.0)*delta*6.), 62.83);

	gl_FragColor = vec4(bird_position + bird_velocity*delta*15., 4th_entity);
}
