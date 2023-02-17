<template>
  <div class="loadingScreen" v-if="loading">
    <h1>Game loading, please wait...</h1>
    <q-linear-progress size="25px" :value="loadingProgress" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge
          color="white"
          text-color="accent"
          :label="loadingProgressLabel"
        ></q-badge>
      </div>
    </q-linear-progress>
  </div>

  <div id="gameArea" v-on:click="movePlayer"></div>
  <div class="errorMessage" v-if="errorMessage">{{ errorMessage }}</div>

  <div class="controlsMobile" v-if="!loading">
    <q-btn color="primary" label="<=" @click="turnLeft" />
    <q-btn color="primary" label="=>" @click="turnRight" />
  </div>

  <div class="hotbar" v-if="!loading">
    <q-btn
      :color="hotbarItem.isActive ? 'info' : 'primary'"
      @click="activateHotbar(hotbarItem.index)"
      v-for="hotbarItem in hotbar"
      :key="hotbarItem.id"
      dense
    >
      <q-img :src="hotbarItem.bg" width="50px" height="50px">
        <div
          class="absolute-bottom text-center hotbarItemCount"
          v-if="hotbarItem.type != 'formation' && hotbarItem.type != 'empty'"
        >
          155k
        </div>
      </q-img>
    </q-btn>
  </div>
</template>

<script>
import * as THREE from "three";

import { DirectionalLight } from "three";

import { defineComponent } from "vue";

import { setupDrones, handleFormationCall } from "assets/scripts/drones";
import { activateSlot } from "assets/scripts/hotbar";

import {
  initAssets,
  setInitPositions,
} from "assets/scripts/managers/assetManager";

let scene, camera, renderer;

export default defineComponent({
  name: "GamePage",
  setup() {
    return {};
  },
  computed: {
    loadingProgressLabel() {
      return (this.loadingProgress * 100).toFixed(2) + "%";
    },
  },
  data() {
    return {
      loadingProgress: 0.0,
      loading: true,
      errorMessage: "",
      camera: {
        offsetX: 0,
        offsetY: 70,
        offsetZ: 25,
      },
      playerName: "bence",
      playerPos: {
        x: 0,
        y: 0,
      },
      hotbar: [
        {
          item: "default",
          type: "formation",
          value: 0,
          index: 0,
          bg: "assets/pic/drones/defaultFormation.png",
          isActive: true,
        },
        {
          item: "turtle",
          type: "formation",
          value: 0,
          index: 1,
          bg: "assets/pic/drones/turtleFormation.png",
          isActive: false,
        },
        {
          item: "LCB-10",
          type: "laserAmmo",
          value: 1255,
          index: 2,
          bg: "assets/pic/ammo/lcb10.png",
          isActive: true,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 3,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 4,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 5,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 6,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 7,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
        {
          item: "",
          type: "empty",
          value: 0,
          index: 8,
          bg: "assets/pic/emptyHotbar.png",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    activateHotbar(nthItem) {
      if (this.hotbar[nthItem].type == "formation") {
        handleFormationCall(this.hotbar[nthItem].item, scene);
        activateSlot(this.hotbar, nthItem);
      }
    },
    async animateMovement(from, to) {
      var begPoint = new THREE.Vector3(from.x, from.z, from.y);
      var endPoint = new THREE.Vector3(to.x, to.z, to.y);
      var distance = begPoint.distanceTo(endPoint);

      var steps = Math.ceil(distance / 1);
      var time = 30;

      //console.log("From", from, "\nTO", to);

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
        //console.log("X+ ", xStepAmount, "\nY+", yStepAmount);

        const animFrame = window.setInterval(() => {
          this.playerPos.x += xStepAmount;
          this.playerPos.y += yStepAmount;

          var object = scene.getObjectByName(this.playerName, true);
          object.position.set(this.playerPos.x, 0, this.playerPos.y);

          camera.position.set(
            this.playerPos.x,
            camera.position.y,
            this.playerPos.y + this.camera.offsetZ
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

            //console.log("DONE MOVING", this.playerPos);
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
      const screenMiddleX = window.innerWidth / 2;
      const screenMiddleY = window.innerHeight / 2;

      var moveByX = screenMiddleX - ev.clientX;
      var moveByY = screenMiddleY - ev.clientY;

      moveByX /= -8;
      moveByY /= -8;

      var moveToPosX = this.playerPos.x + moveByX;
      var moveToPosY = this.playerPos.y + moveByY;

      var object = scene.getObjectByName(this.playerName, true);

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
        //console.log("CLICKPOINT MOVED TO: " + moveToPosX + "/" + moveToPosY);

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
        //console.log("CLICKPOINT ADDED TO: " + moveToPosX + "/" + moveToPosY);

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
        this.activateHotbar(0);
      }
      if (key.code == "Digit2") {
        this.activateHotbar(1);
      }
      if (key.code == "Digit3") {
        this.activateHotbar(2);
      }
      if (key.code == "Digit4") {
        this.activateHotbar(3);
      }
      if (key.code == "Digit5") {
        this.activateHotbar(4);
      }
      if (key.code == "Digit6") {
        this.activateHotbar(5);
      }
      if (key.code == "Digit7") {
        this.activateHotbar(6);
      }
      if (key.code == "Digit8") {
        this.activateHotbar(7);
      }
      if (key.code == "Digit9") {
        this.activateHotbar(8);
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
      camera.position.set(
        this.camera.offsetX,
        this.camera.offsetY,
        this.camera.offsetZ
      );

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
    console.log("Scene created.");

    await initAssets(scene, camera, (progress) => {
      this.loadingProgress = progress;
      console.log(this.loadingProgress);
    });

    //delay loading screen a bit
    window.setTimeout(() => {
      this.loading = false;
      console.log("Done loading the assets.");
    }, 500);

    await setInitPositions(scene, this.playerName);

    setupDrones(scene, this.playerName);

    // render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  },
});
</script>

<style lang="scss" scoped>
.loadingScreen {
  background-color: black;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  color: white;
}

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

.hotbar {
  width: 522px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.hotbarItemCount {
  padding: 0px;
}
</style>
