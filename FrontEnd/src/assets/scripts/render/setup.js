import * as THREE from "three";

export function setupScene() {
  //scene
  var scene = new THREE.Scene();

  //camera
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 70, 25);

  //render pipeline
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    premultipliedAlpha: false,
  });
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //basic light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 0);
  light.castShadow = false;
  scene.add(light);

  return {
    // variables: {
    //   setupScene: scene,
    //   setupCamera: camera,
    //   setupRenderer: renderer,
    // },
    sc: scene,
    ca: camera,
    re: renderer,
  };
}

export function setupMinimap() {
  var minimapRenderer = new THREE.WebGLRenderer({
    alpha: true,
    premultipliedAlpha: false,
  });
  minimapRenderer.setClearColor(0x000000);
  minimapRenderer.setSize(200, 150); // Adjust the size as needed

  // Create a camera for the minimap
  var minimapCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  minimapCamera.position.set(0, 650, 0);
  minimapCamera.lookAt(0, 0, 0);

  return {
    mr: minimapRenderer,
    mc: minimapCamera,
  };
}
