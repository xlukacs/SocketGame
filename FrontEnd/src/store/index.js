import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import drones from "./drones";
// import user from "./user";
import inventory from "./inventory";
import webstate from "./webstate";

export default store(function () {
  const Store = createStore({
    modules: {
      drones,
      // user,
      inventory,
      webstate,
    },

    strict: process.env.DEBUGGING,
  });

  return Store;
});
