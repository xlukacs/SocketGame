import { log } from "assets/scripts/util";
import axios from "axios";

export async function getShopItem(itemID) {
  return new Promise(async (resolve, reject) => {
    var shipsData = [];
    var lasersData = [];
    var generatorsData = [];

    //===== LOAD SHOP DATA =====
    //-- SHIPS
    shipsData = await loadShipsData();
    //-- LASERS
    lasersData = await loadLasersData();
    //-- GENERATORS
    generatorsData = await loadGeneratorsData();

    //===== JOIN THE ITEMS =====
    var shopData = { items: [] };
    shopData.items = shopData.items.concat(shipsData);
    shopData.items = shopData.items.concat(lasersData);
    shopData.items = shopData.items.concat(generatorsData);

    //====== PARSE AND RETURN THE CORRECT ITEM =====
    const selectedItem = shopData.items.find((item) => item.itemID === itemID);

    log(selectedItem);
    resolve(selectedItem);
  });
}

export function loadShipsData() {
  return new Promise((resolve, reject) => {
    axios
      .get("assets/items/ships/shipData.json")
      .then((response) => {
        const data = response.data;
        resolve(data.ships);
      })
      .catch((error) => console.error("Error loading data:", error));
  });
}

export function loadLasersData() {
  return new Promise((resolve, reject) => {
    axios
      .get("assets/items/lasers/lasersData.json")
      .then((response) => {
        const data = response.data;
        resolve(data.lasers);
      })
      .catch((error) => console.error("Error loading data:", error));
  });
}

export function loadGeneratorsData() {
  return new Promise((resolve, reject) => {
    axios
      .get("assets/items/generators/generatorsData.json")
      .then((response) => {
        const data = response.data;
        resolve(data.generators);
      })
      .catch((error) => console.error("Error loading data:", error));
  });
}
