var jQuery = jQuery || require('jquery');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Target(img) {
  var target = function () {
    $(img).on('load', onLoad);
    if (img.complete) this.trigger('load');
    return this;
  }.call(eventy({}));

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
    return rect.left + window.pageXOffset;
  }

  target.pageY = function () {
    var rect = img.getBoundingClientRect();
    return rect.top + window.pageYOffset;
  }

  return target;
}
