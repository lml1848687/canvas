<template>
  <div id="actions" class="actions">
    <svg
      :id="item"
      class="icon"
      @click="changeSvg(index)"
      :class="{active:index===svgIndex}"
      v-for="(item,index) in toolName"
      :key="index"
    >
      <use v-bind:xlink:href="[`#icon-${item}`]"></use>
    </svg>
  </div>
</template>

<script type="text/javascript">
import "../svg";
export default {
  name: "Tools",
  data() {
    return {
      toolName: ["pen", "eraser", "clear", "save"],
      svgIndex: 0
    };
  },
  methods: {
    changeSvg(index) {
      if (index < 2) {
        this.svgIndex = index;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.actions {
  position: fixed;
  top: 0;
  left: 20px;
  z-index: 1999;
  padding: 30px 0;
}

.trans {
  display: inline-block;
}

.actions svg {
  width: 1.5em;
  height: 1.5em;
  transition: all 0.3s;
  margin: 0 10px;
}

.actions svg.active {
  fill: red;
  transform: scale(1.2);
}
</style>
