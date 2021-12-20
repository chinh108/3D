import * as THREE from "https://threejs.org/build/three.module.js";
import {OrbitControls} from "../controls/OrbitControls.js";
import {GLTFLoader} from "../loaders/GLTFLoader.js";

let scene, camera, renderer, hlight, directionalLight, light, light2, light3, light4, controls;

function app() {

    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load("model/background/background.jpg");

    camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Lighting
    hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff,100);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,300,500);
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(500,100,0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,100,-500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-500,300,0);
    scene.add(light4);

    //OrbitControls
    controls = new OrbitControls(camera);
    controls.addEventListener('change', renderer);

    //GLTFLoader
    let loader = new THREE.GLTFLoader();
    loader.load('model/char/scene.gltf', function(gltf) {
        grunt = gltf.scene.children[0];
        grunt.scale.set(0.5,0.5,0.5);
        scene.add(gltf.scene);
        renderer.render(scene,camera);
        animate();
    });

    function animate() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }
}

window.app = app;
