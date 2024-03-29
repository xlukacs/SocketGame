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
                    @drop="drop($event, 'laser')"
                    @dragover="allowDrop"
                    v-for="laser in shipConfigs[0].items.lasers"
                    :key="laser.id"
                  >
                    <div
                      :id="laser.itemID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                      :type="laser.type"
                    ></div>
                  </div>
                  <div
                    class="slot"
                    @drop="drop($event, 'laser')"
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
                    @drop="drop($event, 'shield')"
                    @dragover="allowDrop"
                    v-for="shield in shipConfigs[0].items.shields"
                    :key="shield.id"
                  >
                    <div
                      :id="shield.itemID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                      :type="shield.type"
                    ></div>
                  </div>
                  <div
                    class="slot"
                    @drop="drop($event, 'shield')"
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
            <div class="column shipConfigDropZones">
              <section
                v-for="(drone, index) in dronesData"
                :key="drone.id"
                class="drone"
              >
                <h6>{{ drone.name }}</h6>
                <q-img
                  :src="drone.bg"
                  spinner-color="primary"
                  spinner-size="82px"
                  width="70px"
                  height="70px"
                  class="droneImg"
                />
                <div class="slots droneItems row items-end">
                  <div
                    class="slot"
                    @drop="drop($event, 'droneGeneralSlot')"
                    @dragover="allowDrop"
                  >
                    <div
                      v-if="drone.items[0]"
                      :id="drone.items[0].itemID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                      :type="drone.items[0].type"
                    ></div>
                  </div>
                  <div
                    class="slot"
                    @drop="drop($event, 'droneGeneralSlot')"
                    @dragover="allowDrop"
                  >
                    <div
                      v-if="drone.items[1]"
                      :id="drone.items[1].itemID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                      :type="drone.items[1].type"
                    ></div>
                  </div>
                </div>
                <div class="slots droneDesign row items-end">
                  <div
                    class="slot"
                    @drop="drop($event, 'droneDesignSlot')"
                    @dragover="allowDrop"
                    :drone="'drone' + index"
                  >
                    <div
                      v-if="drone.design.name"
                      :id="drone.design.itemID"
                      class="item"
                      draggable="true"
                      @dragstart="drag"
                      :type="drone.design.type"
                    ></div>
                  </div>
                </div>
              </section>
            </div>
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
          @drop="drop($event, 'general')"
          @dragover="allowDrop"
          v-for="item in inventory"
          :key="item.id"
        >
          <div
            :id="item.itemID"
            class="item"
            draggable="true"
            @dragstart="drag"
            :type="item.type"
          ></div>
        </div>

        <!-- General empty -->
        <div
          class="slot"
          @drop="drop($event, 'general')"
          @dragover="allowDrop"
          v-for="n in 135 - inventory.length"
          :key="n + 'emptyGeneralInventorySlot'"
        ></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { generateRandomID } from "src/assets/scripts/util";
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "ConfigShipPage",
  setup() {
    return {
      tab: ref("drones"),
    };
  },
  computed: {
    ...mapGetters("drones", {
      dronesData: "getAllDrones",
    }),
    ...mapGetters("inventory", {
      inventoryData: "getAllItems",
    }),
  },
  data() {
    return {
      dragData: {
        fromElement: null,
      },
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
                itemID: generateRandomID(16),
                bg: "assets/pic/items/lasers/lf4.png",
                type: "laser",
              },
            ],
            shields: [
              {
                itemName: "BO3",
                itemID: generateRandomID(16),
                bg: "assets/pic/items/shields/bo3.png",
                type: "shield",
              },
              {
                itemName: "BO3",
                itemID: generateRandomID(16),
                bg: "assets/pic/items/shields/bo3.png",
                type: "shield",
              },
            ],
          },
          //drones: dronesData,
        },
      ],
      inventory: [],
    };
  },
  methods: {
    ...mapActions("drones", ["removeDroneDesign", "addDroneDesign"]),
    ...mapActions("inventory", ["removeItem", "addItem"]),
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev, slotType) {
      ev.preventDefault();
      //find the ID (data) and the element (elem) we are moving
      var data = ev.dataTransfer.getData("text");
      var elem = document.getElementById(data);

      //remove from its slot
      this.removeItem(data);

      //inventory
      if (slotType == elem.getAttribute("type") || slotType == "general") {
        ev.target.appendChild(document.getElementById(data));

        console.log("moved item in general slot");
        return;
      }

      //drone
      if (
        ("laser" == elem.getAttribute("type") ||
          "shield" == elem.getAttribute("type")) &&
        slotType == "droneGeneralSlot"
      ) {
        ev.target.appendChild(document.getElementById(data));
        return;
      }

      //place drone design in drone
      if (
        "droneDesign" == elem.getAttribute("type") &&
        slotType == "droneDesignSlot"
      ) {
        //if we are moving the drone design from a drone to a drone
        if (document.getElementById(data).parentElement.hasAttribute("drone")) {
          let fromDrone = document
            .getElementById(data)
            .parentElement.getAttribute("drone");

          let nthDrone = fromDrone.substring(5);

          this.removeDroneDesign(nthDrone);
          console.log(
            "removing drone design since we are moving it to another drone"
          );
        }

        //UPDATE drone design in the store
        let toDrone = ev.target.getAttribute("drone");
        this.addDroneDesign({
          nthDrone: toDrone.substring(5),
          designData: {
            name: "havoc",
            itemID: data,
            bg: "assets/pic/items/drones/havoc.png",
            type: "droneDesign",
            skin: "havoc.bmp",
          },
        });

        //this.$store.getters["user/getUser"]
        this.$socket.emit("updateDroneDesign", {
          user: "madrent",
          nthDrone: toDrone.substring(5),
          design: "havoc",
        });
      }
    },
  },
  mounted() {
    this.inventory = this.inventoryData;
  },
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

.drone {
  display: grid;
  grid-template-areas: "name name name" "pic items design";
  grid-template-rows: 30px 70px;
  grid-template-columns: 70px auto auto;
  gap: 5px;
  h6 {
    grid-area: name;
    padding: 0px;
    margin: 0px;
    color: black;
  }
  .droneImg {
    grid-area: pic;
    border-radius: 10px;
  }
  .droneItems {
    grid-area: items;
  }
  .droneDesign {
    grid-area: design;
  }
}
</style>
