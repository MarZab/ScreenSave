FILENAME="mod_screensave.zip"

build: clean
	@echo "Building $(FILENAME)..."
	@cd "src" && 7za a -tzip "$(FILENAME)" *
	@mv "src/$(FILENAME)" .
	@7za a -tzip "$(FILENAME)" COPYING README.md
	@echo "Build Done!"

clean:
	@rm "$(FILENAME)"
	@echo "Clean Done!"