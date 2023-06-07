import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import drones from "./drones";
// import user from "./user";
import inventory from "./inventory";

export default store(function () {
  const Store = createStore({
    modules: {
      drones,
      // user,
      inventory,
    },

    strict: process.env.DEBUGGING,
  });

  return Store;
});
