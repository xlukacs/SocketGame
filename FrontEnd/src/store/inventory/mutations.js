export default {
  REMOVE_ITEM(state, itemID) {
    if (state.items.length == 0) return;

    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].itemID == itemID) {
        state.items.splice(i, 1);
        break;
      }
    }
  },

  ADD_ITEM(state, item) {
    state.items.push(item);
  },
};
