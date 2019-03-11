<template>
  <div class="colors">
    <ol class="colors">
      <li
        id="black"
        v-for="(item,index) in colors"
        :key="index"
        :class="[item,{active: index===colorIndex}]"
        @click="chooseColor(index)"
      ></li>
    </ol>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Colors",
  data() {
    return {
      colors: ["black", "red", "green", "blue"],
      colorIndex: 0
    };
  },
  methods: {
    chooseColor(index) {
      this.colorIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
