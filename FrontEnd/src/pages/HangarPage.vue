<template>
  <q-page class="flex justify-center">
    <section class="left">
      <!-- <q-virtual-scroll
        style="max-height: 300px"
        :items="shipList"
        separator
        v-slot="{ item, index }"
        class="shipList"
      >
        <q-card
          class="shipCard"
          v-if="item.isAvailable"separator
          :key="'shipActive' + index"
        >
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">
              {{ item.label }} <q-icon name="check" color="orange-10" />
            </div>
          </q-card-section>
        </q-card>
        <q-card class="shipCard" v-else :key="'shipInactive' + index">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">{{ item.label }}</div>
          </q-card-section>
        </q-card>
      </q-virtual-scroll> -->
      <div class="shipList">
        <q-card class="shipCard" v-for="ship in shipList" v-bind:key="ship.id">
          <q-img
            src="https://placeimg.com/500/300/nature"
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
              <q-separators color="primary"></q-separators>
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
              class="bg-dark text-white rounded-borders"
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
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="pet">
            <q-scroll-area
              class="bg-dark text-white rounded-borders"
              style="height: 350px"
            >
              <div class="text-h6">Movies</div>
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HangarPage",
  setup() {
    return {
      tab: ref("ship"),
      shipList: [
        {
          label: "Ship1",
          isAvailable: true,
        },
        {
          label: "Ship2",
          isAvailable: true,
        },
        {
          label: "Ship3",
          isAvailable: false,
        },
        {
          label: "Ship4",
          isAvailable: false,
        },
        {
          label: "Ship5",
          isAvailable: false,
        },
      ],
    };
  },
  data() {
    return {
      isSelectedShipActive: false,
    };
  },
});
</script>
<style lang="scss" scoped>
section {
  margin-top: 10px;
  max-height: 450px;
}
.left {
  width: 40%;
  background-color: lightgray;
  padding: 10px;
  border-radius: 5px;
  .shipList {
    width: 100%;
    height: 470px;
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
