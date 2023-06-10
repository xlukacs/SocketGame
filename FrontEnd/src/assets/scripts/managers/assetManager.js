const assets = [
  {
    obj: "benceBouncer.obj",
    texture: "benceBouncer.bmp",
    name: "playerModel",
    userdata: {
      type: "player",
    },
  },
  {
    obj: "rubberDuck.obj",
    texture: "rubberDuck.bmp",
    name: "originalDrone",
    userdata: {
      type: "player_drone",
    },
  },
  {
    obj: "rubberDuck.obj",
    texture: "rubberDuck.bmp",
    name: "originalRubberDucky",
    userdata: {
      type: "enemy",
    },
  },
  {
    obj: "rubberDuck.obj",
    texture: "havoc.bmp",
    name: "havocDucky",
    userdata: {
      type: "player_drone",
    },
  },
  {
    obj: "cube.obj",
    texture: "spaceMap.bmp",
    name: "ground",
    userdata: {
      type: "map_part_ground",
    },
  },
  {
    obj: "cube.obj",
    texture: "white.bmp",
    name: "indicator",
    userdata: {
      type: "map_part_indicator_own",
    },
  },
  {
    obj: "cube.obj",
    texture: "red.bmp",
    name: "indicatorEnemy",
    userdata: {
      type: "map_part_indicator_enemy",
    },
  },
];

import { loadObject } from "assets/scripts/util";

export function initAssets(scene, camera, onProgress) {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    assets.forEach(async (asset) => {
      await loadObject(
        scene,
        camera,
        asset.obj,
        asset.texture,
        asset.name,
        asset.userdata
      );
      //console.log("DONE WITH " + asset.name);

      loadedCount++;
      const progress = loadedCount / assets.length;
      onProgress(progress);

      if (loadedCount === assets.length) {
        resolve();
      }
    });
  });
}

export function setInitPositions(scene) {
  return new Promise((resolve, reject) => {
    var object = scene.getObjectByName("ground", true);
    object.position.set(0, -100, 0);
    object.scale.set(1500, 1, 1000);

    object = scene.getObjectByName("originalDrone", true);
    object.rotation.x -= Math.PI / 2;

    object = scene.getObjectByName("originalRubberDucky", true);
    object.rotation.x -= Math.PI / 2;

    // object = scene.getObjectByName(playerName, true);
    // object.scale.set(10, 10, 10);
    resolve();
  });
}

export function spawnObject(
  scene,
  objectName,
  position = { x: 0, y: 0, z: 0 },
  spawnedObjectName,
  scale = { x: 10, y: 10, z: 10 }
) {
  return new Promise((resolve, reject) => {
    var object = scene.getObjectByName(objectName, true);
    let clone = object.clone();
    clone.name = spawnedObjectName;

    scene.add(clone);

    clone.position.set(position.x, position.y, position.z);
    clone.scale.set(scale.x, scale.y, scale.z);

    //if we spawn a player, we need to spawn an indicator as well
    if (objectName === "playerModel") {
      var indicator = scene.getObjectByName("indicator", true);
      let cloneIndicator = indicator.clone();
      cloneIndicator.name = "indicator_" + spawnedObjectName;

      scene.add(cloneIndicator);

      cloneIndicator.position.set(position.x, 100, position.z);
      cloneIndicator.scale.set(20, 20, 20);
    }

    resolve();
  });
}
