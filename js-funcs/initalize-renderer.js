function inititalize_renderer() {

	gpu = new GPUComputationRenderer( texture_width, texture_width, renderer );

	var dtpos = gpu.createTexture();
	var dtvel = gpu.createTexture();
	position_texture(dtpos);
	velocity_texture(dtvel);

	vel = gpu.addVariable("textureVelocity", document.getElementById('FSbirdvelocity').textContent, dtvel);
	pos = gpu.addVariable("texturePosition", document.getElementById('FSbirdposition').textContent, dtpos);

	gpu.setVariableDependencies(vel, [pos, vel]);
	gpu.setVariableDependencies(pos, [pos, vel]);

	uniform_pos = pos.material.uniforms;
	uniform_vel = vel.material.uniforms;

	uniform_pos.clock = { value: 0.0 };
	uniform_pos.delta = { value: 0.0 };
	uniform_vel.clock = { value: 1.0 };
	uniform_vel.delta = { value: 0.0 };
	uniform_vel.testing = { value: 1.0 };
	uniform_vel.seperation_distance = { value: 1.0 };
	uniform_vel.alignment_distance = { value: 1.0 };
	uniform_vel.cohesion_distance = { value: 1.0 };
	uniform_vel.freedom_factor = { value: 1.0 };
	uniform_vel.falcon = { value: new THREE.Vector3() };
	vel.material.defines.bounds = bounds.toFixed( 2 );

	vel.wrapS = THREE.RepeatWrapping;
	vel.wrapT = THREE.RepeatWrapping;
	pos.wrapS = THREE.RepeatWrapping;
	pos.wrapT = THREE.RepeatWrapping;

	var error = gpu.init();
	if ( error !== null ) {console.error( error );}
}