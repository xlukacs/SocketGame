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
  <div class="overlay" v-show="!loading">
    <div class="icons">
      <div class="icon">
        <q-btn
          color="primary"
          icon="public"
          dense
          @click="overlay.minimap = !overlay.minimap"
        />
      </div>
      <div class="icon">
        <q-btn
          color="primary"
          icon="rocket"
          dense
          @click="overlay.shipStats = !overlay.shipStats"
        />
      </div>
      <div class="icon">
        <q-btn
          color="primary"
          icon="person"
          dense
          @click="overlay.profileStats = !overlay.profileStats"
        />
      </div>
    </div>
    <!-- WIDGETS/WRAPPERS -->
    <div class="wrapper minimapWrapper" v-show="overlay.minimap">
      <q-btn
        color="primary"
        icon="close"
        dense
        @click="overlay.minimap = !overlay.minimap"
        class="closeBtn"
      />
      <div id="minimap" @click="moveFromMap"></div>
    </div>

    <div class="wrapper shipStatsWrapper" v-show="overlay.shipStats">
      <q-btn
        color="primary"
        icon="close"
        dense
        @click="overlay.shipStats = !overlay.shipStats"
        class="closeBtn"
      />
      <div class="content">
        <p>
          XP:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Honors:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Credits:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Uridium:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Trubium:
          <span class="text-weight-bold">0</span>
        </p>
      </div>
    </div>

    <div class="wrapper personalStatsWrapper" v-show="overlay.profileStats">
      <q-btn
        color="primary"
        icon="close"
        dense
        @click="overlay.profileStats = !overlay.profileStats"
        class="closeBtn"
      />
      <div class="content">
        <p>
          HP:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Shield:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Cargo:
          <span class="text-weight-bold">0</span>
        </p>
        <p>
          Config:
          <button
            @click="
              playerData.activeConfig = playerData.activeConfig == 1 ? 2 : 1
            "
          >
            {{ playerData.activeConfig }}
          </button>
          <!-- <button>2</button> -->
        </p>
      </div>
    </div>
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
  // initAssets,
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

import {
  spawnEnemies,
  updateEnemies,
  highlightEnemy,
  attackEnemy,
} from "assets/scripts/managers/enemyManager";

import { setupScene, setupMinimap } from "assets/scripts/render/setup";
import { initAssets } from "assets/scripts/render/init";

import { mapActions, mapGetters } from "vuex";
import { fetchGetRequest } from "src/assets/scripts/util";

let scene, camera, renderer, minimapRenderer, minimapCamera;

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
    ...mapGetters("webstate", {
      loadingProgress: "getLoadingState",
    }),
  },
  data() {
    return {
      overlay: {
        minimap: true,
        profileStats: true,
        shipStats: true,
      },
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
        activeConfig: 1,
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
        var indicatorPosition = scene.getObjectByName(
          "indicator_" + objectName,
          true
        ).position;
        const animFrame = window.setInterval(() => {
          objectPosition.x += xStepAmount;
          objectPosition.z += zStepAmount;

          if (objectName == this.playerData.playerName) {
            this.playerPos.x = objectPosition.x;
            this.playerPos.z = objectPosition.z;
          }

          var object = scene.getObjectByName(objectName, true);
          var indicator = scene.getObjectByName(
            "indicator_" + objectName,
            true
          );
          object.position.set(objectPosition.x, 0, objectPosition.z);
          indicator.position.set(
            objectPosition.x,
            indicatorPosition.y,
            objectPosition.z
          );

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
      var { moveToPosX, moveToPosZ } = getCoordsToMoveTo(ev, this.playerPos);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object.parent;

        if (clickedObject)
          if (clickedObject.userData.type == "enemy") {
            highlightEnemy(clickedObject.name);
          } else {
            this.$socket.emit("object_moved", {
              objectName: this.playerData.playerName,
              to: { x: moveToPosX, y: 0, z: moveToPosZ },
              from: { x: this.playerPos.x, y: 0, z: this.playerPos.z },
            });
          }
      }
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
        attackEnemy(this.playerData.playerName);
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
      //attach keypress event listener
      window.addEventListener("keypress", (e) => {
        this.handleKey(e);
      });

      //setup main camera
      const { sc, ca, re } = setupScene();
      scene = sc;
      camera = ca;
      renderer = re;

      document.getElementById("gameArea").appendChild(renderer.domElement);
    },
    setupMinimap() {
      const { mr, mc } = setupMinimap();
      minimapRenderer = mr;
      minimapCamera = mc;

      document
        .getElementById("minimap")
        .appendChild(minimapRenderer.domElement);
    },
    moveFromMap() {},
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

    await initAssets(scene, camera);
    this.loading = false;

    this.setupMinimap();

    // render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      minimapRenderer.render(scene, minimapCamera);
      updateStarBackground(scene);
      updateEnemies(scene);
    };
    animate();

    //TODO gather data about the userID passed into the game from the main portal
    //join player

    //delay loading screen a bit
    window.setTimeout(() => {
      this.$socket.emit("join_game_map", {
        server: "GE1",
        map: "1-1",
        user_id: this.playerData.playerID,
        position: this.playerPos,
      });
    }, 500);

    //setup UI for user bsed on saved configurations
    spawnEnemies(scene); //TODO: move this to the server side
    //this.setupMinimap(); //load UI parts from server side config
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

.overlay {
  // position: fixed;
  // top: 0px;
  // left: 0px;
  // width: 100vw;
  // height: 100vh;
  // z-index: -1001;
  .wrapper {
    position: fixed;
    width: 200px;
    height: 150px;
    .closeBtn {
      position: absolute;
      top: -28px;
    }
    .content {
      background: rgb(26, 29, 35);
      color: white;
      padding: 10px;
      border: 5px solid #1976d2;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      p {
        display: flex;
        flex-direction: row;
        margin: 0px;
        height: 30px;
        line-height: 30px;
        span,
        button {
          margin-left: 15px;
        }
        button {
          display: inline-block;
          background-color: transparent;
          border: unset;
          cursor: pointer;
          color: white;
        }
      }
    }
  }
  .icons {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    .icon {
      width: 30px;
      height: 30px;
    }
  }

  .minimapWrapper {
    width: 210px;
    height: 160px;
    bottom: 10px;
    right: 10px;
    box-sizing: content-box;

    #minimap {
      border: 5px solid #1976d2;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .shipStatsWrapper {
    top: 30px;
    right: 10px;
  }

  .personalStatsWrapper {
    top: 280px;
    right: 10px;
  }
}
</style>
