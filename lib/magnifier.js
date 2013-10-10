var jQuery = jQuery || require('jquery');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Magnifier(el) {
  var magnifier = function () {

    el.onload = onLoad;
    return this;
  }.call(eventy({}));

  function onLoad() {}

  function parentWidth() {
    return $(el).parent().width();
  }

  function parentHeight() {
    return $(el).parent().height();
  }

  function cssTop(pixels) {
    $(el).css('top', pixels);
  }

  function cssLeft(pixels) {
    $(el).css('left', pixels);
  }

  magnifier.elementWidth = function () {
    var elementWidth;

    if ($(el).css('display') === 'none') {
      $(el).css('display', 'block');
      elementWidth = this.width();
      $(el).css('display', '');
    } else {
      elementWidth = this.width();
    }

    return elementWidth;
  }

  magnifier.elementHeight = function () {
    var elementHeight;

    if ($(el).css('display') === 'none') {
      $(el).css('display', 'block');
      elementHeight = this.height();
      $(el).css('display', '');
    } else {
      elementHeight = this.height();
    }

    return elementHeight;
  }

  magnifier.width = function () {
    return el.clientWidth;
  }

  magnifier.height = function () {
    return el.clientHeight;
  }

  magnifier.offsetX = function (distance) {
    var left = distance - this.width() / 2;
    var maxLeft = parentWidth() - this.width();

    if (left < 0) left = 0;
    if (left > maxLeft) left = maxLeft;
    this.trigger('percent-x', left / maxLeft * 100);
    cssLeft(left);
  }

  magnifier.offsetY = function (distance) {
    var top = distance - this.height() / 2;
    var maxTop = parentHeight() - this.height();

    if (top < 0) top = 0;
    if (top > maxTop) top = maxTop;
    this.trigger('percent-y', top / maxTop * 100);
    cssTop(top);
  }

  return magnifier;
}
