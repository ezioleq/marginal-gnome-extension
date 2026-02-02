NAME=marginal
DOMAIN=ezioleq.com

.PHONY: all pack install clean

all: dist/extension.js

node_modules/.package-lock.json: package.json
	npm install

dist/extension.js dist/prefs.js: node_modules/.package-lock.json *.ts
	npm run build

$(NAME).zip: dist/extension.js dist/prefs.js
	@cp metadata.json dist/
	@(cd dist && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	gnome-extensions install --force $(NAME).zip

clean:
	@rm -rf dist node_modules $(NAME).zip