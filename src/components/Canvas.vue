<template>
  <div>
    <canvas id="canvas" @mousemove="draw" @mouseup="mouseUp" @mousedown="mouseDown"></canvas>
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
          id="thin"
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
      currentTool: null,
      colors: ["black", "red", "green", "blue"],
      colorIndex: 0,
      currentColor: null,
      lineSize: ["thin", "thick"],
      lineSizeIndex: 0,
      currentLineSize: null,
      lastPoint: null,
      newPoint: null,
      startDraw: false
    };
  },
  mounted() {
    this.setCanvasSize();
  },
  methods: {
    chooseTool(item, index) {
      if (index < 2) {
        this.toolIndex = index;
      }
      this.currentTool = item;
    },
    chooseColor(item, index) {
      this.colorIndex = index;
      this.currentColor = item;
    },
    chooseLineSize(item, index) {
      this.lineSizeIndex = index;
      this.currentLineSize = item;
    },
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
  left: 28px;
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
