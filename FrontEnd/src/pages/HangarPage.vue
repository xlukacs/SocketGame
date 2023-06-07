<template>
  <q-page class="flex justify-center">
    <section class="left">
      <div class="shipList">
        <q-card class="shipCard" v-for="ship in shipList" v-bind:key="ship.id">
          <q-img
            :src="require('/public/assets/items/' + ship.image)"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            width="100%"
          >
            <div class="absolute-bottom text-h6" v-if="ship.isAvailable">
              {{ ship.label }} <q-icon name="check" color="orange-10" />
            </div>
            <div class="absolute-bottom text-h6" v-else>
              {{ ship.label }}
            </div>
          </q-img>
        </q-card>
      </div>
    </section>
    <section class="right">
      <q-card>
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
          <q-tab-panel name="ship">
            <q-scroll-area
              class="bg-dark text-white ship"
              style="height: 350px"
            >
              <h6>Main data</h6>
              <ul>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
              </ul>
              <q-separator color="primary"></q-separator>
              <h6>More data</h6>
              <ul>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
                <li>
                  <span class="propertyName">Hitpoints</span>
                  <span class="propertyValue">200 000</span>
                </li>
              </ul>
              <q-separator color="primary"></q-separator>
              <h6>Abilites</h6>
              <div class="ability">
                <q-img
                  src="https://placeimg.com/500/300/nature"
                  :ratio="1 / 1"
                  spinner-color="primary"
                  spinner-size="82px"
                  height="75px"
                  width="75px"
                />
                <h5>AbilityName</h5>
                <span>Description</span>
              </div>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="drones">
            <q-scroll-area
              class="bg-dark text-white rounded-borders drones"
              style="height: 350px"
            >
              <ul class="drone">
                <li>
                  <span class="propertyName">nth/Name</span>
                  <span class="propertyValue">1.Iris</span>
                </li>
                <li>
                  <span class="propertyName">Level</span>
                  <span class="propertyValue">level 6</span>
                </li>
                <li>
                  <span class="propertyName">XP</span>
                  <span class="propertyValue">200 000 / 105 000</span>
                </li>
              </ul>
              <q-separator color="primary"></q-separator>
              <ul class="drone">
                <li>
                  <span class="propertyName">nth/Name</span>
                  <span class="propertyValue">2.Iris</span>
                </li>
                <li>
                  <span class="propertyName">Level</span>
                  <span class="propertyValue">level 6</span>
                </li>
                <li>
                  <span class="propertyName">XP</span>
                  <span class="propertyValue">200 000 / 105 000</span>
                </li>
              </ul>
              <q-separator color="primary"></q-separator>
              <ul class="drone">
                <li>
                  <span class="propertyName">nth/Name</span>
                  <span class="propertyValue">3.Iris</span>
                </li>
                <li>
                  <span class="propertyName">Level</span>
                  <span class="propertyValue">level 6</span>
                </li>
                <li>
                  <span class="propertyName">XP</span>
                  <span class="propertyValue">200 000 / 105 000</span>
                </li>
              </ul>
              <ul class="drone">
                <li>
                  <span class="propertyName">nth/Name</span>
                  <span class="propertyValue">4.Iris</span>
                </li>
                <li>
                  <span class="propertyName">Level</span>
                  <span class="propertyValue">level 6</span>
                </li>
                <li>
                  <span class="propertyName">XP</span>
                  <span class="propertyValue">200 000 / 105 000</span>
                </li>
              </ul>
              <ul class="drone">
                <li>
                  <span class="propertyName">nth/Name</span>
                  <span class="propertyValue">5.Iris</span>
                </li>
                <li>
                  <span class="propertyName">Level</span>
                  <span class="propertyValue">level 6</span>
                </li>
                <li>
                  <span class="propertyName">XP</span>
                  <span class="propertyValue">200 000 / 105 000</span>
                </li>
              </ul>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="pet">
            <q-scroll-area
              class="bg-dark text-white rounded-borders"
              style="height: 350px"
            >
              <div class="text-h6">PET TAB</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <div class="statusButtons bg-dark">
        <q-btn
          color="primary"
          label="Activate"
          v-if="isSelectedShipActive"
          @click="onClick"
        />
        <div class="statusButton" v-else>Active</div>
        <q-btn
          color="primary"
          dense
          label="configure"
          size="12px"
          @click="$router.push('/configShip')"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import { fetchGetRequest } from "src/assets/scripts/util";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HangarPage",
  data() {
    return {};
  },
  data() {
    return {
      isSelectedShipActive: false,
      tab: ref("ship"),
      shipList: [],
    };
  },
  methods: {
    getShipIndex(shipName) {
      for (let i = 0; i < this.shipList.length; i++) {
        const ship = this.shipList[i];

        if (ship.label === shipName) return i;
      }

      return -1;
    },
  },
  created() {
    //fetch all the ships
    fetchGetRequest("http://localhost:3000/API/shop/getships").then(
      (response) => {
        for (let i = 0; i < response.ship.length; i++) {
          const ship = response.ship[i];
          this.shipList.push({
            label: ship.name,
            isAvailable: false,
            image: ship.pic,
          });
        }
      }
    );

    //fetch which ships does the user have
    fetchGetRequest("http://localhost:3000/API/users/getships", true).then(
      (response) => {
        if (!response.ships.length) return;

        for (let i = 0; i < response.ships.length; i++) {
          const ship = response.ships[i];

          this.shipList[this.getShipIndex(ship.name)].isAvailable = true;
        }
      }
    );
  },
});
</script>
<style lang="scss" scoped>
section {
  margin-top: 10px;
}
.left {
  width: 40%;
  .shipList {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    background-color: lightgray;
    padding: 10px;
    border-radius: 5px;
  }
  .shipCard {
    cursor: pointer;
    width: calc(50% - 10px);
    margin: 5px;
    float: left;
    .text-h6 {
      display: inline-block;
      line-height: 100%;
    }
  }
}
.right {
  width: 40%;
  margin-left: 10px;
  max-height: 460px;
  .ship {
    h6 {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    h6:not(:first-child) {
      margin-top: 5px;
    }
    ul {
      margin-top: 0px;
      list-style-type: none;
      padding-left: 0px;
      li {
        height: 25px;
        line-height: 25px;
        width: 100%;
        display: flex;
        flex-direction: row;
        .propertyName,
        .propertyValue {
          width: 50%;
          display: block;
        }
        .propertyValue {
          text-align: right;
          padding-right: 20px;
        }
      }
    }
    .ability {
      .q-img img {
        margin-top: 10px;
      }
      h5 {
        font-size: 1.3em;
        margin-top: 0px;
        margin-bottom: 0px;
      }
    }
  }
  .drones {
    .drone {
      list-style-type: none;
      padding-left: 0px;
      li {
        padding: 4px 2px;
        display: flex;
        flex-direction: row;
        .propertyName,
        .propertyValue {
          width: 50%;
          display: block;
        }
        .propertyValue {
          text-align: right;
          padding-right: 20px;
        }
      }
      li:nth-child(odd) {
        background-color: lightgray;
        color: black;
      }
      li:nth-child(even) {
        background-color: gray;
      }
    }
  }
  .statusButtons {
    padding: 5px;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .statusButton {
      color: white;
      font-weight: bold;
      font-size: 1.2em;
    }
  }
}
</style>
