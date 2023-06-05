const assets = [
  {
    obj: "benceBouncer.obj",
    texture: "benceBouncer.bmp",
    name: "playerModel",
  },
  {
    obj: "rubberDuck.obj",
    texture: "rubberDuck.bmp",
    name: "originalRubberDucky",
  },
  {
    obj: "rubberDuck.obj",
    texture: "havoc.bmp",
    name: "havocDucky",
  },
  {
    obj: "cube.obj",
    texture: "grass.bmp",
    name: "ground",
  },
];

import { loadObject } from "assets/scripts/util";

export function initAssets(scene, camera, onProgress) {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    assets.forEach(async (asset) => {
      await loadObject(scene, camera, asset.obj, asset.texture, asset.name);
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
    object.scale.set(100, 1, 100);

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
  scale = { x: 1, y: 1, z: 1 }
) {
  return new Promise((resolve, reject) => {
    var object = scene.getObjectByName(objectName, true);
    let clone = object.clone();
    clone.name = spawnedObjectName;

    scene.add(clone);

    clone.position.set(position.x, position.y, position.z);
    clone.scale.set(scale.x, scale.y, scale.z);

    resolve();
  });
}
