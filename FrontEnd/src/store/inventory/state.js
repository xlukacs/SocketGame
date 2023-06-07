import { generateRandomID } from "src/assets/scripts/util";

export default function () {
  return {
    //
    items: [
      {
        name: "lf-3",
        quantity: 1,
        itemID: generateRandomID(16),
        bg: "assets/pic/items/lasers/lf3.png",
        type: "laser",
      },
      {
        name: "lf-3",
        quantity: 1,
        itemID: generateRandomID(16),
        bg: "assets/pic/items/lasers/lf3.png",
        type: "laser",
      },
      {
        name: "LF-4",
        quantity: 1,
        itemID: generateRandomID(16),
        bg: "assets/pic/items/lasers/lf4.png",
        type: "laser",
      },
      {
        itemName: "BO3",
        quantity: 1,
        itemID: generateRandomID(16),
        bg: "assets/pic/items/shields/bo3.png",
        type: "shield",
      },
      {
        itemName: "havoc",
        quantity: 1,
        itemID: generateRandomID(16),
        bg: "assets/pic/items/drones/havoc.png",
        type: "droneDesign",
      },
    ],
  };
}
