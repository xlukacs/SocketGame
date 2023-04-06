<template>
  <q-page class="flex justify-center">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="activeShopTab" vertical class="text-teal">
          <q-tab name="ships" label="Ships"></q-tab>
          <q-tab name="lasers" label="Lasers"></q-tab>
          <q-tab name="generators" label="Generators"></q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="activeShopTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="ships">
            <div class="shop-items flex row">
              <div
                class="shop-item"
                v-for="index in 10"
                :key="index"
                @click="openItem(index)"
              >
                <div
                  class="shop-item-image"
                  style="
                    background-image: url('https://placeimg.com/500/300/nature');
                  "
                >
                  <p>Ship</p>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="lasers">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>

          <q-tab-panel name="generators">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>

    <ItemBuyerPopup :item="itemToBuyID" @close-buyer-popup="closeItemPopup" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ItemBuyerPopup from "components/ItemBuyerPopup.vue";

export default defineComponent({
  name: "ShopPage",
  components: { ItemBuyerPopup },
  setup() {
    return {
      activeShopTab: ref("ships"),
      splitterModel: ref(20),
    };
  },
  data() {
    return {
      itemToBuyID: 0,
    };
  },
  methods: {
    openItem: function (id) {
      this.itemToBuyID = id;
    },
    closeItemPopup: function () {
      this.itemToBuyID = 0;
    },
  },
});
</script>
<style lang="scss" scoped>
.shop-items {
  gap: 5px;
}
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
