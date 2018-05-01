function initial() {
	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	scene.fog = new THREE.Fog( 0xffffff, 100, 1000 );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x66C2FF);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled= true;
    renderer.shadowMapSoft = true;
                
    camera.position.x = 43;
    camera.position.y = 55;
    camera.position.z = 15; 
    camera.lookAt(scene.position);

    /*datGUI controls object*/
    guiControls = new function(){
        this.rotationX  = 0.0;
        this.rotationY  = 0.0;
        this.rotationZ  = 0.0;
        
        this.lightX = 19;
        this.lightY = 47;
        this.lightZ = 19;

        this.intensity = 2.5;       
        this.distance = 373;
        this.angle = 1.6;
        this.exponent = 38;
        
        this.shadowCameraNear = 34;
        this.shadowCameraFar = 2635;
        this.shadowCameraFov = 68;
        this.shadowCameraVisible=false;
        this.shadowMapWidth=512;
        this.shadowMapHeight=512;
        this.shadowBias=0.00;
        this.shadowDarkness=0.11;       
    }

    /*adds spot light with starting parameters*/
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    spotLight.intensity = guiControls.intensity;        
    spotLight.distance = guiControls.distance;
    spotLight.angle = guiControls.angle;
    spotLight.exponent = guiControls.exponent;
    spotLight.shadowCameraNear = guiControls.shadowCameraNear;
    spotLight.shadowCameraFar = guiControls.shadowCameraFar;
    spotLight.shadowCameraFov = guiControls.shadowCameraFov;
    spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
    spotLight.shadowBias = guiControls.shadowBias;
    spotLight.shadowDarkness = guiControls.shadowDarkness;
    scene.add(spotLight);

	inititalize_renderer();
    container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

    var values = { seperation: 20.0, alignment: 30.0, cohesion: 30.0, freedom: 0.3 };

	var gui = new dat.GUI();
	var new_values_inserted = function() {
		velocityUniforms.seperation_distance.value = values.seperation;
		velocityUniforms.alignment_distance.value = values.alignment;
		velocityUniforms.cohesion_distance.value = values.cohesion;
		velocityUniforms.freedom_factor.value = values.freedom;
	};
	new_values_inserted();
	
	gui.add( values, "seperation", 0.0, 100.0, 1.0 ).onChange( valuesChanger );
	gui.add( values, "alignment", 0.0, 100, 0.001 ).onChange( valuesChanger );
	gui.add( values, "cohesion", 0.0, 100, 0.025 ).onChange( valuesChanger );
	gui.close();

	initialize_birds();
}