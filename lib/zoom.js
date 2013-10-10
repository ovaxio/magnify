var jQuery = jQuery || require('jquery');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Zoom(el) {
  var img;
  var target = {
    width: 0,
    height: 0
  }
  var magnifier = {
    width: 0,
    height: 0
  }

  var zoom = function () {
    img = $(el).find('img.big').get(0);
    return this;
  }.call(eventy({}));

  zoom.level = 2;
  zoom.scale = 2;

  zoom.percentX = function (percentage) {
    var imgWidth = $(img).width();
    var maxLeft = imgWidth - zoom.width();

    $(img).css('left', '-' + percentage / 100 * maxLeft);
  }

  zoom.percentY = function (percentage) {
    var imgHeight = $(img).height();
    var maxTop = imgHeight - zoom.height();

    $(img).css('top', '-' + percentage / 100 * maxTop);
  }

  zoom.targetWidth = function (width) {
    target.width = width;
    return this.resize();
  }

  zoom.targetHeight = function (height) {
    target.height = height;
    return this.resize();
  }

  zoom.magnifierWidth = function (width) {
    magnifier.width = width;
    return this.resize();
  }

  zoom.magnifierHeight = function (height) {
    magnifier.height = height;
    return this.resize();
  }

  zoom.width = function (value) {
    if (value) return $(el).width(value);
    else return el.clientWidth;
  }

  zoom.height = function (value) {
    if (value) return $(el).height(value);
    else return el.clientHeight;
  }

  zoom.resize = function () {
    $(img).width(target.width * this.level);
    $(img).height(target.height * this.level);
    this.width(magnifier.width * this.scale);
    this.height(magnifier.height * this.scale);
  }

  return zoom;
}