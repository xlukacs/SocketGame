<template>
  <q-page class="flex mainWrapper justify-center items-start q-pt-md">
    <section class="accountAndServerDetails">
      <div class="accountDetails">
        <h5>{{ user.name }}</h5>
        <q-img
          src="https://placeimg.com/500/300/nature"
          spinner-color="primary"
          spinner-size="82px"
          height="250px"
          width="100%"
        />
        <div class="rankAndClanWrapper">
          <div class="rank">
            <!-- + user.rank + '.png')" -->
            <q-img
              :src="require('/public/assets/web_assets/ranks/rank20.png')"
              :ratio="1 / 1"
              spinner-color="primary"
              spinner-size="82px"
              width="30px"
            />
            <span>{{ user.rank }}</span>
          </div>
          <div class="clan">
            <q-img
              src="https://placeimg.com/500/300/nature"
              :ratio="1 / 1"
              spinner-color="primary"
              spinner-size="82px"
              width="30px"
            />
            <span>{{ user.clan }}</span>
          </div>
        </div>
        <div class="buttons">
          <q-btn color="primary" label="Profile" @click="onClick" />
          <q-btn color="primary" label="Rank status" @click="onClick" />
          <q-btn color="primary" label="Subscriptions" @click="onClick" />
        </div>
      </div>

      <div class="serverDetails">
        <ul class="playerTable">
          <li class="tableHead">
            <span class="nthPlayer">Nr.</span>
            <span class="faction">Faction</span>
            <span class="playerName">PlayerName</span>
            <span class="rankPoints">RankPoints</span>
          </li>
          <li>
            <span class="nthPlayer">1</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">2</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">3</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">4</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">5</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">6</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">7</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">8</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
          <li>
            <span class="nthPlayer">9</span>
            <span class="faction">VRU</span>
            <span class="playerName">Madranter</span>
            <span class="rankPoints">999 999</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="news">
      <q-carousel
        v-model="newsSlide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-position="top"
        navigation
        padding
        arrows
        infinite
        autoplay
        flat
        height="300px"
        class="bg-purple text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          name="first"
          :img-src="require('/public/assets/web_assets/events/event1.png')"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Event1</div>
            <div class="text-subtitle1">The corresponding description</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          :img-src="require('/public/assets/web_assets/events/event2.png')"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Event2</div>
            <div class="text-subtitle1">The description belonging here</div>
          </div>
        </q-carousel-slide>

        <q-carousel-control top> </q-carousel-control>
      </q-carousel>
      <div class="noticeSection">
        Some notice, update, event will go here...
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import InlineIconItem from "../components/InlineIconItem.vue";

export default defineComponent({
  name: "IndexPage",
  // components: { InlineIconItem },
  setup() {
    return {
      newsSlide: ref("first"),
    };
  },
  data() {
    return {
      user: {
        name: "Madranter",
        rank: "Rank",
        clan: "clanName",
      },
    };
  },
});
</script>

<style lang="scss" scoped>
section {
  width: 40%;
}

.mainWrapper {
  background-image: url("/assets/web_assets/homePageBG.jpg");
  background-position: center;
  background-size: cover;
}

.q-page-container {
  padding-top: 244px;
}

.accountAndServerDetails {
  border-radius: 5px;
  overflow: hidden;
  .accountDetails {
    background: #1a1d23;
    padding: 20px;
    h5 {
      margin-top: 5px;
      margin-bottom: 5px;
      font-weight: bold;
      color: white;
    }
    .rankAndClanWrapper {
      margin-top: 5px;
      margin-bottom: 5px;
      display: flex;
      flex-direction: row;
      gap: 10%;
      span {
        margin-left: 10px;
        font-weight: bold;
        color: white;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      button {
        width: 25%;
      }
    }
  }
  .serverDetails {
    background: #272c35;
    /*padding: 20px; 
    padding-top: unset;*/
    margin-top: -20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .playerTable {
      list-style-type: none;
      padding: 0px;
      li {
        color: white;
        height: 25px;
        display: flex;
        flex-direction: row;
        span {
          display: block;
        }
        .nthPlayer {
          width: 25px;
          text-align: center;
        }
        .faction {
          width: 50px;
          text-align: center;
        }
        .playerName {
          width: calc(100% - 25px - 50px - 30%);
        }
      }
      .tableHead {
        background-color: rgb(37, 52, 252);
        span {
          font-weight: bold !important;
          color: white;
        }
      }
    }
  }
}

.news {
  padding-left: 20px;

  //TODO - create this section
  .noticeSection {
    background: #272c35;
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    min-height: 200px;
    font-weight: bold;
    color: white;
  }
}

.custom-caption {
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  .text-h2 {
    font-size: 2.5em;
    font-weight: 500;
  }
}
</style>
