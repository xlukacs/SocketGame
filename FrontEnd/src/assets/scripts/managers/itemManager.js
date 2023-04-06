import log4js from "log4js";
import config from "../../config/log4js.json";

log4js.configure(config);
const logger = log4js.getLogger("logger");

export function getShopItem(itemID) {
  return new Promise((resolve, reject) => {
    var shipsData = [];

    //===== LOAD SHOP DATA =====
    //-- SHIPS
    axios
      .get("src/assets/items/ships/shipData.json")
      .then((response) => {
        const data = response.data;
        shipsData = data.ships;
      })
      .catch((error) => console.error("Error loading data:", error));
    //-- LASERS

    //-- GENERATORS

    //===== JOIN THE ITEMS =====
    var shopData = [];
    shopData = shopData.concat(shipsData);
    //shopData = shopData.concat(lasersData)
    //shopData = shopData.concat(generatorsData)

    //====== PARSE AND RETURN THE CORRECT ITEM =====
    const parsedData = JSON.parse(data);
    const selectedItem = parsedData.ships.find(
      (ship) => ship.itemID === itemID
    );

    console.log(parsedData);
    logger.info("Found shop item: " + parsedData);
    resolve(selectedItem);
  });
}
