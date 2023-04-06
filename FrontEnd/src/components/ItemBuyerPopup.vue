<template>
  <div class="itemBuyerPopup" v-if="isBuyerPopupOpen">
    <div class="bg" @click="closePopup"></div>
    <div class="content">
      <q-btn color="negative" icon="close" @click="closePopup" />
      <q-img
        src="https://placeimg.com/500/300/nature"
        spinner-color="primary"
        spinner-size="82px"
        width="300px"
        height="300px"
      />
      <p>ItemName</p>
      <span>Desc</span>
      <div class="controls">
        <input type="number" name="itemAmount" min="1" value="1" />
        <q-btn color="primary" label="BUY" @click="buyItem()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemBuyerPopup",
  data() {
    return {
      isBuyerPopupOpen: false,
    };
  },
  watch: {
    item(newValue, oldValue) {
      this.isBuyerPopupOpen = this.item > 0 ? true : false;
    },
  },
  mounted() {},
  props: {
    item: Number,
  },
  methods: {
    buyItem: function () {
      console.log(item);
    },
    closePopup: function () {
      this.itemID = 0;
      this.isBuyerPopupOpen = false;

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
