import { loadTexture } from "./util";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

export function setupDrones(scene, playerName, drones) {
  //spawn drones
  var object = scene.getObjectByName("originalDrone", true);
  let drone1 = object.clone();
  drone1.name = "drone1" + playerName;
  drone1.scale.set(0.1, 0.1, 0.1);
  let drone2 = object.clone();
  drone2.name = "drone2" + playerName;
  drone2.scale.set(0.1, 0.1, 0.1);
  let drone3 = object.clone();
  drone3.name = "drone3" + playerName;
  drone3.scale.set(0.1, 0.1, 0.1);
  let drone4 = object.clone();
  drone4.name = "drone4" + playerName;
  drone4.scale.set(0.1, 0.1, 0.1);
  let drone5 = object.clone();
  drone5.name = "drone5" + playerName;
  drone5.scale.set(0.1, 0.1, 0.1);
  let drone6 = object.clone();
  drone6.name = "drone6" + playerName;
  drone6.scale.set(0.1, 0.1, 0.1);
  let drone7 = object.clone();
  drone7.name = "drone7" + playerName;
  drone7.scale.set(0.1, 0.1, 0.1);
  let drone8 = object.clone();
  drone8.name = "drone8" + playerName;
  drone8.scale.set(0.1, 0.1, 0.1);
  let drone9 = object.clone();
  drone9.name = "drone9" + playerName;
  drone9.scale.set(0.1, 0.1, 0.1);
  let drone10 = object.clone();
  drone10.name = "drone10" + playerName;
  drone10.scale.set(0.1, 0.1, 0.1);

  //add to player
  object = scene.getObjectByName(playerName, true);
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

  //set default formation TODO last used formation
  handleFormationCall("default", scene, playerName);

  //set the proper skin for the drones
  for (let i = 0; i < drones.length; i++) {
    const drone = drones[i];

    if (drone.design.name != undefined) {
      changeDroneDesign(
        scene,
        "drone" + (i + 1) + playerName,
        drone.design.name,
        drone.design.skin
      );
    }
  }
}

export function handleFormationCall(formation, scene, playerName) {
  var passedPlayerPosition = {
    x: 0,
    y: 0,
    z: 0,
  };

  if (formation == "default")
    defaultFormation(scene, passedPlayerPosition, playerName);

  if (formation == "turtle")
    turtleFormation(scene, passedPlayerPosition, playerName);
}

export function defaultFormation(scene, playerPosition, playerName) {
  var object = scene.getObjectByName("drone1" + playerName, true);
  //left
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 2;
  object.position.z -= 1;

  object = scene.getObjectByName("drone2" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 2.5;

  object = scene.getObjectByName("drone3" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 2;
  object.position.z += 1;

  //back
  object = scene.getObjectByName("drone4" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 1;
  object.position.z -= 3;

  object = scene.getObjectByName("drone5" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.z -= 3.5;

  object = scene.getObjectByName("drone6" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 1;
  object.position.z -= 3;

  object = scene.getObjectByName("drone7" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.z -= 2;

  //right
  object = scene.getObjectByName("drone8" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 2;
  object.position.z += 1;

  object = scene.getObjectByName("drone9" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 2.5;

  object = scene.getObjectByName("drone10" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 2;
  object.position.z -= 1;
}

export function turtleFormation(scene, playerPosition, playerName) {
  //left
  var object = scene.getObjectByName("drone1" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 0.5;
  object.position.z += 2;

  object = scene.getObjectByName("drone2" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 1.5;
  object.position.z += 1;

  object = scene.getObjectByName("drone3" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 2.5;

  object = scene.getObjectByName("drone4" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 1.5;
  object.position.z -= 1;

  object = scene.getObjectByName("drone5" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x -= 0.5;
  object.position.z -= 2;

  //right
  object = scene.getObjectByName("drone6" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 0.5;
  object.position.z += 2;

  object = scene.getObjectByName("drone7" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 1.5;
  object.position.z += 1;

  object = scene.getObjectByName("drone8" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 2.5;

  object = scene.getObjectByName("drone9" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 1.5;
  object.position.z -= 1;

  object = scene.getObjectByName("drone10" + playerName, true);
  object.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
  object.position.x += 0.5;
  object.position.z -= 2;
}

export async function changeDroneDesign(scene, droneName, toType, toSkin) {
  //select drone
  var drone = scene.getObjectByName(droneName, true);

  //change drone type and its stats
  //TODO

  //change drone skin/texture
  const texture = await loadTexture(toSkin);
  const material = new MeshLambertMaterial({
    map: texture,
  });
  drone.traverse((child) => {
    if (child instanceof Mesh) child.material = material;
  });
}
