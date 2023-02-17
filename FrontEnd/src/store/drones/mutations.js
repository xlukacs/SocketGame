export default {
  SET_DRONE_DESIGN(state, nthDrone, design) {
    if (design == "havoc") {
      state.drones[nthDrone].design = {
        name: "havoc",
        randomID: "COHESIVEEFE",
        bg: "pic/items/drones/havoc.png",
        type: "droneDesign",
        skin: "havoc.bmp",
      };
    }
  },
};
