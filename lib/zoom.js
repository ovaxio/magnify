var jQuery = jQuery || require('jquery');
var tpl = require('../tpl/zoom-view');
var eventy = require('eventy');
var $ = jQuery;

module.exports = function Zoom(bigImg) {
  var el, img;

  var target = {
    width: 0,
    height: 0
  }

  var magnifier = {
    width: 0,
    height: 0
  }

  var zoom = function () {
    var view = $(tpl).appendTo('body');
    el = $(view).find('.zoom-view').get(0);
    img = $(el).find('img.big').get(0);
    $(img).attr('src', bigImg);
    return this;
  }.call(eventy({}));

  zoom.level = 2;
  zoom.scale = 2;

  zoom.percentX = function (percentage) {
    var imgWidth = $(img).width();
    var maxLeft = imgWidth - zoom.width();

    $(img).css('left', '-' + percentage / 100 * maxLeft + 'px');
  }

  zoom.percentY = function (percentage) {
    var imgHeight = $(img).height();
    var maxTop = imgHeight - zoom.height();

    $(img).css('top', '-' + percentage / 100 * maxTop + 'px');
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
    $(img).css('maxWidth', target.width * this.level);
    $(img).css('maxHeight', target.height * this.level);
    this.width(magnifier.width * this.scale);
    this.height(magnifier.height * this.scale);
  }

  zoom.left = function (left) {
    $(el).css('left', left);
  }

  zoom.top = function (top) {
    $(el).css('top', top);
  }

  zoom.show = function () {
    $(el).addClass('active');
  }

  zoom.hide = function () {
    $(el).removeClass('active');
  }

  return zoom;
}