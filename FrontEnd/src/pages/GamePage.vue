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

import { DirectionalLight } from "three";

import { defineComponent } from "vue";

import { loadObject } from "assets/scripts/util";
import {
  setupDrones,
  defaultFormation,
  turtleFormation,
} from "assets/scripts/drones";

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
    async animateMovement(from, to) {
      var begPoint = new THREE.Vector3(from.x, from.z, from.y);
      var endPoint = new THREE.Vector3(to.x, to.z, to.y);
      var distance = begPoint.distanceTo(endPoint);

      var steps = Math.ceil(distance / 1);
      var time = 30;

      console.log("From", from, "\nTO", to);

      if (steps > 0) {
        let xStepAmount = 0,
          yStepAmount = 0;

        if (from.x < to.x) {
          xStepAmount = (to.x - from.x) / steps;
        } else {
          xStepAmount = (from.x - to.x) / steps;
          xStepAmount *= -1;
        }

        if (from.y < to.y) {
          yStepAmount = (to.y - from.y) / steps;
        } else {
          yStepAmount = (from.y - to.y) / steps;
          yStepAmount *= -1;
        }
        console.log("X+ ", xStepAmount, "\nY+", yStepAmount);

        const animFrame = window.setInterval(() => {
          this.playerPos.x += xStepAmount;
          this.playerPos.y += yStepAmount;

          var object = scene.getObjectByName(this.playerName, true);
          object.position.set(this.playerPos.x, 0, this.playerPos.y);

          camera.position.set(
            this.playerPos.x,
            camera.position.y,
            this.playerPos.y
          );

          object = scene.getObjectByName("pathToClick", true);
          object.geometry.dispose();
          var points = [];
          points.push(new THREE.Vector3(this.playerPos.x, 2, this.playerPos.y));
          points.push(new THREE.Vector3(to.x, 2, to.y));

          var updatedGeometry = new THREE.BufferGeometry().setFromPoints(
            points
          );
          object.geometry = updatedGeometry;

          steps--;
          if (steps <= 0) {
            window.clearInterval(animFrame);

            console.log("DONE MOVING", this.playerPos);
            object = scene.getObjectByName("pathToClick", true);
            scene.remove(object);
            object = scene.getObjectByName("tempClickPoint", true);
            scene.remove(object);
          }
        }, time);
      }
    },
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
        points.push(new THREE.Vector3(this.playerPos.x, 2, this.playerPos.y));
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
        points.push(new THREE.Vector3(this.playerPos.x, 2, this.playerPos.y));
        points.push(new THREE.Vector3(moveToPosX, 2, moveToPosY));

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        var line = new THREE.Line(geometry, material);
        line.name = "pathToClick";

        scene.add(line);
      }

      //rotate player towards the clicked position
      object = scene.getObjectByName(this.playerName, true);
      object.lookAt(moveToPosX, 0, moveToPosY);

      //move player
      this.animateMovement(
        { x: this.playerPos.x, z: 0, y: this.playerPos.y },
        { x: moveToPosX, z: 0, y: moveToPosY }
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
      if (key.code == "Digit1") {
        defaultFormation(scene);
      }
      if (key.code == "Digit2") {
        turtleFormation(scene);
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
    //console.log("Done with Bence");

    //test grass
    await loadObject(scene, camera, "cube.obj", "grass.bmp", "ground");
    //console.log("Done with grass");

    //test duck
    await loadObject(
      scene,
      camera,
      "rubberDuck.obj",
      "rubberDuck.bmp",
      "originalRubberDucky"
    );
    //console.log("Done with rubberDuck");

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

      setupDrones(scene, this.playerName);
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
