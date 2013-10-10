var jQuery = jQuery || require('jquery');
var Magnifier = require('./magnifier');
var Target = require('./target');
var Zoom = require('./zoom');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Magnify(el) {
  var magnifier, target, zoom;

  var magnify = function () {
    el.onmousemove = onMousemove
    $(el).hover(onMouseenter, onMouseleave);
    // el.addEventListener('mousemove', onMousemove, true)
    // $(el).on('mousemove', onMousemove);
    magnifier = new Magnifier($(el).find('.magnifier').get(0));
    target = new Target($(el).find('img.target').get(0));
    zoom = new Zoom(target.bigImg());

    target.on('load', function () {
      zoom.targetWidth(target.width());
      zoom.targetHeight(target.height());
    });

    return this;
  }.call(eventy({}));

  (function () {
    zoom.magnifierWidth(magnifier.elementWidth());
    zoom.magnifierHeight(magnifier.elementHeight());

    magnify.on('offset-x', function (distance) {
      magnifier.offsetX(distance);
    });

    magnify.on('offset-y', function (distance) {
      magnifier.offsetY(distance);
    });

    magnifier.on('percent-x', function (percentage) {
      zoom.percentX(percentage);
    });

    magnifier.on('percent-y', function (percentage) {
      zoom.percentY(percentage);
    });
  })();

  function onMouseenter(mouseenter) {
    zoom.left(target.pageX() + target.width() + 20);
    zoom.top(target.pageY());
    zoom.show();
  }

  function onMouseleave(mouseleave) {
    zoom.hide();
  }

  function onMousemove(mousemove) {
    // console.log('pageY', mousemove.pageY)
    // console.log('clientY', mousemove.clientY)
    // console.log('screenY', mousemove.screenY)
    // console.log('offsetY', mousemove.offsetY)
    var obj = el.getBoundingClientRect();

    el.pageX = obj.left + window.pageXOffset;
    el.pageY = obj.top + window.pageYOffset;

    var offsetX = mousemove.pageX - el.pageX;
    var offsetY = mousemove.pageY - el.pageY;
    var percentX = offsetX / magnify.width() * 100;
    var percentY = offsetY / magnify.height() * 100;

    magnify.trigger('offset-x', offsetX)
    magnify.trigger('offset-y', offsetY)
    magnify.trigger('percent-x', percentX)
    magnify.trigger('percent-y', percentY)

    // console.log("percentX", percentX)
    // console.log("percentY", percentY)
  }

  magnify.width = function () {
    return el.clientWidth;
  }

  magnify.height = function () {
    return el.clientHeight;
  }

  magnify.zoom = function (level) {
    zoom.level = level;
    zoom.resize();
  }

  magnify.scale = function (level) {
    zoom.scale = level;
    zoom.resize();
  }

  return magnify;
}
