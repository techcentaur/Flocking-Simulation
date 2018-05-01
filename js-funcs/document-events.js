function mouse_move_event(e) {
	mouse_move_width = e.clientX - window_widthhalf;
	mouse_move_height = e.clientY - window_heighthalf;
}

function mouse_touch_start(e) {
	if (e.touches.length === 1) {
		e.preventDefault();
		mouse_move_width = e.touches[0].pageX - window_widthhalf;
		mouse_move_height = e.touches[0].pageY - window_heighthalf;
	}
}

function mouse_touch_move(e) {
	if ( e.touches.length === 1 ) {
		e.preventDefault();
		mouse_move_width = e.touches[0].pageX - window_widthhalf;
		mouse_move_height = e.touches[0].pageY - window_heighthalf;
	}
}
function start_flocking(){
	requestAnimationFrame(animate);
	render();
	stats.update();
}