<template>
  <div id="gameArea"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

import { DirectionalLight } from "three";

import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePage",
  setup() {
    return {};
  },
  methods: {},
  mounted() {
    // create scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    ///camera.position.y = 15;
    //camera.position.x = 15;
    //camera.position.z = -5;
    camera.position.set(5, 5, 15);
    const renderer = new THREE.WebGLRenderer();

    // set renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // add renderer to mount point
    document.getElementById("gameArea").appendChild(renderer.domElement);

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    light.castShadow = true;

    // Add the light to the scene
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // instantiate a loader
    const loader = new OBJLoader();
    const textureLoader = new TextureLoader();

    // load a resource
    loader.load(
      // resource URL
      "assets/models/rubberDuck.obj",
      // called when resource is loaded
      function (object) {
        const texture = textureLoader.load(
          "assets/models/rubberDuck.bmp",
          () => {
            // Create a MeshLambertMaterial with the texture
            const material = new MeshLambertMaterial({
              map: texture,
            });

            // Apply the material to the mesh
            object.traverse((child) => {
              if (child instanceof Mesh) {
                child.material = material;
              }
            });

            // Add the mesh to your scene
            scene.add(object);
            object.position.set(0, 0, 0);
            object.scale.set(1, 1, 1);
            //object.rotation.y += 3.14159;
            //object.rotation.z += 3.14159;
            object.rotation.x -= Math.PI / 2;
            //camera.lookAt(object.position);
          }
        );
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
        console.error(error);
      }
    );

    // render loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  },
});
</script>
