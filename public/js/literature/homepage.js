var socketData = {};
var canvas = null;
var context = null;
var speed = .3;

var items_ = [];

$(function() {
  init();
  animate();

  uncontext.socket_.on('0', function (data) {
    if (socketData.a !== data.a) {
      for (var i = 0; i < data.a; i++) {
        var item = addItem(i, data.a, data.b, data.c, data.e.f / data.e.g);
        items_.push(item);
      }
    }

    socketData = data;
  });
})

function addItem(i, iTotal, size, direction, yOffset) {
  var item = {};
  item.position = [direction ? i/iTotal : 1 - i/iTotal, yOffset];
  item.finalSize = size;
  item.currSize = 0;
  item.start = new Date().getTime() + i * 100;
  item.delay = i;
  return item;
}

function init() {
  canvas = document.getElementById('homepage-canvas');
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  context = canvas.getContext('2d');
  // window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var now = new Date().getTime();

  if (items_.length > 200) {
    items_ = [];
  }

  for (var i = items_.length - 1; i >= 0; i--) {
    var item = items_[i];
    if (item.start < now) {
      if (item.currSize < item.finalSize) {
        item.currSize += speed;
        context.beginPath();
        context.arc(item.position[0] * canvas.width, item.position[1] * canvas.height, item.currSize * 3, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(255, 0, 0, ' + (1 - (item.currSize / item.finalSize)) + ')';
        context.fill();
      } else {
        items_.splice(i, 1);
      }
    }
  }

  requestAnimationFrame( animate );
}