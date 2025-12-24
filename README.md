# Web2Markdown Clipper

A Chrome extension that clips websites and downloads them as readable Markdown files. This project aims to replicate the functionality of the "MarkDownload" extension while adhering to the latest Chrome Extension Manifest V3 best practices.

## Features

## Background & Acknowledgements

This project was inspired by the excellent [MarkDownload - Markdown Web Clipper](https://chromewebstore.google.com/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi). Unfortunately, the original extension is currently unavailable as it states: *"This extension is no longer available because it does not follow best practices for Chrome extensions."*

We developed **Web2Markdown Clipper** to restore this valuable functionality for the community. We have rebuilt it from scratch to be fully compliant with modern **Manifest V3** standards and Chrome's latest best practices.

We are deeply grateful to the original developers of MarkDownload for their pioneering work and concepts.

### Core Functionality
- **Web Clipping**: Extracts the main content of a web page, removing clutter (ads, sidebars) using [Readability.js](https://github.com/mozilla/readability).
- **Markdown Conversion**: Converts the extracted HTML content into Markdown format using [Turndown](https://github.com/mixmark-io/turndown).
- **Preview & Edit**: A popup window displays the rendered Markdown, allowing for minor edits or copying to clipboard before downloading.
- **Download**: Save the content as an `.md` file.

### Advanced Features
- **Selection Clipping**: Download or copy only the text selected on the page.
- **Context Menus**: Right-click on pages, images, links, or selections to copy/download Markdown snippets.
- **Batch Processing**: "Download All Tabs" functionality to clip multiple open pages at once.
- **Obsidian Integration**: Supports integration with Obsidian via the "Advanced Obsidian URI" plugin to bypass URL character limits.
- **Customizable Templates**: Key front-matter and content templates (titles, dates, URL source).

### Technology Stack
- **Manifest V3**: Compliant with modern Chrome extension security and performance standards.
- **Readability.js**: For article extraction.
- **Turndown**: For HTML to Markdown conversion.
- **Service Workers**: Logic handling for background tasks (context menus, batch downloads).

## Recommended Sites for Testing

To verify the functionality of the clipper, we recommend testing on the following types of websites which have structured content:

- **Wikipedia**: Great for testing complex formatting, tables, and references.
- **MDN Web Docs**: Excellent for testing code blocks and technical documentation.
- **Dev.to / Medium**: Good for testing blog post extraction and image handling.
- **GitHub READMEs**: Useful to see how it handles existing Markdown-like structures.

## Packaging for Chrome Web Store

To create a valid zip file for the Chrome Web Store submission, you can use the provided Makefile (if `make` is installed) or run the PowerShell command directly.

### Using Make
```bash
make clean zip
```

### Using PowerShell
```powershell
Compress-Archive -Path manifest.json, background.js, content.js, popup, icons, libs, README.md, README.ja.md, PUBLISHING.md, COMPLIANCE_CHECK.md -DestinationPath Web2Markdown_Clipper.zip -Force
```
