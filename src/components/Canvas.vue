<template>
  <div>
    <canvas id="canvas"></canvas>
    <tools></tools>
    <colors></colors>
    <line-size></line-size>
  </div>
</template>

<script type="text/javascript">
import Tools from "./tools";
import Colors from "./colors";
import LineSize from "./lineSize";
export default {
  name: "Canvas",
  components: {
    Colors,
    Tools,
    LineSize
  },
  mounted() {
    this.setCanvasSize();
  },
  methods: {
    setCanvasSize() {
      let canvas = document.getElementById("canvas");
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      canvas.width = pageWidth;
      canvas.height = pageHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  display: block;
}
</style>
