export default {
  removeItem({ commit }, itemID) {
    commit("REMOVE_ITEM", itemID);
  },

  additem({ commit }, item) {
    commit("ADD_ITEM", item);
  },
};
