<template>
  <div class="itemBuyerPopup" v-if="open">
    <div class="bg" @click="closePopup"></div>
    <div class="content">
      <q-btn color="negative" icon="close" @click="closePopup" />
      <q-img
        :src="bgPic"
        spinner-color="primary"
        spinner-size="82px"
        width="300px"
        height="300px"
      />
      <p>{{ itemData.name }}</p>
      <span>{{ itemData.desc }}</span>
      <div class="controls">
        <input
          type="number"
          name="itemAmount"
          min="1"
          value="1"
          v-if="!singular"
        />
        <q-btn color="primary" label="BUY" @click="buyItem()" />
      </div>
    </div>
  </div>
</template>

<script>
import { getShopItem } from "@/../../src/assets/scripts/managers/itemManager.js";

export default {
  name: "ItemBuyerPopup",
  data() {
    return {
      itemData: {
        name: "Loading...",
        desc: "Loading...",
        price: {
          amount: 0,
          currency: "Loading...",
        },
        pic: "Loading...",
      },
    };
  },
  watch: {
    item(newValue, oldValue) {
      this.loadItemData(this.item);

      // console.log("PROP CHANGE", this.itemData);
    },
  },
  computed: {
    bgPic() {
      console.log("./assets/items/" + this.itemData.pic);
      return "./assets/items/" + this.itemData.pic;
    },
  },
  mounted() {},
  props: {
    item: String,
    open: Boolean,
    singular: Boolean,
  },
  methods: {
    loadItemData: async function (itemID) {
      this.itemData = await getShopItem(itemID);
    },
    buyItem: function () {
      console.log(item + "");
    },
    closePopup: function () {
      this.$emit("close-buyer-popup");
    },
  },
};
</script>

<style scoped lang="scss">
.itemBuyerPopup {
  .content {
    background-color: darkgray;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10001;
    display: flex;
    flex-direction: column;
    button {
      position: absolute;
      z-index: 10002;
      right: 10px;
    }
    p {
      font-weight: bold;
      font-size: 1.5em;
      margin-bottom: 5px;
    }
    span {
      margin-bottom: 10px;
    }
    .controls {
      height: 50px;
      input {
        margin-right: 10px;
        padding: 5px 10px;
      }
    }
  }
  .bg {
    z-index: 10000;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.55);
    position: fixed;
  }
}
</style>
