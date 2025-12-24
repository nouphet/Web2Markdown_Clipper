
# Chrome Extension Packaging Makefile

FILES = manifest.json background.js content.js popup icons libs README.md README.ja.md PUBLISHING.md COMPLIANCE_CHECK.md
OUTPUT = Web2Markdown_Clipper.zip

.PHONY: zip clean

zip:
	tar -a -c -f $(OUTPUT) $(FILES)

clean:
	rm -f $(OUTPUT)
