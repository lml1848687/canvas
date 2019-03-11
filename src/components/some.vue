<template>
  <div>
    <canvas id="canvas" width="300" height="300"></canvas>

    <!-- <script src="//at.alicdn.com/t/font_655117_r6wu4l8atllhm2t9.js"></script>
    <script src="//apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="index.js"></script>-->
  </div>
</template>

<script>
export default {
  name: "Canvas"
};
methods: {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var lineWidth = 5;
  autoSetCanvasSize(canvas);

  listenToUser(canvas);
  /**************/

  var eraserEnabled = false;
  // pen.onclick =function () {
  //    eraserEnabled = false
  //    pen.classList.add('active')
  //    eraser.classList.remove('active')
  // }

  // eraser.onclick =function () {
  //    eraserEnabled = true
  //    eraser.classList.add('active')
  //    pen.classList.remove('active')
  // }
  /***************/
  //svg 不能使用 addClass
  $("#pen").click(function() {
    eraserEnabled = false;
    $(this)
      .attr("class", "icon active")
      .siblings()
      .attr("class", "icon");
  });

  $("#eraser").click(function() {
    eraserEnabled = true;
    $(this)
      .attr("class", "icon active")
      .siblings()
      .attr("class", "icon");
  });
  // clear.onclick = function(){
  //     context.clearRect(0, 0, canvas.width, canvas.height)
  // }
  $("#clear").click(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  // download.onclick = function(){
  //     var url = canvas.toDataURL()
  //     var a = document.createElement('a')
  //     document.body.appendChild(a)
  //     a.href = url
  //     a.download = '我的画儿'
  //     a.click()
  // }
  $("#download").click(function(event) {
    var url = canvas.toDataURL();
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "我的画儿";
    a.click();
  });
  /*************/

  // black.onclick = function(){
  //     context.fillStyle = 'black'
  //     context.strokeStyle = 'black'
  //     this.classList.add('active')
  //     green.classList.remove('active')
  //     blue.classList.remove('active')
  //     red.classList.remove('active')
  // }
  // red.onclick = function(){
  //     context.fillStyle = 'red'
  //     context.strokeStyle = 'red'
  //     this.classList.add('active')
  //     green.classList.remove('active')
  //     blue.classList.remove('active')
  //     black.classList.remove('active')
  // }
  // green.onclick = function(){
  //     context.fillStyle = 'green'
  //     context.strokeStyle = 'green'
  //     this.classList.add('active')
  //     red.classList.remove('active')
  //     blue.classList.remove('active')
  //     black.classList.remove('active')
  // }
  // blue.onclick = function(){
  //     context.fillStyle = 'blue'
  //     context.strokeStyle = 'blue'
  //     this.classList.add('active')
  //     green.classList.remove('active')
  //     red.classList.remove('active')
  //     black.classList.remove('active')
  // }
  $(".colors").on("click", "li", function() {
    var color = $(this).context.id;
    context.fillStyle = color;
    context.strokeStyle = color;
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  /*****************/
  // thin.onclick = function() {
  //     lineWidth = 5
  // }
  // thick.onclick = function() {
  //     lineWidth = 10
  // }
  $(".sizes").on("click", "li", function() {
    var index = $(this).index();
    if (index === 0) {
      lineWidth = 5;
    } else if (index === 1) {
      lineWidth = 10;
    }
  });
  /*****************/
  function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function() {
      setCanvasSize();
    };

    function setCanvasSize() {
      var pageWidth = document.body.clientWidth;
      var pageHeight = document.body.clientHeight;

      canvas.width = pageWidth;
      canvas.height = pageHeight;
    }
  }

  /***************/
  // function drawCircle(x, y, radius) {
  //     context.beginPath()
  //     context.arc(x, y, redius, Math.PI * 2)
  //     context.fill()
  // }

  function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  function listenToUser(canvas) {
    var using = false;
    var lastPoint = {
      x: undefined,
      y: undefined
    };

    //特性检测
    if (document.body.ontouchstart !== undefined) {
      //触屏设备
      canvas.ontouchstart = function(e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        using = true;

        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          lastPoint = {
            x: x,
            y: y
          };
        }
      };
      canvas.ontouchmove = function(e) {
        //阻止移动端默认下拉事件
        e.preventDefault();
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if (!using) {
          return;
        }
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPoint = {
            x: x,
            y: y
          };
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      };
      canvas.ontouchend = function() {
        using = false;
      };
    } else {
      //非触屏设备
      canvas.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;

        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          lastPoint = {
            x: x,
            y: y
          };
        }
      };

      canvas.onmousemove = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using) {
          return;
        }
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPoint = {
            x: x,
            y: y
          };
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      };
      canvas.onmouseup = function(e) {
        using = false;
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
