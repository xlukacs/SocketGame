<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <div class="top">
        <div class="serverInfo">
          <div class="server">GE1</div>
          <div class="sid">lvl 22</div>
          <div class="buttons">
            <q-btn
              color="primary"
              dense
              icon="home"
              @click="$router.push('/')"
            />
            <q-btn color="primary" dense icon="check" @click="onClick" />
          </div>
        </div>
        <div class="accountInfo">
          <div class="xp">1.500 k</div>
          <div class="ep">1.800 m</div>
          <div class="buttons">
            <q-btn color="primary" dense icon="check" @click="onClick" />
            <q-btn color="primary" dense icon="check" @click="onClick" />
            <q-btn color="primary" dense icon="check" @click="onClick" />
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="leftPart">
          <q-btn
            color="primary"
            label="Hangar"
            @click="$router.push('/hangar')"
          />
          <q-btn color="primary" label="Profile" @click="onClick" />
          <q-btn color="primary" label="Skylab" @click="onClick" />
        </div>
        <div class="centralPart">
          <q-img
            src="https://placeimg.com/500/300/nature"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            height="150px"
          />
          <q-btn color="primary" label="START" @click="onClick" />
        </div>
        <div class="rightPart">
          <q-btn color="primary" label="Shop" @click="onClick" />
          <q-btn color="primary" label="Auction" @click="onClick" />
          <q-btn color="primary" label="Galaxygates" @click="onClick" />
        </div>
      </div>
      <div class="bot">
        <div class="accountCurrencies">
          <div class="kredit">800k</div>
          <div class="uridium">4500m</div>
          <div class="trubium">70</div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 25px;
  line-height: 25px;
  background-color: red;
  display: flex;
  flex-direction: row;
  //mutual props
  .accountInfo,
  .serverInfo {
    width: 50%;
    display: flex;
    flex-direction: row;
  }
  .serverInfo {
    padding-left: 50px;
    gap: 10%;
    .buttons {
      position: relative;
      top: 25px;
      left: -200px;
      button {
        margin-right: 10px;
      }
    }
  }
  .accountInfo {
    flex-flow: row-reverse;
    padding-right: 50px;
    gap: 10%;
    .buttons {
      position: relative;
      top: 25px;
      right: -200px;
      button {
        margin-right: 10px;
      }
    }
  }
}
.mid {
  height: 195px;
  width: 100%;
  background-color: blue;
  display: flex;
  flex-direction: row;
  //mutual props
  .leftPart,
  .rightPart {
    width: 40%;
  }
  .centralPart {
    width: 20%;
  }

  button {
    width: 150px;
    margin-top: 5px;
  }

  .leftPart {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    button:nth-child(1) {
      margin-left: 100px;
    }

    button:nth-child(2) {
      margin-left: 150px;
    }

    button:nth-child(3) {
      margin-left: 200px;
    }
  }

  .centralPart {
    text-align: center;
  }

  .rightPart {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    button:nth-child(1) {
      margin-right: 100px;
    }

    button:nth-child(2) {
      margin-right: 150px;
    }

    button:nth-child(3) {
      margin-right: 200px;
    }
  }
}
.bot {
  width: 100%;
  height: 25px;
  line-height: 25px;
  .accountCurrencies {
    width: 300px;
    float: right;
    margin-right: 100px;
    display: flex;
    flex-direction: row;
    div {
      width: 33.33%;
      text-align: center;
      margin-right: 10px;
      border: 2px solid black;
      border-top: 0px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
