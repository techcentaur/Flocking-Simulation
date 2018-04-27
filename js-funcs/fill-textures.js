function position_texture(t) {
	var t_array = t.image.data;

	for (var i = 0, j = t_array.length; i<j; i+=4) {
		var x = Math.random()*100;
		var y = Math.random()*100;
		var z = Math.random()*100;

		t_array[i+0] = x;
		t_array[i+1] = y;
		t_array[i+2] = z;
		t_array[i+3] = 1;
	}
}

function velocity_texture(t) {
	var t_array = t.image.data;

	for ( var i=0, j = t_array.length; i < j; i += 4 ) {
		var x = Math.random() - 0.5;
		var y = Math.random() - 0.5;
		var z = Math.random() - 0.5;

		t_array[i+0] = x * 10;
		t_array[i+1] = y * 10;
		t_array[i+2] = z * 10;
		t_array[i+3] = 1;
	}
}