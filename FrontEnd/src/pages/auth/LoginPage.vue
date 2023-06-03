<template>
  <PopupWindow :message="errorMessage" />
  <div class="bg"></div>
  <div class="wrapper loginHolder">
    <div class="infoSection">
      <q-img
        :src="require('/public/assets/web_assets/user_rounded_default.png')"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        fit="scale-down"
        width="200px"
      />
      <h1>Sign in</h1>
    </div>
    <div class="upper">
      <form>
        <q-input v-model="username" type="text" label="Username" />
        <q-input v-model="password" type="password" label="Password" />
        <div class="controls">
          <q-btn color="primary" label="Login" @click="handleSubmit" />
        </div>
      </form>
    </div>
    <div class="lower">
      <router-link to="/reset-password">Forgot password? </router-link>

      <q-btn color="primary" label="Not registered?" to="/register" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PopupWindow from "@/../../src/components/Popup.vue";

// import { setCookie } from '../assets/js/util/cookies'
import {
  setKey,
  existSession,
  startSession,
} from "@/../../src/assets/siteJS/util/session";

export default {
  name: "LoginPage",
  components: {
    PopupWindow,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleSubmit: function () {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/API/auth/login", data)
        .then((res) => {
          if (res.status == 200) {
            if (!existSession()) startSession();

            //console.log(res.data)
            setKey("id", res.data.user_id);
            setKey("token", res.data.accessToken);
            //console.log(getKey('token'))
            //console.log(getKey('id'))

            this.$router.push("/");
          } else {
            this.errorMessage = "Failed to authenticate.";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/web_assets/landingPageBG.jpg");
  position: fixed;
  top: 0px;
  left: 0px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}
.loginHolder {
  margin: auto;
  margin-top: 15%;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 30%);
  width: 400px;

  .infoSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #56baed;
    border-radius: 10px 10px 0px 0px;
    padding: 20px;
    h1 {
      color: white;
      font-size: 30px;
      font-weight: 500;
      margin-top: 10px;
    }
  }
  .upper,
  .lower {
    padding: 15px;
    background-color: white;
    border: 1px solid lightgray;
  }
  .upper {
    border-bottom: 0px;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .controls {
        button {
          width: 150px;
        }
      }
      // input[type="text"],
      // input[type="password"] {
      //   background-color: #f6f6f6;
      //   border: unset;
      //   text-align: center;
      //   width: 90%;
      //   line-height: 50px;
      //   margin: 3px;
      //   border-radius: 3px;
      // }
      // input[type="submit"] {
      //   background-color: #56baed;
      //   color: white;
      //   border: unset;
      //   border-radius: 3px;
      //   width: 60%;
      //   line-height: 50px;
      //   margin: 5px;
      //   margin-top: 15px;
      //   transition: 0.3s all ease-in-out;
      //   &:hover {
      //     background-color: #7cc7ec;
      //     cursor: pointer;
      //   }
      // }
    }
  }
  .lower {
    border-top: 0px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #ebebeb;
    line-height: 50px;
    a {
      color: #56baed;
      text-decoration-color: rgba(0, 0, 0, 0%);
      transition: 0.2s all ease-in-out;
      &:hover {
        text-decoration-color: #56baed;
        cursor: pointer;
      }
    }

    .q-btn {
      float: right;
      margin-top: 7px;
    }
  }
}
</style>

<style></style>
