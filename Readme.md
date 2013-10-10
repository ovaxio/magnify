magnify
==========

Image zooming.

## Installation
```
$ component install shallker-wang/magnify
```

## Quick Start
```javascript
var Magnify = require('magnify');
var $ = require('jquery')

$(function () {
  $('.component.magnify').each(function (i, el) {
    var magnify = new Magnify(el);
  }); 
});
```

## API

#### magnify.zoom(Number level)

#### magnify.scale(Number level)


## Test
http://shallker-wang.github.io/magnify/test/index.html   
http://shallker-wang.github.io/magnify/test/sizes.html   
http://shallker-wang.github.io/magnify/test/zoom4.html   


## License

  MIT
