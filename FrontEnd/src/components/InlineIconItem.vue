<template>
  <div>
    <q-img
      :src="require('/public/assets/web_assets/' + icon)"
      :ratio="16 / 9"
      spinner-color="primary"
      spinner-size="82px"
      width="20px"
      height="20px"
      fit="scale-down"
      class="icon"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "InlineIconItem",
  props: {
    text: String,
    icon: String,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
div {
  display: inline-flex;
  flex-direction: row;
  gap: 5px;
  .icon {
    margin-top: 3px;
  }
  span {
    font-weight: bold;
  }
}
</style>
