import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export class baseEnemy {
  constructor(scene, name) {
    this.scene = scene;
    this.name = name;
    this.object = null;
    this.textObject = null;
    this.indicator = {
      tl: null,
      tr: null,
      bl: null,
      br: null,
    };
    this.steps = 0;
    this.hasTarget = false;
    this.target = "";

    this.position = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.velocity = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.init();
  }

  init() {
    //clone the original rubber ducky
    var object = this.scene.getObjectByName("originalRubberDucky", true);
    this.object = object.clone();
    this.object.name = this.name;
    this.object.userData = { type: "enemy" };
    // console.log(this.object.userData);

    //add the cloned object to the scene
    this.scene.add(this.object);

    //set the position of the cloned object
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.object.scale.set(3, 3, 3);

    //add the indicator around the object
    const geometry = new THREE.CircleGeometry(10, 32, 0, 1.5);

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    });

    this.indicator.tl = new THREE.Mesh(geometry, material);
    this.indicator.tr = new THREE.Mesh(geometry, material);
    this.indicator.bl = new THREE.Mesh(geometry, material);
    this.indicator.br = new THREE.Mesh(geometry, material);

    // Rotate the circle meshes to create 4 segments
    this.indicator.tl.rotation.z += Math.PI / 2;
    // this.indicator.tr.rotation.z = Math.PI / 2;
    this.indicator.bl.rotation.z += Math.PI;
    this.indicator.br.rotation.z = Math.PI + Math.PI / 2;

    this.indicator.tl.rotation.x -= Math.PI / 2;
    this.indicator.tr.rotation.x -= Math.PI / 2;
    this.indicator.bl.rotation.x -= Math.PI / 2;
    this.indicator.br.rotation.x -= Math.PI / 2;

    this.scene.add(this.indicator.tl);
    this.scene.add(this.indicator.tr);
    this.scene.add(this.indicator.bl);
    this.scene.add(this.indicator.br);

    //add the text above the object
    var vm = this;
    const loader = new FontLoader();
    loader.load(
      "assets/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const color = 0x990000;

        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });

        const message = vm.name;

        const shapes = font.generateShapes(message, 100);

        const geometry = new THREE.ShapeGeometry(shapes);

        geometry.computeBoundingBox();

        const xMid =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        geometry.translate(xMid, 0, 0);

        vm.textObject = new THREE.Mesh(geometry, matLite);
        vm.textObject.rotation.x -= Math.PI / 2;
        vm.textObject.scale.set(0.05, 0.05, 0.05);
        vm.textObject.position.z += 20;
        vm.scene.add(vm.textObject);
      }
    );

    this.clearHighlight();
  }

  update() {
    this.indicator.tl.rotation.z += 0.01;
    this.indicator.tr.rotation.z += 0.01;
    this.indicator.bl.rotation.z += 0.01;
    this.indicator.br.rotation.z += 0.01;

    if (this.steps > 0) {
      this.position.x += this.velocity.x / 200;
      this.position.z += this.velocity.z / 200;

      this.object.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );

      this.indicator.tl.position.set(
        this.position.x - 2,
        this.position.y,
        this.position.z - 2
      );

      this.indicator.tr.position.set(
        this.position.x + 2,
        this.position.y,
        this.position.z - 2
      );

      this.indicator.bl.position.set(
        this.position.x - 2,
        this.position.y,
        this.position.z + 2
      );

      this.indicator.br.position.set(
        this.position.x + 2,
        this.position.y,
        this.position.z + 2
      );

      if (this.textObject != null)
        this.textObject.position.set(
          this.position.x + 2,
          this.position.y,
          this.position.z + 22
        );

      this.steps--;
    }

    if (this.steps == 0 && !this.hasTarget) {
      this.randomMove();
    }

    if (this.steps == 0 && this.hasTarget) {
      this.setAttacker(this.target);
    }
  }

  randomMove() {
    this.steps = Math.floor(Math.random() * 200 + 1);
    this.velocity.x = Math.floor(Math.random() * 100 - 50);
    this.velocity.z = Math.floor(Math.random() * 100 - 50);
  }

  highlight() {
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 1,
    });

    this.indicator.tl.material = material;
    this.indicator.tr.material = material;
    this.indicator.bl.material = material;
    this.indicator.br.material = material;
    // this.object.material.color.setHex(0xff0000);
  }

  clearHighlight() {
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
    });

    this.indicator.tl.material = material;
    this.indicator.tr.material = material;
    this.indicator.bl.material = material;
    this.indicator.br.material = material;
    // this.object.material.color.setHex(0x000000);

    this.hasTarget = false;
    this.steps = 0;
  }

  setAttacker(playerName) {
    this.hasTarget = true;
    this.target = playerName;

    var target = this.scene.getObjectByName(playerName);
    const targetPosition = new THREE.Vector3(
      target.position.x,
      0,
      target.position.z
    );
    const objectPosition = new THREE.Vector3(
      this.position.x,
      0,
      this.position.z
    );

    this.steps = Math.floor(targetPosition.distanceTo(objectPosition));

    // console.log(targetPosition.distanceTo(objectPosition));

    this.velocity.x = target.position.x - this.position.x;
    this.velocity.z = target.position.z - this.position.z;
  }
}
