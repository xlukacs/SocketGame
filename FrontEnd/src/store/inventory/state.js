import { generateRandomID } from "src/assets/scripts/util";

export default function () {
  return {
    //
    items: [
      {
        name: "lf-3",
        quantity: 1,
        itemID: generateRandomID(16),
      },
      {
        name: "lf-3",
        quantity: 1,
        itemID: generateRandomID(16),
      },
      {
        name: "LF-4",
        quantity: 1,
        itemID: generateRandomID(16),
      },
    ],
  };
}
