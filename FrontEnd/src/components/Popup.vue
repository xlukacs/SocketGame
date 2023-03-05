<template>
  <div v-if="message != ''" id="popupWindow">
    <div class="bg"></div>
    <div class="content">
      <p>We need your attention!</p>
      <span>{{ message }}</span>
      <button v-on:click="closeWindow">Close this</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupWindow",
  props: {
    message: String,
  },
  methods: {
    closeWindow: function () {
      document.getElementById("popupWindow").style.display = "none";
    },
  },
};
</script>

<style scoped lang="scss">
#popupWindow {
  .bg {
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 1001;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .content {
    position: fixed;
    position: fixed;
    padding: 40px 25px;
    width: 40%;
    top: 40%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1002;
    background-color: white;
    border-radius: 3px;
    p {
      font-size: 2.5em;
      margin-bottom: 50px;
      font-weight: 600;
    }
    span {
      width: 100%;
      display: block;
      margin-bottom: 50px;
    }
    button {
      background-color: #56baed;
      border: unset;
      color: white;
      line-height: 40px;
      width: 40%;
      border-radius: 3px;
      font-size: 1em;
      transition: 0.3s all ease-in-out;
      &:hover {
        background-color: #7cc7ec;
        cursor: pointer;
      }
    }
  }
}
</style>
