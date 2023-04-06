const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "hangar", component: () => import("pages/HangarPage.vue") },
      {
        path: "configShip",
        component: () => import("pages/ConfigShipPage.vue"),
      },
      {
        path: "shop",
        component: () => import("pages/ShopPage.vue"),
      },
    ],
  },
  {
    path: "/gameClient",
    component: () => import("pages/GamePage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/auth/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/auth/RegisterPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
