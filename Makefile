VERSION=`grep "<version>" $(PWD)/src/mod_screensave.xml | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="mod_screensave-$(VERSION).zip"

build: clean
	@echo "Building $(FILENAME)..."
	@cd "src" && 7za a -tzip "$(FILENAME)" *
	@mv "src/$(FILENAME)" .
	@7za a -tzip "$(FILENAME)" LICENSE.txt README.md
	@echo "Build Done!"

clean:
	@rm "$(FILENAME)"
	@echo "Clean Done!"