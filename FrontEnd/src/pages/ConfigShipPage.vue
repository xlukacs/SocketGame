<template>
  <q-page class="flex flex-center">
    <div class="shipConfig">
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 text-grey-7"
        active-color="primary"
        indicator-color="purple"
        align="justify"
      >
        <q-tab name="ship" label="Ship"></q-tab>
        <q-tab name="drones" label="Drones"></q-tab>
        <q-tab name="pet" label="PET"></q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" dark animated class="text-white">
        <q-tab-panel name="ship" style="padding: 0px">
          <q-scroll-area class="bg-dark text-white ship" style="height: 464px">
            <div class="column shipConfigDropZones">
              <section>
                <h6>Lasers</h6>
                <div class="slots">
                  <div
                    class="slot"
                    @drop="drop"
                    @dragover="allowDrop"
                    v-for="laser in shipConfigs[0].items.lasers"
                    :key="laser.id"
                  >
                    <div
                      :id="laser.randomID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                    ></div>
                  </div>
                  <div
                    class="slot"
                    @drop="drop"
                    @dragover="allowDrop"
                    v-for="n in shipValues.lasers -
                    shipConfigs[0].items.lasers.length"
                    :key="n + 'EmptyLaserSlot'"
                  ></div>
                </div>
              </section>
              <section>
                <h6>Shields</h6>
                <div class="slots">
                  <div
                    class="slot"
                    @drop="drop"
                    @dragover="allowDrop"
                    v-for="shield in shipConfigs[0].items.shields"
                    :key="shield.id"
                  >
                    <div
                      :id="shield.randomID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                    ></div>
                  </div>
                  <div
                    class="slot"
                    @drop="drop"
                    @dragover="allowDrop"
                    v-for="n in shipValues.shields -
                    shipConfigs[0].items.shields.length"
                    :key="n + 'EmptyShieldSlot'"
                  ></div>
                </div>
              </section>
            </div>
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="drones" style="padding: 0px">
          <q-scroll-area
            class="bg-dark text-white rounded-borders drones"
            style="height: 464px"
          >
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="pet" style="padding: 0px">
          <q-scroll-area
            class="bg-dark text-white rounded-borders"
            style="height: 464px"
          >
            pet
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="inventory bg-dark">
      <div class="slots">
        <!-- general -->
        <div
          class="slot"
          @drop="drop"
          @dragover="allowDrop"
          v-for="item in inventory"
          :key="item.id"
        >
          <div
            :id="item.randomID"
            class="item"
            draggable="true"
            @dragstart="drag"
          ></div>
        </div>
        <!-- General empty -->
        <div
          class="slot"
          @drop="drop"
          @dragover="allowDrop"
          v-for="n in 135 - inventory.length"
          :key="n + 'emptyGeneralInventorySlot'"
        ></div>

        <!-- LASERS -->
        <!-- <div
          class="slot"
          @drop="drop"
          @dragover="allowDrop"
          v-for="laser in shipConfigs[0].items.lasers"
          :key="laser.id"
        >
          <div
            :id="laser.randomID"
            class="item"
            draggable="true"
            @dragstart="drag"
          ></div>
        </div> -->

        <!-- SHIELDS -->
        <!-- <div
          class="slot"
          @drop="drop"
          @dragover="allowDrop"
          v-for="shield in shipConfigs[0].items.shields"
          :key="shield.id"
        >
          <div
            :id="shield.randomID"
            class="item"
            draggable="true"
            @dragstart="drag"
          ></div>
        </div> -->

        <!-- EMPTY SLOTS -->
        <!-- <div
          class="slot"
          @drop="drop"
          @dragover="allowDrop"
          v-for="n in 135 -
          shipConfigs[0].items.lasers.length -
          shipConfigs[0].items.shields.length"
          :key="n + 'EmptyShieldSlot'"
        ></div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import interact from "interactjs";

export default defineComponent({
  name: "ConfigShipPage",
  setup() {
    return {
      tab: ref("ship"),
    };
  },
  data() {
    return {
      shipValues: {
        lasers: 10,
        shields: 8,
      },
      shipConfigs: [
        {
          config: 1,
          items: {
            lasers: [
              {
                itemName: "LF-4",
                randomID: "HN7LKGLUAP",
                bg: "pic/items/lasers/lf4.png",
                type: "laser",
              },
            ],
            shields: [
              {
                itemName: "BO3",
                randomID: "CEHNOF7EZE",
                bg: "pic/items/shields/bo3.png",
                type: "shield",
              },
              {
                itemName: "BO3",
                randomID: "CEHNOF7EZE2",
                bg: "pic/items/shields/bo3.png",
                type: "shield",
              },
            ],
          },
        },
      ],
      inventory: [
        {
          itemName: "LF-4",
          randomID: "DOODLEYDOO",
          bg: "pic/items/lasers/lf4.png",
        },
        {
          itemName: "LF-4",
          randomID: "BOOMBASTIC",
          bg: "pic/items/lasers/lf4.png",
        },
        {
          itemName: "BO3",
          randomID: "NOTSORANDOM",
          bg: "pic/items/shields/bo3.png",
        },
      ],
    };
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    },
  },
  mounted() {},
});
</script>

<style lang="scss" scoped>
.shipConfig {
  width: 500px;
  height: 500px;
}
.inventory {
  width: 300px;
  height: 500px;
}

.shipConfigDropZones {
  section {
    padding: 5px 15px;
    border-bottom: 1px solid gray;
  }
}

section {
  background-color: lightgray;
  .slots {
    display: flex;
    flex-direction: row;
    gap: 2px;
    flex-wrap: wrap;
    .slot {
      width: 30px;
      height: 30px;
      border: 1px solid gray;
      .item {
        width: 26px;
        height: 26px;
        margin: 1px;
        background-color: red;
      }
    }
  }
}

.inventory {
  .slots {
    padding-left: 7px;
    padding-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2px;
    .slot {
      width: 30px;
      height: 30px;
      border: 1px solid gray;
      .item {
        width: 26px;
        height: 26px;
        margin: 1px;
        background-color: red;
      }
    }
  }
}
</style>
