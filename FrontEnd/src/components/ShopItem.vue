<template>
  <div class="shop-item" @click="openItem">
    <div
      class="shop-item-image"
      :style="{
        backgroundImage: 'url(./assets/items/' + itemData.pic + ')',
      }"
    >
      <p>{{ itemData.name }}</p>
    </div>
  </div>
</template>

<script>
import { getShopItem } from "@/../../src/assets/scripts/managers/itemManager.js";

export default {
  name: "ShopItem",
  data() {
    return {
      itemData: {
        name: "",
        desc: "",
        price: {
          amount: 0,
          currency: "",
        },
        pic: "",
      },
    };
  },
  watch: {},
  mounted() {
    this.loadItemData(this.id);
  },
  props: {
    id: String,
  },
  methods: {
    openItem: function () {
      this.$emit("openBuyerPopup", this.id);
    },
    loadItemData: async function (itemID) {
      this.itemData = await getShopItem(itemID);
    },
  },
};
</script>

<style scoped lang="scss">
.shop-item {
  cursor: pointer;
  width: 100px;
  height: 125px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  .shop-item-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    p {
      text-align: center;
      position: relative;

      background-color: lightgray;
      margin: 0px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-weight: bold;
    }
  }
}
</style>
