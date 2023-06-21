export default {
  setLoadingProgress({ commit }, percent) {
    commit("SET_LOAD_STATE", percent);
  },
};
