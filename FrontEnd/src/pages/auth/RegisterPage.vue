<template>
  <div>
    Register form
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="text" placeholder="Password" v-model="password" />
      <input
        type="text"
        placeholder="Confirm Password"
        v-model="password_conf"
      />
      <input type="email" placeholder="Email" v-model="email" />
      <input type="email" placeholder="Confirm email" v-model="email_conf" />
      <input type="submit" value="Submit" />
    </form>
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

<style scoped></style>
