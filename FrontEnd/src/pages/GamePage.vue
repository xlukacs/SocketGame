<template>
  <div id="gameArea" v-on:click="movePlayer"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

import { DirectionalLight } from "three";

import { defineComponent } from "vue";

import { loadObject } from "assets/scripts/util";

let scene, camera, renderer;

export default defineComponent({
  name: "GamePage",
  setup() {
    return {};
  },
  data() {
    return {
      playerName: "bence",
    };
  },
  methods: {
    movePlayer(ev) {
      console.log(ev.clientX);
      console.log(ev.clientY);

      const screenMiddleX = window.innerWidth / 2;
      const screenMiddleY = window.innerHeight / 2;

      var moveByX = screenMiddleX - ev.clientX;
      var moveByY = screenMiddleY - ev.clientY;

      moveByX /= -10;
      moveByY /= -10;

      var object = scene.getObjectByName(this.playerName, true);
      object.position.set(
        object.position.x + moveByX,
        0,
        object.position.z + moveByY
      );

      camera.position.set(
        camera.position.x + moveByX,
        camera.position.y,
        camera.position.z + moveByY
      );
    },
    handleKey(key) {
      var object = scene.getObjectByName(this.playerName, true);
      if (key.key == "q") {
        object.rotation.y += 0.1;
      }
      if (key.key == "e") {
        object.rotation.y -= 0.1;
      }
    },
    init() {
      window.addEventListener("keypress", (e) => {
        this.handleKey(e);
      });

      //scene
      scene = new THREE.Scene();

      //camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 40, 15);

      //render pipeline
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("gameArea").appendChild(renderer.domElement);

      //basic light
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(0, 10, 0);
      light.castShadow = true;
      scene.add(light);
    },
  },
  mounted() {
    this.init();

    //testCube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //test duck
    loadObject(
      scene,
      camera,
      "rubberDuck.obj",
      "rubberDuck.bmp",
      "rubberDucky"
    );

    //test grass
    loadObject(scene, camera, "cube.obj", "grass.bmp", "ground");

    //test Bence
    loadObject(scene, camera, "benceBouncer.obj", "benceBouncer.bmp", "bence");

    //access the objects in the scene
    setTimeout(() => {
      var object = scene.getObjectByName("rubberDucky", true);
      object.position.set(0, 0, 0);
      object.scale.set(1, 1, 1);
      object.rotation.x -= Math.PI / 2;

      object = scene.getObjectByName("ground", true);
      object.position.set(0, 0, 0);
      object.scale.set(100, 1, 100);

      object = scene.getObjectByName(this.playerName, true);
      object.position.set(0, 0, 0);
      object.scale.set(10, 10, 10);
    }, 1000);

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
