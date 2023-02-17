import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import drones from "./drones";

export default store(function () {
  const Store = createStore({
    modules: {
      drones,
    },

    strict: process.env.DEBUGGING,
  });

  return Store;
});
