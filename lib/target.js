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

  target.width = function () {
    return img.clientWidth;
  }

  target.height = function () {
    return img.clientHeight;
  }

  return target;
}