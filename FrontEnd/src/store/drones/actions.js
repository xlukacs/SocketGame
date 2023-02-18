export default {
  removeDroneDesign({ commit }, nthDrone) {
    commit("REMOVE_DESIGN", nthDrone);
  },
  addDroneDesign({ commit }, params) {
    commit("SET_DRONE_DESIGN", {
      nthDrone: params.nthDrone,
      design: params.designData.name,
    });
  },
};
