// MarkDownload - Background Script

// Create Context Menus
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "clip-selection",
        title: "Clip Selection as Markdown",
        contexts: ["selection"]
    });
});

// Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "clip-selection") {
        // Inject scripts first to ensure Turndown and content logic are available
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['libs/Readability.js', 'libs/turndown.js', 'content.js']
            });

            // Now execute the conversion
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: convertSelectionToMarkdown
            });
        } catch (err) {
            console.error("Script injection failed", err);
        }
    }
});

// Function injected into the page to convert selection
async function convertSelectionToMarkdown() {
    try {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            alert("No text selected!");
            return;
        }

        const container = document.createElement('div');
        container.appendChild(selection.getRangeAt(0).cloneContents());

        // TurndownService is now available because we injected libs/turndown.js
        // We can access it from the window scope if it attached there, or if we want to be safe,
        // we can use the logic from content.js if we send a message.
        // But since we are in a func injection, we are in the same world.

        let markdown = "";
        if (typeof TurndownService !== 'undefined') {
            const turndownService = new TurndownService({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced'
            });
            markdown = turndownService.turndown(container.innerHTML);
        } else {
            // Fallback if turndown fails to load for some reason
            markdown = container.innerText;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(markdown).then(() => {
            // Optional: Provide visual feedback?
            console.log("Markdown copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy", err);
        });

    } catch (e) {
        console.error(e);
    }
}
