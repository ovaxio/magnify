build/build.js: components index.js lib/*.js css/*.css tpl/zoom-view.js
	@component build
	@echo build/build.js
	@echo build/build.css

force:
	@component build
	@echo build/build.js
	@echo build/build.css

tpl/zoom-view.js: tpl/src/zoom-view.jade
	@jade --out tpl/ -P tpl/src/zoom-view.jade
	@component convert tpl/zoom-view.html

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean force
