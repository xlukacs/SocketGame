import { loadAssets, setInitPositions } from "../managers/assetManager.js";

import { generateStarBackground } from "../managers/backgroundManager.js";

import { useStore } from "vuex";

export async function initAssets(scene, camera) {
  const store = useStore();

  //generate background
  generateStarBackground(scene);

  //load all the assets in
  await loadAssets(scene, camera, (progress) => {
    store.dispatch("webstate/setLoadingProgress", progress);
  });

  //set models correct base rotation, scale and posititon
  await setInitPositions(scene);
  //   this.setupMinimap();
}
