<template>
  <div class="lineSize">
    <ol class="sizes">
      <li id="thin" :class="item" v-for="(item, index) in size" :key="index"></li>
    </ol>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "LineSize",
  data() {
    return {
      size: ["thin", "thick"]
    };
  }
};
</script>

<style lang="scss" scoped>
ul,
ol {
  list-style: none;
}

.sizes {
  position: fixed;
  left: 28px;
  top: 250px;
  li {
    margin: 20px 0;
  }
  & > .thin {
    height: 0;
    width: 30px;
    border-top: 3px solid black;
  }
  & > .thick {
    height: 0;
    width: 30px;
    border-top: 6px solid black;
  }
}
</style>
