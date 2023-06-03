<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="no-bg text-white" height-hint="98">
      <div class="top">
        <div class="serverInfo">
          <div class="server font-bold">{{ serverInfo.server }}</div>
          <div class="sid font-bold">{{ serverInfo.level }}</div>
          <div class="buttons">
            <q-btn
              color="primary"
              dense
              icon="home"
              @click="$router.push('/')"
            />
            <q-btn color="primary" dense icon="public" @click="onClick" />
          </div>
        </div>
        <div class="accountInfo">
          <div class="xp">
            <InlineIconItem :text="accountInfo.xp" icon="xp.png" />
          </div>
          <div class="honors">
            <InlineIconItem :text="accountInfo.honors" icon="honor.png" />
          </div>
          <div class="buttons">
            <q-btn color="primary" dense icon="check" @click="onClick" />
            <q-btn color="primary" dense icon="check" @click="onClick" />
            <q-btn color="primary" dense icon="logout" @click="logout" />
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
            :src="require('/public/assets/web_assets/logo.png')"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            height="150px"
            fit="scale-down"
          />
          <!-- target="_blank"  href="/gameClient" -->
          <q-btn
            color="positive"
            label="START"
            @click="$router.push('/gameClient')"
          />
        </div>
        <div class="rightPart">
          <q-btn color="primary" label="Shop" @click="$router.push('/shop')" />
          <q-btn color="primary" label="Auction" @click="onClick" />
          <q-btn color="primary" label="Galaxygates" @click="onClick" />
        </div>
      </div>
      <div class="bot">
        <div class="accountCurrencies">
          <div class="kredit">
            <InlineIconItem :text="accountInfo.kredit" icon="credits.png" />
          </div>
          <div class="uridium">
            <InlineIconItem :text="accountInfo.uridium" icon="uridium.png" />
          </div>
          <div class="trubium">
            <InlineIconItem :text="accountInfo.trubium" icon="trubium.png" />
          </div>
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

import InlineIconItem from "../components/InlineIconItem.vue";
import { getKey } from "../assets/util/session";

export default defineComponent({
  name: "MainLayout",

  components: { InlineIconItem },

  setup() {
    return {};
  },
  data() {
    return {
      accountInfo: {
        xp: 800000,
        honors: 1800000000,
        kredit: 800000,
        uridium: 45000000,
        trubium: 70,
      },
      serverInfo: {
        server: "GE1",
        level: "lvl 22",
      },
    };
  },
  created() {
    fetch("http://localhost:3000/API/users/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getKey("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.accountInfo.xp = data.user.xp;
        this.accountInfo.honors = data.user.honors;
        this.accountInfo.kredit = data.user.credits;
        this.accountInfo.uridium = data.user.uridium;
        this.accountInfo.trubium = data.user.trubium;
        this.serverInfo.server = data.user.server;
        this.serverInfo.level = data.user.level;
      });
  },
  methods: {
    logout() {
      console.log("LOGOUT REQUEST");
      this.$router.push("/login");
    },
  },
});
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 25px;
  line-height: 25px;
  background: rgb(17, 20, 23);
  display: flex;
  flex-direction: row;
  //mutual props
  // color: rgb(167, 175, 190);
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
      position: fixed;
      top: 30px;
      left: 50px;
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
      position: fixed;
      top: 30px;
      right: 50px;
      button {
        margin-right: 10px;
      }
    }
  }
}
.mid {
  height: 195px;
  width: 100%;
  background: rgb(26, 29, 35);
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
  background: rgb(39, 44, 53);
  .accountCurrencies {
    // width: 300px;
    // float: right;
    height: 25px;
    margin-right: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    div {
      text-align: center;
      margin-right: 10px;
      padding-left: 10px;
      padding-right: 10px;
      background: rgb(63, 69, 80);
    }
  }
}
</style>
