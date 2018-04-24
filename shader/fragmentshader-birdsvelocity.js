/**the fragment shader for bird's veloctiy - webGL*/

const float PI = 3.141592653589793;

uniform float clock;
uniform float testing;
uniform float delta;

uniform float cohesion_distance; 
uniform float alignment_distance;
uniform float seperation_distance;
uniform float freedom_factor;

//3-D vector position of predator - (say) Falcon
uniform vec3 falcon;

//constants - 1-dimensions
const float height = resolution.y;
const float width = resolution.x;
const float upper_bound = BOUNDS;
const float lower_bound = -upper_bound;
const float speed_limit = 10.0;

float alignment_limit = 1.0;
float separation_limit = 0.5;
float radii_sector = 30.0;
float area_sector = 900.0;

float hashfunction(vec2 dotvector){
	return fract(sin(dot(dotvector.xy ,vec2(12.9898,78.233)))*43758.5453);
}

void main() {
	radii_sector = (seperation_distance + alignment_distance + cohesion_distance)*1.15;
	separation_limit = seperation_distance / radii_sector;

	alignment_limit = (seperation_distance + alignment_distance)/radii_sector;
	area_sector=Math.pow(radii_sector, 2);

	vec2 coordinate_move = gl_FragCoord.xy/resolution.xy;
	vec3 boid_position, boid_velocity;
	vec3 position = texture2D(texturePosition, coordinate_move).xyz;
	vec3 velocity = texture2D(textureVelocity, coordinate_move).xyz;
	vec3 boid_direction;
	vec3 awayfrompredator_velocity = velocity;
	vec3 falcon_direction =falcon*upper_bound - position;
	//change this initial vector z-direction
	falcon_direction.z = 0.;
	// dir.z *= 0.6;
	float dist_should_move_away = Math.pow(length(dir), 2);
	float radii_falcon_view = 200.0;
	float area_falcon_view = Math.pow(preyRadius, 2);

	float limit = speed_limit;
	float change;

	// movement of birds away from falcon
	if (length(falcon_direction) < radii_falcon_view) {
		change = (dist_should_move_away/area_falcon_view - 1.0)*delta*100.;
		awayfrompredator_velocity += normalize(falcon_direction)*change;
		limit += 5.0;
	}

	//----------------------------------------------main modeling of rules according to Craig Reynold's basic flocking movement algorithm-----------------------------------------------

	float rate;

	// attract all boids to the center of the flock movement
	vec3 perceived_center = vec3( 0., 0., 0. );
	vec3 next_direction = position - perceived_center;
	float next_move_dist = length(next_direction);
	next_direction.y *= 2.5;
	
	vec3 nextmoment_velocity = awayfrompredator_velocity - normalize(next_direction)*delta*5.2;

	for (float y=0.0;y<height;y++) {
		for (float x=0.0;x<width;x++) {
			vec2 reference = vec2(x+0.5, y+0.5)/resolution.xy;

			boid_position = texture2D(texturePosition, reference).xyz;
			next_direction = boid_position - position;
			
			if (length(next_direction) < 0.0001) continue;
			next_move_dist = Math.pow(length(next_direction), 2);

			if (next_move_dist > area_sector) continue;
			rate = next_move_dist / area_sector;

			// RULE 1 : Separation - move apart
			if (rate < separation_limit) {
				change = (separation_limit/rate - 1.0)*delta;
				nextmoment_velocity = nextmoment_velocity - normalize(next_direction)*change;
			}
			// RULE 2: Alignment - fly in the same direction
			else if (rate < alignment_limit) {
				float rate_adjust = (rate - separation_limit ) / (alignment_limit - separation_limit);
				boid_velocity = texture2D(textureVelocity, reference).xyz;
				change = (0.5 - cos(rate_adjust*PI*2.0)*0.5 +0.5)*delta;
				nextmoment_velocity += normalize(boid_velocity) * change;
			}
			// RULE 3: Cohesion - steer towards the flock
			else {
				float rate_adjust = (rate - alignment_limit)/(1.0 - alignment_limit);
				change = (0.5 - (cos(rate_adjust*PI*2.0)* -0.5 + 0.5))*delta;
				nextmoment_velocity += normalize(next_direction)*change;
			}
		}
	}
	// this make tends to fly around than down or up
	// if (nextmoment_velocity.y > 0.) nextmoment_velocity.y *= (1. - 0.2 * delta);

	if (length(nextmoment_velocity) > limit){
		nextmoment_velocity = normalize(nextmoment_velocity) * limit;
	}
	gl_FragColor = vec4(velocity, 1.0);
}