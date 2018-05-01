function render(){
	var now = performance.now();
	var delta = (now - last) / 1000;

	if (delta > 1) delta = 1; // safety cap on large deltas
	last = now;

	uniform_pos.clock.value = now;
	uniform_pos.delta.value = delta;
	uniform_vel.clock.value = now;
	uniform_vel.delta.value = delta;
	uniform_boid.clock.value = now;
	uniform_boid.delta.value = delta;
	uniform_vel.falcon.value.set(0.5*mouse_move_width/window_widthhalf, -0.5*window_heighthalf/window_m, 0);

	mouse_move_width = 10000;
	mouse_move_height = 10000;

	gpu.compute();

	uniform_boid.texturePosition.value = gpu.getCurrentRenderTarget(pos).texture;
	uniform_boid.textureVelocity.value = gpu.getCurrentRenderTarget(vel).texture;

	renderer.render(scene, camera);
}