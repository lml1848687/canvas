<template>
  <div>
    <canvas
      id="canvas"
      @mousemove="mouseDraw"
      @touchmove="touchDraw"
      @mouseup="mouseUp"
      @touchend="mouseUp"
      @mousedown="mouseDown"
      @touchstart="touchStart"
    ></canvas>
    <div id="actions" class="actions">
      <svg
        :id="item"
        :class="{active:index ===toolIndex}"
        v-for="(item,index) in toolNames"
        :key="index"
        @click="chooseTool(item,index)"
      >
        <use v-bind:xlink:href="[`#icon-${item}`]"></use>
      </svg>
    </div>
    <div class="colors">
      <ol class="colors">
        <li
          id="black"
          v-for="(item,index) in colors"
          :key="index"
          :class="[item,{active:index===colorIndex}]"
          @click="chooseColor(item,index)"
        ></li>
      </ol>
    </div>
    <div class="lineSize">
      <ol class="sizes">
        <li
          :id="item"
          :class="item"
          v-for="(item, index) in lineSize"
          :key="index"
          @click="chooseLineSize(item,index)"
        >
          <span class="choose" v-show="index===lineSizeIndex"></span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script type="text/javascript">
import "../svg";
export default {
  name: "Canvas",
  data() {
    return {
      toolNames: ["pen", "eraser", "clear", "save"],
      toolIndex: 0,
      currentTool: "pen",
      colors: ["black", "red", "green", "blue"],
      colorIndex: 0,
      currentColor: "black",
      lineSize: ["thin", "thick"],
      lineSizeIndex: 0,
      lineWidth: 5,
      lastPoint: null,
      newPoint: null,
      canDraw: false,
      eraserUsing: false
    };
  },
  mounted() {
    this.setCanvasSize();
    window.onresize = () => {
      this.setCanvasSize();
    };
  },
  methods: {
    chooseTool(item, index) {
      this.toolIndex = index;
      this.currentTool = item;
      var canvas = document.getElementById("canvas");
      if (item === "clear") {
        var context = canvas.getContext("2d");
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (item === "save") {
        var url = canvas.toDataURL("image/png");
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "我的图片";
        a.click();
      }
    },
    chooseColor(item, index) {
      this.colorIndex = index;
      this.currentColor = item;
    },
    chooseLineSize(item, index) {
      this.lineSizeIndex = index;
      this.lineWidth = (index + 1) * 5;
    },
    mouseDown(e) {
      this.canDraw = true;
      this.eraserUsing = true;
      let x = e.clientX;
      let y = e.clientY;
      this.lastPoint = {
        x: x,
        y: y
      };
    },
    touchStart(e) {
      this.canDraw = true;
      this.eraserUsing = true;
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      this.lastPoint = {
        x: x,
        y: y
      };
    },
    mouseUp() {
      this.canDraw = false;
      this.eraserUsing = false;
      //console.log("mouseUp");
    },
    mouseDraw(e) {
      let x = e.clientX;
      let y = e.clientY;
      this.newPoint = {
        x: x,
        y: y
      };
      if (this.currentTool === "pen" && this.canDraw) {
        this.drawLine(
          this.lastPoint.x,
          this.lastPoint.y,
          this.newPoint.x,
          this.newPoint.y
        );
      }
      if (this.currentTool === "eraser" && this.eraserUsing) {
        this.eraser(this.newPoint.x, this.newPoint.y);
      }
      this.lastPoint = this.newPoint;
    },
    touchDraw(e) {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      this.newPoint = {
        x: x,
        y: y
      };
      if (this.currentTool === "pen" && this.canDraw) {
        this.drawLine(
          this.lastPoint.x,
          this.lastPoint.y,
          this.newPoint.x,
          this.newPoint.y
        );
      }
      if (this.currentTool === "eraser" && this.eraserUsing) {
        this.eraser(this.newPoint.x, this.newPoint.y);
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
      context.beginPath();
      context.strokeStyle = this.currentColor;
      context.moveTo(x1, y1);
      context.lineWidth = this.lineWidth;
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    },
    eraser(x, y) {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      context.beginPath();
      context.clearRect(x - 5, y - 5, 10, 10);
      context.fill();
    }
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  display: block;
}
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
ul,
ol {
  list-style: none;
}
.colors {
  position: fixed;
  top: 70px;
  left: 25px;
  li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px 0;
    border: 2px solid #257;
    transition: all 0.3s;
  }
  & > li.black {
    background: black;
  }
  & > li.red {
    background: red;
  }
  & > li.green {
    background: green;
  }
  & > li.blue {
    background: blue;
  }
  & > li.active {
    transform: scale(1.2);
  }
  & > li.green {
    background: green;
  }
}

.sizes {
  position: fixed;
  left: 25px;
  top: 250px;
  li {
    margin: 20px 0;
    position: relative;
    span {
      display: block;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid red;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  & > .thin {
    height: 0;
    width: 30px;
    border-top: 5px solid black;
  }
  & > .thick {
    height: 0;
    width: 30px;
    border-top: 10px solid black;
  }
}
</style>
