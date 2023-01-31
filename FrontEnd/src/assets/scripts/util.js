import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

export function loadObject(scene, camera, objName, textureName, id) {
  const loader = new OBJLoader();
  const textureLoader = new TextureLoader();
  loader.load(
    "assets/models/" + objName,
    (object) => {
      const texture = textureLoader.load("assets/models/" + textureName, () => {
        const material = new MeshLambertMaterial({
          map: texture,
        });
        object.traverse((child) => {
          if (child instanceof Mesh) child.material = material;
        });
        object.name = id;
        console.log(object.name + " added to the scene.");

        // Add the mesh to your scene
        scene.add(object);
        camera.lookAt(object.position);
      });
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
      console.error(error);
    }
  );
}
