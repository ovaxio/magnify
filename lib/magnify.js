var jQuery = jQuery || require('jquery');
var Magnifier = require('./magnifier');
var Target = require('./target');
var Zoom = require('./zoom');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Magnify(el) {
  var magnifier, target, zoom;

  var magnify = function () {
    $(el).hover(onMouseenter, onMouseleave);
    $(el).on('mousemove', onMousemove);
    magnifier = new Magnifier($(el).find('.magnifier').get(0));
    target = new Target($(el).find('img.target').get(0));
    zoom = new Zoom(target.bigImg());
    return this;
  }.call(eventy({}));

  (function () {
    target.on('load', function () {});

    magnifier.on('percent-x', function (percentage) {
      zoom.percentX(percentage);
    });

    magnifier.on('percent-y', function (percentage) {
      zoom.percentY(percentage);
    });
  })();

  function onMouseenter(mouseenter) {
    magnifier.show();
    zoom.left(target.pageX() + target.width() + 20);
    zoom.top(target.pageY());
    zoom.targetWidth(target.width());
    zoom.targetHeight(target.height());
    zoom.magnifierWidth(magnifier.elementWidth());
    zoom.magnifierHeight(magnifier.elementHeight());
    zoom.resize();
    zoom.show();
  }

  function onMouseleave(mouseleave) {
    magnifier.hide();
    zoom.hide();
  }

  function getScrollOffsets(w) {

      w = w || window;

      if (w.pageXOffset != null) return {
          x: w.pageXOffset, 
          y:w.pageYOffset
      };

      // For IE (or any browser) in Standards mode
      var d = w.document;
      if (document.compatMode == "CSS1Compat") {
          return {
              x:d.documentElement.scrollLeft, 
              y:d.documentElement.scrollTop
          };
      }

      // For browsers in Quirks mode
      return { 
          x: d.body.scrollLeft, 
          y: d.body.scrollTop 
      }; 
  }
  function onMousemove(mousemove) {
    //alert(mousemove.pageX)
    //var obj = el.getBoundingClientRect();
    var obj = $(el).offset()

    el.pageX = obj.left + getScrollOffsets().x;
    el.pageY = obj.top + getScrollOffsets().y;

    var offsetX = mousemove.pageX - el.pageX;
    var offsetY = mousemove.pageY - el.pageY;
    var percentX = offsetX / magnify.width() * 100;
    var percentY = offsetY / magnify.height() * 100;

    //alert(offsetX)
    magnifier.offsetX(offsetX);
    magnifier.offsetY(offsetY);
    //magnifier.offsetX(200);
    //magnifier.offsetY(200);
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
