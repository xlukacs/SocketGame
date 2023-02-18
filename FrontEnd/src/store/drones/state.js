import { generateRandomID } from "src/assets/scripts/util";

export default function () {
  return {
    drones: [
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [
          {
            itemName: "LF-4",
            randomID: generateRandomID(16),
            bg: "assets/pic/items/lasers/lf4.png",
            type: "laser",
          },
          {
            itemName: "LF-4",
            randomID: generateRandomID(16),
            bg: "assets/pic/items/lasers/lf4.png",
            type: "laser",
          },
        ],
        design: {
          name: "havoc",
          randomID: generateRandomID(16),
          bg: "assets/pic/items/drones/havoc.png",
          type: "droneDesign",
          skin: "havoc.bmp",
        },
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Iris",
        bg: "assets/pic/drones/iris.png",
        items: [],
        design: {},
      },
      {
        name: "Apis",
        bg: "assets/pic/drones/apis.png",
        items: [],
        design: {},
      },
      {
        name: "Zeus",
        bg: "assets/pic/drones/zeus.png",
        items: [],
        design: {},
      },
    ],
  };
}
