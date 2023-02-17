import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

export async function loadObject(scene, camera, objName, textureName, id) {
  const loader = new OBJLoader();
  const textureLoader = new TextureLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      "assets/models/" + objName,
      (object) => {
        const texture = textureLoader.load(
          "assets/models/" + textureName,
          () => {
            const material = new MeshLambertMaterial({
              map: texture,
            });

            object.traverse((child) => {
              if (child instanceof Mesh) child.material = material;
            });
            object.name = id;
            object.scale.set(0, 0, 0);
            object.position.set(0, 0, 0);
            //console.log(object.name + " added to the scene.");

            // Add the mesh to your scene
            scene.add(object);
            camera.lookAt(object.position);
            resolve();
          }
        );
      },
      // called when loading is in progresses
      function (xhr) {
        //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
        console.error(error);
      }
    );
  });
}
