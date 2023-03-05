<template>
  <PopupWindow :message="errorMessage" />
  <div class="wrapper loginHolder">
    <div class="upper">
      <!-- <img
        :src="require('/src/assets/pic/logos/logo_big.png')"
        alt="The logo of the site"
      /> -->
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          autocomplete="current-username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          autocomplete="current-password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
    <div class="lower">
      <router-link to="/reset-password">Forgot password?</router-link>
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
.loginHolder {
  margin: auto;
  margin-top: 15%;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 30%);
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 400px;
  .upper,
  .lower {
    padding: 15px;
  }
  .upper {
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
    form {
      input[type="text"],
      input[type="password"] {
        background-color: #f6f6f6;
        border: unset;
        text-align: center;
        width: 90%;
        line-height: 50px;
        margin: 3px;
        border-radius: 3px;
      }
      input[type="submit"] {
        background-color: #56baed;
        color: white;
        border: unset;
        border-radius: 3px;
        width: 60%;
        line-height: 50px;
        margin: 5px;
        margin-top: 15px;
        transition: 0.3s all ease-in-out;
        &:hover {
          background-color: #7cc7ec;
          cursor: pointer;
        }
      }
    }
  }
  .lower {
    background-color: #f6f6f6;
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
  }
}
</style>

<style></style>
