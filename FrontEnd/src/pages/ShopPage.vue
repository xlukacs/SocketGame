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
              <ShopItem
                v-for="index in 10"
                :key="index"
                :id="index"
                @open-buyer-popup="openItem"
              />
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
import ShopItem from "components/ShopItem.vue";

export default defineComponent({
  name: "ShopPage",
  components: { ItemBuyerPopup, ShopItem },
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
      console.log("Emit reeived", id);
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
</style>
