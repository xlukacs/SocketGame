<template>
  <q-page class="flex justify-center">
    <div class="shopWrapper row">
      <div class="categories">
        <q-tabs vertical v-model="shopTab" class="text-teal">
          <q-tab name="ships" label="Ships" />
          <q-tab name="lasers" label="Lasers" />
          <q-tab name="generators" label="Generators" />
        </q-tabs>
      </div>
      <div class="categoryItems">
        <q-tab-panels v-model="shopTab" animated swipeable vertical dark>
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
      </div>
    </div>

    <ItemBuyerPopup
      :open="isBuyerPopupOpen"
      :item="itemToBuyID"
      :singular="singularItem"
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
      shopTab: "ships",
      itemToBuyID: "",
      singularItem: false,
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

      if (this.shopTab == "ships") this.singularItem = true;
      else this.singularItem = false;
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

.shopWrapper {
  margin: auto;
  margin-top: 20px;
  width: 80%;
  height: 100%;
  background-color: #1a1d23;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.categories {
  width: 20%;
  height: 100%;
}
.categoryItems {
  width: 80%;
  height: 100%;
}
</style>
