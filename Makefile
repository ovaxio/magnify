build/build.js: components index.js lib/*.js css/*.css
	@component build
	@echo build/build.js
	@echo build/build.css

force:
	@component build
	@echo build/build.js
	@echo build/build.css

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean force
