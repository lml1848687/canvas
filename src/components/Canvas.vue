<template>
  <div>
    <canvas id="canvas" @mousemove="draw" @mouseup="mouseUp" @mousedown="mouseDown"></canvas>
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
  data() {
    return {
      lastPoint: null,
      newPoint: null,
      startDraw: false
    };
  },
  mounted() {
    this.setCanvasSize();
  },
  methods: {
    mouseDown(e) {
      this.startDraw = true;
    },
    mouseUp() {
      this.startDraw = false;
    },
    draw(e) {
      let x = e.clientX;
      let y = e.clientY;
      this.newPoint = {
        x: x,
        y: y
      };
      if (this.startDraw) {
        this.drawLine(
          this.lastPoint.x,
          this.lastPoint.y,
          this.newPoint.x,
          this.newPoint.y
        );
      }
      this.lastPoint = this.newPoint;
    },

    setCanvasSize() {
      let canvas = document.getElementById("canvas");
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      canvas.width = pageWidth;
      canvas.height = pageHeight;
    },
    drawLine(x1, y1, x2, y2) {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      let lineWidth = 5;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineWidth = lineWidth;
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    },
    drawCir(x, y) {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(x, y, 0.1, 0, Math.PI * 2);
      context.fill();
    }
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  display: block;
}
</style>
