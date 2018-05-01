/**
 * @author mattatz / http://github.com/mattatz
 *
 * Ray tracing based cloud noise shader.
 */

THREE.CloudShader = {

    defines: {
        "ITERATIONS"    : "8",
        "KAPPA"         : "0.2",
        "MOD3"          : "(.16532, .17369, .15787)",
    },

    uniforms: {
        "color"         : { type : "c",     value : null },
        "time"          : { type : "f",     value : 0.0 },
        "seed"          : { type : "f",     value : 0.0 },
        "invModelMatrix": { type : "m4",    value : null },
        "scale"         : { type : "v3",    value : null }
    },

    vertexShader: [
        "varying vec3 vWorldPos;",
        "void main() {",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
            "vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;",
        "}"
    ].join("\n"),

    fragmentShader: [

        "uniform vec3 color;",
        "uniform float time;",
        "uniform float seed;",
        "uniform mat4 invModelMatrix;",
        "uniform vec3 scale;",

        "varying vec3 vWorldPos;",

        "float hash(vec3 p) {",
            "p = fract(p * MOD3);",
            "p += dot(p.xyz, p.yzx + 19.19);",
            "return fract(p.x * p.y * p.z);",
        "}",

        "float noise(vec3 p) {",
            "vec3 i = floor(p);",
            "vec3 f = fract(p);",
            "f *= f * (3.0 - 2.0 * f);",
            "return mix(",
                "mix(",
                    "mix(hash(i + vec3(0.,0.,0.)), hash(i + vec3(1.,0.,0.)),f.x),",
                    "mix(hash(i + vec3(0.,1.,0.)), hash(i + vec3(1.,1.,0.)),f.x),",
                    "f.y",
                "),",
                "mix(",
                    "mix(hash(i + vec3(0.,0.,1.)), hash(i + vec3(1.,0.,1.)),f.x),",
                    "mix(hash(i + vec3(0.,1.,1.)), hash(i + vec3(1.,1.,1.)),f.x),",
                    "f.y",
                "),",
                "f.z",
            ");",
        "}",

        "float fbm(vec3 p) {",
            "float f;",

            "f = 0.5000 * noise(p);",
            "p = p * 3.02;",
            "p.y -= (seed + time) * 0.05;",

            "f += 0.2500 * noise(p);",
            "p = p * 3.03;",
            "p.y += (seed + time) * 0.06;",

            "f += 0.1250 * noise(p);",
            "p = p * 3.01;",

            "f += 0.0625   * noise(p);",
            "p =  p * 3.03;",

            "f += 0.03125  * noise(p);",
            "p =  p * 3.02;",

            "f += 0.015625 * noise(p);",

            "return f;",
        "}",

        "vec3 localize(vec3 p) {",
            "return (invModelMatrix * vec4(p, 1.0)).xyz;",
        "}",

        "void main() {",

            "vec3 rayPos = vWorldPos;",
            "vec3 rayDir = normalize(rayPos - cameraPosition);",
            "float rayLen = 0.1 * length(scale.xyz);",

            "float c = 0.0;",

            "float t = 1.0;",

            "for(int i = 0; i < ITERATIONS; i++) {",
                "rayPos += rayDir * rayLen;",

                "vec3 lp = localize(rayPos);",

                "float delta = exp(- KAPPA * rayLen);",
                "t *= delta;",

                "float den = fbm(lp);",
                "den = clamp(- length(lp) + den * 0.75, 0.0, 1.0);",
                "c += 1.0 / KAPPA * (1.0 - delta) * t * den;",
            "}",

            "gl_FragColor = vec4(pow(c, 0.5) * 9.0 * color, c * 80.0);",
        "}",

	].join("\n")

};
