var jQuery = jQuery || require('jquery');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Target(img) {
  var target = function () {
    $(img).on('load', onLoad);
    if (img.complete) this.trigger('load');
    return this;
  }.call(eventy({}));

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

  function onLoad() {
    target.trigger('load');
  }

  target.bigImg = function () {
    return $(img).attr('big');
  }

  target.width = function () {
    return img.clientWidth;
  }

  target.height = function () {
    return img.clientHeight;
  }

  target.pageX = function () {
    var rect = img.getBoundingClientRect();
    return rect.left + getScrollOffsets().x;
  }

  target.pageY = function () {
    var rect = img.getBoundingClientRect();
    return rect.top + getScrollOffsets().y;
  }

  return target;
}
