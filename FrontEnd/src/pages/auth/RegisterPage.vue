<template>
  <PopupWindow :message="errorMessage" />
  <div class="bg"></div>
  <div class="wrapper registerHolder">
    <div class="infoSection">
      <q-img
        :src="require('/public/assets/web_assets/user_rounded_default.png')"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        fit="scale-down"
        width="200px"
      />
      <h1>Register</h1>
    </div>
    <div class="upper">
      <form>
        <q-input v-model="username" type="text" label="Username" />
        <q-input v-model="password" type="password" label="Password" />
        <q-input
          v-model="password_conf"
          type="password"
          label="Confirm password"
        />
        <q-input v-model="email" type="email" label="Email" />
        <q-input v-model="email_conf" type="email" label="Confirm email" />
        <div class="controls">
          <q-btn color="primary" label="Register" @click="handleSubmit" />
        </div>
      </form>
    </div>
    <div class="lower">
      <q-btn color="primary" label="Already registered?" to="/login" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      password_conf: "",
      email: "",
      email_conf: "",
    };
  },
  methods: {
    handleSubmit: function () {
      const data = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      if (this.password != this.password_conf)
        return console.log("Passwords don't match");
      if (this.email != this.email_conf)
        return console.log("Emails don't match");

      var vm = this;
      axios
        .post("http://localhost:3000/API/auth/register", data)
        .then((res) => {
          if (res.status == 200) {
            vm.$router.push("/login");
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
.registerHolder {
  margin: auto;
  margin-top: 20px;
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
    text-align: center;
    .q-btn {
      margin-top: 7px;
    }
  }
}
</style>
