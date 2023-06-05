import * as THREE from "three";

export function getCoordsToMoveTo(event, playerPos) {
  const screenMiddleX = window.innerWidth / 2;
  const screenMiddleZ = window.innerHeight / 2;

  var moveByX = screenMiddleX - event.clientX;
  var moveByZ = screenMiddleZ - event.clientY;

  moveByX /= -8;
  moveByZ /= -8;

  var moveToPosX = playerPos.x + moveByX;
  var moveToPosZ = playerPos.z + moveByZ;

  return { moveToPosX: moveToPosX, moveToPosZ: moveToPosZ };
}

export function placeIndicator(scene, playerName, playerPos, movePosition) {
  var object = scene.getObjectByName(playerName, true);

  //detect whether do we need to spawn in the new point or is it allready on the map
  let objectFound = false;
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].name === "indicator") {
      objectFound = true;
      break;
    }
  }
  if (objectFound) {
    //add indicator
    object = scene.getObjectByName("indicator", true);
    object.position.set(movePosition.x, 2, movePosition.z);

    //remove old path
    object = scene.getObjectByName("pathToIndicator", true);
    scene.remove(object);

    //construct new path
    let line = createLine(
      { x: playerPos.x, z: playerPos.z },
      { x: movePosition.x, z: movePosition.z },
      0x0000ff
    );

    scene.add(line);
  } else {
    //create a clone of an obj and spawn it in as an indicator
    object = scene.getObjectByName("originalRubberDucky", true);
    let indicator = object.clone();

    indicator.name = "indicator";
    indicator.position.set(movePosition.x, 2, movePosition.z);
    indicator.scale.set(1, 1, 1);

    scene.add(indicator);

    //contsruct a path towards the clicked point
    let line = createLine(
      { x: playerPos.x, z: playerPos.z },
      { x: movePosition.x, z: movePosition.z },
      0x0000ff
    );

    scene.add(line);
  }
}

function createLine(start, end, color) {
  var points = [];
  points.push(new THREE.Vector3(start.x, 2, start.z));
  points.push(new THREE.Vector3(end.x, 2, end.z));

  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  var material = new THREE.LineBasicMaterial({ color: color });
  var line = new THREE.Line(geometry, material);
  line.name = "pathToIndicator";

  return line;
}
