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
      playerPos: {
        x: 0,
        y: 0,
      },
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

      var moveToPosX = this.playerPos.x + moveByX;
      var moveToPosY = this.playerPos.y + moveByY;
      //this.playerPos.x += moveByX;
      //this.playerPos.y += moveByY;

      var object = scene.getObjectByName(this.playerName, true);
      // object.position.set(
      //   object.position.x + moveByX,
      //   0,
      //   object.position.z + moveByY
      // );

      // camera.position.set(
      //   camera.position.x + moveByX,
      //   camera.position.y,
      //   camera.position.z + moveByY
      // );

      let objectFound = false;
      for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].name === "tempClickPoint") {
          objectFound = true;
          break;
        }
      }
      if (objectFound) {
        object = scene.getObjectByName("tempClickPoint", true);
        object.position.set(moveToPosX, 2, moveToPosY);
        console.log("CLICKPOINT MOVED TO: " + moveToPosX + "/" + moveToPosY);

        object = scene.getObjectByName("pathToClick", true);
        scene.remove(object);

        var points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(moveToPosX, 2, moveToPosY));

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        var line = new THREE.Line(geometry, material);
        line.name = "pathToClick";

        scene.add(line);
      } else {
        object = scene.getObjectByName("originalRubberDucky", true);
        let clickPoint = object.clone();
        clickPoint.name = "tempClickPoint";
        clickPoint.position.set(moveToPosX, 2, moveToPosY);
        clickPoint.scale.set(1, 1, 1);
        console.log("CLICKPOINT ADDED TO: " + moveToPosX + "/" + moveToPosY);

        scene.add(clickPoint);

        var points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(moveToPosX, 2, moveToPosY));

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        var line = new THREE.Line(geometry, material);
        line.name = "pathToClick";

        scene.add(line);
      }
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
      camera.position.set(0, 70, 15);

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
      "originalRubberDucky"
    );
    console.log("Done with rubberDuck");

    //access the objects in the scene
    setTimeout(() => {
      document.getElementsByClassName("errorMessage")[0].style.display = "none";
      var object = scene.getObjectByName("originalRubberDucky", true);
      object.position.set(0, 0, 0);
      object.scale.set(0, 0, 0);
      object.rotation.x -= Math.PI / 2;

      object = scene.getObjectByName("ground", true);
      object.position.set(0, 0, 0);
      object.scale.set(100, 1, 100);

      object = scene.getObjectByName(this.playerName, true);
      object.position.set(0, 0, 0);
      object.scale.set(10, 10, 10);

      //spawn drones
      object = scene.getObjectByName("originalRubberDucky", true);
      let drone1 = object.clone();
      let drone2 = object.clone();
      let drone3 = object.clone();
      let drone4 = object.clone();
      let drone5 = object.clone();
      let drone6 = object.clone();
      let drone7 = object.clone();
      let drone8 = object.clone();
      let drone9 = object.clone();
      let drone10 = object.clone();

      //drones
      //left
      drone1.name = "drone1";
      drone1.position.x -= 2;
      drone1.position.z -= 1;
      drone1.scale.set(0.1, 0.1, 0.1);

      drone2.name = "drone2";
      drone2.position.x -= 2.5;
      drone2.scale.set(0.1, 0.1, 0.1);

      drone3.name = "drone3";
      drone3.position.x -= 2;
      drone3.position.z += 1;
      drone3.scale.set(0.1, 0.1, 0.1);

      //back
      drone4.name = "drone4";
      drone4.position.x -= 1;
      drone4.position.z -= 3;
      drone4.scale.set(0.1, 0.1, 0.1);

      drone5.name = "drone5";
      drone5.position.z -= 3.5;
      drone5.scale.set(0.1, 0.1, 0.1);

      drone6.name = "drone6";
      drone6.position.x += 1;
      drone6.position.z -= 3;
      drone6.scale.set(0.1, 0.1, 0.1);

      drone7.name = "drone7";
      drone7.position.z -= 2;
      drone7.scale.set(0.1, 0.1, 0.1);

      //right
      drone8.name = "drone8";
      drone8.position.x += 2;
      drone8.position.z += 1;
      drone8.scale.set(0.1, 0.1, 0.1);

      drone9.name = "drone9";
      drone9.position.x += 2.5;
      drone9.scale.set(0.1, 0.1, 0.1);

      drone10.name = "drone10";
      drone10.position.x += 2;
      drone10.position.z -= 1;
      drone10.scale.set(0.1, 0.1, 0.1);

      //add to player
      object = scene.getObjectByName(this.playerName, true);
      object.add(drone1);
      object.add(drone2);
      object.add(drone3);
      object.add(drone4);
      object.add(drone5);
      object.add(drone6);
      object.add(drone7);
      object.add(drone8);
      object.add(drone9);
      object.add(drone10);
    }, 100);

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
