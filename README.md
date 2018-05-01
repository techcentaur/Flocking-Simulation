# Flocking-Simulation
Flocking simulation of starling murmuration using web graphics library(webGL) and openGL shader language in javascript.

#### Flocking behavior
Flocking is a the motion of birds together and flocking behavior is a type of behavior exhibited when a group of birds, called a flock, are in flight.

#### Starling mumuration
Starlings are small to medium-sized passerine birds in the family Sturnidae. It is known as murmuration, when a huge flocks of starling in migration form shape-shifting flight patterns. A good example is shown below - 

## About the program

We have used **GLSL(OpenGL Shading Language)** for bird's position, bird's velocity, bird's geometry and the vertices of bird's geomtery. A shading language is a graphics programming language adapted to programming shader effects. There is a hardware-based parallelization when computing in GPU, which makes the GPU particularly fit to process & render graphics.

**For Fragment-Shader**

```html
<script type="x-shader/x-fragment"></script>
```

**For Vertex Shader**
```html
<script type="x-shader/x-vertex"></script>
```


## Folder-Terminology

- **js-libs**: The static javascript library files from three.js and some from webGL-js.
- **js-func**: The functions in javascript used in the program.
- **shader**: Shader programs are the ones that are compiled in graphical processing unit.
- **css**: Used CSS stylesheets in the markup code.
- **img**: Images that shall be used in the front-end code.

## Running locally

- Just run the `index.html` file, having the embedded javascript files in it.

- Run on local server
	- install npm
	- install http-server (or similar package)
	- run the http-server from the folder where the script is located
	- Go the local server claimed by http-server

- For linux users the terminal commands are as follows-
	```console
	sudo apt-get install -y nodejs
	sudo apt-get install npm
	sudo npm install http-server -g
	http-server -c-1

	```

## Thanks to

- Thanks for the [three.js](https://github.com/mrdoob/three.js/) Javascript 3D library and the examples.

- This [project](https://github.com/OwenMcNaughton/Boids.js) by OwenMcNaughton for camera, scene, and 3D-viewpoint support.


## Informational Documents

- [Mathematical model of flocking behavior](http://www.diva-portal.org/smash/get/diva2:561907/FULLTEXT03.pdf)
- [Boids-algorithm - Pseudocode](http://www.kfish.org/boids/pseudocode.html)
- [Research Paper - Craig Reynold's simulation](http://www.csc.kth.se/utbildning/kandidatexjobb/datateknik/2011/rapport/erneholm_carl-oscar_K11044.pdf)


## A Useful Container
- Overleaf LaTex editor - mathematical modeling, click [here](https://www.overleaf.com/15649991qxqnpwqzxvjr)
- A [video](https://www.youtube.com/watch?v=b8eZJnbDHIg) of falcon attack on flock of starling.

