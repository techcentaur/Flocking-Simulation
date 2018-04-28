function initialize_birds() {
	var geometry = new THREE.BirdGeometry();

	uniform_boid = {
		color: { value: new THREE.Color( 0xff2200 ) },
		texturePosition: { value: null },
		textureVelocity: { value: null },
		clock: { value: 1.0 },
		delta: { value: 0.0 }
	};

	var material = new THREE.ShaderMaterial( {
		uniforms: uniform_boid,
		vertexShader:   document.getElementById('VSbirds').textContent,
		fragmentShader: document.getElementById('FSbirds').textContent,
		side: THREE.DoubleSide
	});

	var mesh_boid = new THREE.Mesh( geometry, material );
	mesh_boid.rotation.y = Math.PI / 2;
	mesh_boid.matrixAutoUpdate = false;
	mesh_boid.updateMatrix();
	scene.add(mesh_boid);
}
