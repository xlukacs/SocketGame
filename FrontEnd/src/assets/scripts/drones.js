import { loadTexture } from "./util";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

export function setupDrones(scene, playerName) {
  //spawn drones
  var object = scene.getObjectByName("originalRubberDucky", true);
  let drone1 = object.clone();
  drone1.name = "drone1";
  drone1.scale.set(0.1, 0.1, 0.1);
  let drone2 = object.clone();
  drone2.name = "drone2";
  drone2.scale.set(0.1, 0.1, 0.1);
  let drone3 = object.clone();
  drone3.name = "drone3";
  drone3.scale.set(0.1, 0.1, 0.1);
  let drone4 = object.clone();
  drone4.name = "drone4";
  drone4.scale.set(0.1, 0.1, 0.1);
  let drone5 = object.clone();
  drone5.name = "drone5";
  drone5.scale.set(0.1, 0.1, 0.1);
  let drone6 = object.clone();
  drone6.name = "drone6";
  drone6.scale.set(0.1, 0.1, 0.1);
  let drone7 = object.clone();
  drone7.name = "drone7";
  drone7.scale.set(0.1, 0.1, 0.1);
  let drone8 = object.clone();
  drone8.name = "drone8";
  drone8.scale.set(0.1, 0.1, 0.1);
  let drone9 = object.clone();
  drone9.name = "drone9";
  drone9.scale.set(0.1, 0.1, 0.1);
  let drone10 = object.clone();
  drone10.name = "drone10";
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

  defaultFormation(scene);
}

export function handleFormationCall(formation, scene) {
  if (formation == "default") defaultFormation(scene);

  if (formation == "turtle") turtleFormation(scene);
}

export function defaultFormation(scene) {
  var object = scene.getObjectByName("drone1", true);
  //left
  object.position.set(0, 0, 0);
  object.position.x -= 2;
  object.position.z -= 1;

  object = scene.getObjectByName("drone2", true);
  object.position.set(0, 0, 0);
  object.position.x -= 2.5;

  object = scene.getObjectByName("drone3", true);
  object.position.set(0, 0, 0);
  object.position.x -= 2;
  object.position.z += 1;

  //back
  object = scene.getObjectByName("drone4", true);
  object.position.set(0, 0, 0);
  object.position.x -= 1;
  object.position.z -= 3;

  object = scene.getObjectByName("drone5", true);
  object.position.set(0, 0, 0);
  object.position.z -= 3.5;

  object = scene.getObjectByName("drone6", true);
  object.position.set(0, 0, 0);
  object.position.x += 1;
  object.position.z -= 3;

  object = scene.getObjectByName("drone7", true);
  object.position.set(0, 0, 0);
  object.position.z -= 2;

  //right
  object = scene.getObjectByName("drone8", true);
  object.position.set(0, 0, 0);
  object.position.x += 2;
  object.position.z += 1;

  object = scene.getObjectByName("drone9", true);
  object.position.set(0, 0, 0);
  object.position.x += 2.5;

  object = scene.getObjectByName("drone10", true);
  object.position.set(0, 0, 0);
  object.position.x += 2;
  object.position.z -= 1;
}

export function turtleFormation(scene) {
  //left
  var object = scene.getObjectByName("drone1", true);
  object.position.set(0, 0, 0);
  object.position.x -= 0.5;
  object.position.z += 2;

  object = scene.getObjectByName("drone2", true);
  object.position.set(0, 0, 0);
  object.position.x -= 1.5;
  object.position.z += 1;

  object = scene.getObjectByName("drone3", true);
  object.position.set(0, 0, 0);
  object.position.x -= 2.5;

  object = scene.getObjectByName("drone4", true);
  object.position.set(0, 0, 0);
  object.position.x -= 1.5;
  object.position.z -= 1;

  object = scene.getObjectByName("drone5", true);
  object.position.set(0, 0, 0);
  object.position.x -= 0.5;
  object.position.z -= 2;

  //right
  object = scene.getObjectByName("drone6", true);
  object.position.set(0, 0, 0);
  object.position.x += 0.5;
  object.position.z += 2;

  object = scene.getObjectByName("drone7", true);
  object.position.set(0, 0, 0);
  object.position.x += 1.5;
  object.position.z += 1;

  object = scene.getObjectByName("drone8", true);
  object.position.set(0, 0, 0);
  object.position.x += 2.5;

  object = scene.getObjectByName("drone9", true);
  object.position.set(0, 0, 0);
  object.position.x += 1.5;
  object.position.z -= 1;

  object = scene.getObjectByName("drone10", true);
  object.position.set(0, 0, 0);
  object.position.x += 0.5;
  object.position.z -= 2;
}

export async function changeDroneDesign(scene, droneName, toType, toSkin) {
  //select drone
  var drone = scene.getObjectByName(droneName, true);

  //change drone type and its stats TODO

  //change drone skin/texture
  const texture = await loadTexture(toSkin);
  const material = new MeshLambertMaterial({
    map: texture,
  });
  drone.traverse((child) => {
    if (child instanceof Mesh) child.material = material;
  });
}
