import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three";

import { getKey } from "../util/session";

export async function loadObject(
  scene,
  camera,
  objName,
  textureName,
  id,
  userdata
) {
  const loader = new OBJLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      "assets/models/" + objName,
      async (object) => {
        const texture = await loadTexture(textureName);
        const material = new MeshLambertMaterial({
          map: texture,
        });

        object.traverse((child) => {
          if (child instanceof Mesh) child.material = material;
        });
        object.name = id;
        object.userData = userdata;
        object.scale.set(0, 0, 0);
        object.position.set(0, 0, 0);
        // console.log(object.name + " added to the scene.");
        // console.log(object.uuid);

        // Add the mesh to your scene
        scene.add(object);
        camera.lookAt(object.position);
        resolve();
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

const modelsPath = "assets/models/";

export function loadTexture(textureName) {
  const textureLoader = new TextureLoader();
  return new Promise((resolve, reject) => {
    const texture = textureLoader.load(modelsPath + textureName, () => {
      resolve(texture);
    });
  });
}

export function generateRandomID(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function log(message) {
  var canLog = false;
  if (canLog) console.log(message);
}

export async function fetchGetRequest(url, includeToken = false) {
  return new Promise(async (resolve, reject) => {
    if (includeToken) {
      // console.log(getKey("token"));
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getKey("token"),
        },
      });

      resolve(response.json());
    } else {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      resolve(response.json());
    }
  });
}
