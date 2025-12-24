// MarkDownload - Content Script

(function () {
    // Prevent duplicate injection
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    // Listen for messages from popup or background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "clip") {
            clipPage().then(sendResponse).catch(err => sendResponse({ error: err.message }));
            return true; // Keep channel open for async response
        }
    });

    async function clipPage() {
        try {
            // 1. Parse with Readability
            // We clone the document so we don't modify the live page
            const documentClone = document.cloneNode(true);
            const article = new Readability(documentClone).parse();

            if (!article) {
                throw new Error("Could not parse article content.");
            }

            // 2. Convert to Markdown with Turndown
            const turndownService = new TurndownService({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced'
            });

            // Add GFM tables support if available (plugin script must be loaded)
            if (turndownService.gfm) {
                turndownService.use(turndownService.gfm);
            }

            let markdown = turndownService.turndown(article.content);

            // 3. Add Frontmatter (Optional, simple version for now)
            const date = new Date().toISOString().split('T')[0];
            const frontmatter = `---
title: "${article.title}"
source: ${window.location.href}
date: ${date}
---

# ${article.title}

`;

            return {
                title: article.title,
                markdown: frontmatter + markdown
            };
        } catch (error) {
            console.error("MarkDownload Error:", error);
            throw error;
        }
    }
})();
