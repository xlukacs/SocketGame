import * as THREE from "three";

var stars = [];

export function generateStarBackground(scene) {
  for (var iter = 0; iter < 3; iter++)
    for (var z = -1000; z < 1000; z += 20) {
      const random = +(Math.random() * 10).toFixed(0);
      let colorValue = null;
      switch (random) {
        case 0:
        case 1:
        case 2:
        case 3:
          colorValue = 0x8cde0d;
          break;
        case 4:
        case 5:
        case 6:
          colorValue = 0x00bfff;
          break;
        case 7:
        case 8:
        case 9:
          colorValue = 0x8855f3;
          break;
        default:
          colorValue = 0x8cde0d;
          break;
      }

      var geometry = new THREE.SphereGeometry(0.5, 32, 32);
      var material = new THREE.MeshBasicMaterial({ color: colorValue });
      var sphere = new THREE.Mesh(geometry, material);
      var sphere1 = new THREE.Mesh(geometry, material);

      sphere.position.x =
        Math.floor(Math.random() * (1000 - -1000 + 1)) + -1000;
      sphere.position.y = Math.floor(Math.random() * (0 - -100 + 1)) + -100;
      sphere1.position.x =
        Math.floor(Math.random() * (1000 - -1000 + 1)) + -1000;
      sphere1.position.y = Math.floor(Math.random() * (0 - -100 + 1)) + -100;

      sphere.position.z = z;
      sphere1.position.z = z;

      sphere.scale.x = sphere.scale.y = 1.5;
      sphere1.scale.x = sphere.scale.y = 1.5;

      scene.add(sphere);
      scene.add(sphere1);

      stars.push(sphere);
      stars.push(sphere1);
    }

  console.log(stars.length);
}

export function updateStarBackground() {
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];

    star.position.z += i / 1000;

    if (star.position.z > 1000) star.position.z -= 2000;
  }
}
