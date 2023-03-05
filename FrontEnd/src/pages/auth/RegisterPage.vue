<template>
  <div>
    Register form
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="text" placeholder="Password" v-model="password" />
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
    };
  },
  methods: {
    handleSubmit: function () {
      const data = {
        username: this.username,
        password: this.password,
      };

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
