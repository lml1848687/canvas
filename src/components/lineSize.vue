<template>
  <div class="lineSize">
    <ol class="sizes">
      <li
        id="thin"
        :class="item"
        @click="chooseLine(index)"
        v-for="(item, index) in size"
        :key="index"
      >
        <span :class="choose" v-show="index===lineIndex"></span>
      </li>
    </ol>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "LineSize",
  data() {
    return {
      size: ["thin", "thick"],
      lineIndex: 0
    };
  },
  methods: {
    chooseLine(index) {
      this.lineIndex = index;
    }
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
