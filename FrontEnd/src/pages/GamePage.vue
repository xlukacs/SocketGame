<template>
  <div id="gameArea" v-on:click="movePlayer"></div>
  <div class="errorMessage">Please wait...</div>
  <div class="controlsMobile">
    <q-btn color="primary" label="<=" @click="turnLeft" />
    <q-btn color="primary" label="=>" @click="turnRight" />
  </div>
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
    turnLeft() {
      var object = scene.getObjectByName(this.playerName, true);
      object.rotation.y += 0.1;
    },
    turnRight() {
      var object = scene.getObjectByName(this.playerName, true);
      object.rotation.y -= 0.1;
    },
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
  async mounted() {
    this.init();

    //testCube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    //test Bence
    await loadObject(
      scene,
      camera,
      "benceBouncer.obj",
      "benceBouncer.bmp",
      "bence"
    );
    console.log("Done with Bence");

    //test grass
    await loadObject(scene, camera, "cube.obj", "grass.bmp", "ground");
    console.log("Done with grass");

    //test duck
    await loadObject(
      scene,
      camera,
      "rubberDuck.obj",
      "rubberDuck.bmp",
      "rubberDucky"
    );
    console.log("Done with rubberDuck");

    //access the objects in the scene
    setTimeout(() => {
      document.getElementsByClassName("errorMessage")[0].style.display = "none";
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

<style lang="scss" scoped>
.errorMessage {
  position: fixed;
  top: 0;
  left: 0px;
  font-weight: bold;
  font-size: 5em;
  color: black;
  z-index: 1001;
}
.controlsMobile {
  position: fixed;
  top: 0px;
  left: 0px;
  button {
    margin: 10px;
  }
}
</style>
