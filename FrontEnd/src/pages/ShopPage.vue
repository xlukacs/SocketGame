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
                :id="item.itemID"
                @open-buyer-popup="openItem"
                v-for="item in items.ships"
                :key="item.id"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="lasers">
            <div class="shop-items flex row">
              <ShopItem
                :id="item.itemID"
                @open-buyer-popup="openItem"
                v-for="item in items.lasers"
                :key="item.id"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="generators">
            <div class="shop-items flex row">
              <ShopItem
                :id="item.itemID"
                @open-buyer-popup="openItem"
                v-for="item in items.generators"
                :key="item.id"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>

    <ItemBuyerPopup
      :open="isBuyerPopupOpen"
      :item="itemToBuyID"
      @close-buyer-popup="closeItemPopup"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ItemBuyerPopup from "components/ItemBuyerPopup.vue";
import ShopItem from "components/ShopItem.vue";
import {
  loadLasersData,
  loadShipsData,
  loadGeneratorsData,
} from "@/../../src/assets/scripts/managers/itemManager.js";

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
      itemToBuyID: "",
      isBuyerPopupOpen: false,
      items: {
        ships: [],
        lasers: [],
        generators: [],
      },
    };
  },
  computed: {},
  mounted() {
    this.loadShopData();
  },
  methods: {
    loadShopData: async function () {
      this.items.ships = await loadShipsData();
      this.items.lasers = await loadLasersData();
      this.items.generators = await loadGeneratorsData();
    },
    openItem: function (id) {
      console.log("Opening", id);
      this.itemToBuyID = id;
      this.isBuyerPopupOpen = true;
    },
    closeItemPopup: function () {
      this.isBuyerPopupOpen = false;
    },
  },
});
</script>
<style lang="scss" scoped>
.shop-items {
  gap: 5px;
}
</style>
