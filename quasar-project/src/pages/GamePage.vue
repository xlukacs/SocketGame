<template>
  <q-page class="flex flex-center">
    <h1>GAMEPAGE {{ valX }}</h1>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePage",
  data: function () {
    return {
      valX: 555,
    };
  },
});
</script>
