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

import {
  setupDrones,
  handleFormationCall,
  changeDroneDesign,
} from "assets/scripts/drones";
import { activateSlot } from "assets/scripts/hotbar";

import {
  initAssets,
  setInitPositions,
  spawnObject,
} from "assets/scripts/managers/assetManager";

import {
  getCoordsToMoveTo,
  placeIndicator,
} from "assets/scripts/managers/movementManager";

import {
  generateStarBackground,
  updateStarBackground,
} from "assets/scripts/managers/backgroundManager";

import { mapActions, mapGetters } from "vuex";
import { fetchGetRequest } from "src/assets/scripts/util";

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
    ...mapGetters("drones", {
      drones: "getAllDrones",
    }),
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
      playerData: {
        playerID: 0,
        playerName: "",
      },
      playerPos: {
        x: 0,
        y: 0,
        z: 0,
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
    ...mapActions("drones", ["removeDroneDesign", "addDroneDesign"]),
    activateHotbar(nthItem) {
      if (this.hotbar[nthItem].type == "formation") {
        activateSlot(this.hotbar, nthItem);

        this.$socket.emit("activated_drone_formation", {
          playerName: this.playerData.playerName,
          formation: this.hotbar[nthItem].item,
        });
      }
    },
    async animateMovement(from, to, objectName = this.playerData.playerName) {
      var begPoint = new THREE.Vector3(from.x, from.y, from.z);
      var endPoint = new THREE.Vector3(to.x, to.y, to.z);
      var distance = begPoint.distanceTo(endPoint);

      var steps = Math.ceil(distance / 1);
      var time = 15;

      if (steps > 0) {
        let xStepAmount = 0,
          zStepAmount = 0;

        if (from.x < to.x) {
          xStepAmount = (to.x - from.x) / steps;
        } else {
          xStepAmount = (from.x - to.x) / steps;
          xStepAmount *= -1;
        }

        if (from.z < to.z) {
          zStepAmount = (to.z - from.z) / steps;
        } else {
          zStepAmount = (from.z - to.z) / steps;
          zStepAmount *= -1;
        }

        var objectPosition = scene.getObjectByName(objectName, true).position;
        const animFrame = window.setInterval(() => {
          objectPosition.x += xStepAmount;
          objectPosition.z += zStepAmount;

          if (objectName == this.playerData.playerName) {
            this.playerPos.x = objectPosition.x;
            this.playerPos.z = objectPosition.z;
          }

          var object = scene.getObjectByName(objectName, true);
          object.position.set(objectPosition.x, 0, objectPosition.z);

          camera.position.set(
            objectPosition.x,
            camera.position.y,
            objectPosition.z + this.camera.offsetZ
          );

          if (objectName == this.playerData.playerName) {
            object = scene.getObjectByName("pathToIndicator", true);
            object.geometry.dispose();
            var points = [];
            points.push(
              new THREE.Vector3(objectPosition.x, 2, objectPosition.z)
            );
            points.push(new THREE.Vector3(to.x, 2, to.z));

            var updatedGeometry = new THREE.BufferGeometry().setFromPoints(
              points
            );
            object.geometry = updatedGeometry;
          }

          steps--;
          if (steps <= 0) {
            window.clearInterval(animFrame);

            object = scene.getObjectByName("pathToIndicator", true);
            scene.remove(object);
            object = scene.getObjectByName("indicator", true);
            scene.remove(object);
          }
        }, time);
      }
    },
    movePlayer(ev) {
      //calculate the position the player wants to move
      var { moveToPosX, moveToPosZ } = getCoordsToMoveTo(ev, this.playerPos);

      this.$socket.emit("object_moved", {
        objectName: this.playerData.playerName,
        to: { x: moveToPosX, y: 0, z: moveToPosZ },
        from: { x: this.playerPos.x, y: 0, z: this.playerPos.z },
      });
    },
    moveObject(
      from,
      to,
      objectName,
      followWithCamera = false,
      placeIndicatorFlag = false
    ) {
      if (placeIndicatorFlag) placeIndicator(scene, objectName, from, to);

      if (followWithCamera) {
        let object = scene.getObjectByName(objectName, true);
        object.lookAt(to.x, 0, to.z);
      }

      let object = scene.getObjectByName(objectName, true);
      object.lookAt(to.x, 0, to.z);

      this.animateMovement(
        { x: from.x, y: from.y, z: from.z },
        { x: to.x, y: to.y, z: to.z },
        objectName
      );
    },
    handleKey(key) {
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

      generateStarBackground(scene);
    },
  },
  async created() {
    this.playerData.playerID = this.$route.query.id;

    var userData = await fetchGetRequest(
      "http://localhost:3000/API/users/getusername?user_id=" +
        this.playerData.playerID
    );

    this.playerData.playerName = userData.user.username;
  },
  async mounted() {
    this.init();
    console.log("Scene created.");

    await initAssets(scene, camera, (progress) => {
      this.loadingProgress = progress;
    });

    await setInitPositions(scene);

    // render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      updateStarBackground(scene);
    };
    animate();

    //TODO gather data about the userID passed into the game from the main portal
    //join player

    //delay loading screen a bit
    window.setTimeout(() => {
      this.loading = false;
      console.log("Done loading the assets.");

      this.$socket.emit("join_game_map", {
        server: "GE1",
        map: "1-1",
        user_id: this.playerData.playerID,
        position: this.playerPos,
      });
    }, 500);
  },
  sockets: {
    user_joined: function (data) {
      fetchGetRequest(
        "http://localhost:3000/API/users/getusername?user_id=" +
          parseInt(data.user_id)
      ).then((userData) => {
        let objectName = userData.user.username;
        let position = data.position;
        position.z = 0;

        spawnObject(scene, "playerModel", data.position, objectName, {
          x: 10,
          y: 10,
          z: 10,
        });
        setupDrones(scene, objectName, this.drones);
      });
    },
    user_activated_drone_design: function (data) {
      handleFormationCall(data.formation, scene, data.playerName);
    },
    object_moved: function (data) {
      var ownPlayer = this.playerData.playerName == data.objectName;
      var followWithCamera = ownPlayer;

      this.moveObject(
        data.from,
        data.to,
        data.objectName,
        ownPlayer,
        followWithCamera
      );
    },
    user_updated_droneDesign: function (data) {
      changeDroneDesign(
        scene,
        "drone" + (parseInt(data.nthDrone) + 1) + data.playerName,
        data.droneDesign,
        "havoc.bmp"
      );

      if (data.playerName == this.playerData.playerName) {
        this.addDroneDesign({
          nthDrone: data.nthDrone,
          designData: {
            name: data.droneDesign,
          },
        });
      }
    },
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
