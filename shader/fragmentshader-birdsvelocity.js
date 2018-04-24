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
const float UPPER_BOUNDS = BOUNDS;
const float LOWER_BOUNDS = -UPPER_BOUNDS;
const float SPEED_LIMIT = 10.0;

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
	vec3 falcon_direction =falcon*UPPER_BOUNDS - position;
	//change this initial vector z-direction
	falcon_direction.z = 0.;
	// dir.z *= 0.6;
	float dist_should_move_away = Math.pow(length(dir), 2);
	float radii_falcon_view = 200.0;
	float area_falcon_view = Math.pow(preyRadius, 2);

	float limit = SPEED_LIMIT;
	// movement of birds away from falcon
	if (length(falcon_direction) < radii_falcon_view) {
		float change = (dist_should_move_away/area_falcon_view - 1.0)*delta*100.;
		awayfrompredator_velocity += normalize(falcon_direction)*change;
		limit += 5.0;
	}

	//----------------------------------------------main modeling of rules according to Craig Reynold's basic flocking movement algorithm-----------------------------------------------

	// attract all boids to the center of the flock movement
	vec3 perceived_center = vec3( 0., 0., 0. );
	dir = position - central;
	dist = length( dir );

	dir.y *= 2.5;
	velocity -= normalize( dir ) * delta * 5.;

	for (float y=0.0;y<height;y++) {
		for (float x=0.0;x<width;x++) {

			vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
			birdPosition = texture2D( texturePosition, ref ).xyz;

			dir = birdPosition - selfPosition;
			dist = length(dir);

			if (dist < 0.0001) continue;

			distSquared = dist * dist;

			if (distSquared > zoneRadiusSquared ) continue;

			percent = distSquared / zoneRadiusSquared;

			if ( percent < separationThresh ) { // low

				// Separation - Move apart for comfort
				f = (separationThresh / percent - 1.0) * delta;
				velocity -= normalize(dir) * f;

			} else if ( percent < alignmentThresh ) { // high

				// Alignment - fly the same direction
				float threshDelta = alignmentThresh - separationThresh;
				float adjustedPercent = ( percent - separationThresh ) / threshDelta;

				birdVelocity = texture2D( textureVelocity, ref ).xyz;

				f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
				velocity += normalize(birdVelocity) * f;

			} else {

				// Attraction / Cohesion - move closer
				float threshDelta = 1.0 - alignmentThresh;
				float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

				f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

				velocity += normalize(dir) * f;

			}

		}

	}



	// this make tends to fly around than down or up
	if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

	// Speed Limits
	if ( length( velocity ) > limit ) {
		velocity = normalize( velocity ) * limit;
	}

	gl_FragColor = vec4( velocity, 1.0 );

}

</script>