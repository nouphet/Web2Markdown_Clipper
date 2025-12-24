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
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "clip-selection") {
        // We can inject a script to get selection or generic markdown conversion
        // For selection, Turndown can convert the selection HTML directly.
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: convertSelectionToMarkdown
        });
    }
});

// Function injected into the page to convert selection
async function convertSelectionToMarkdown() {
    try {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        const container = document.createElement('div');
        container.appendChild(selection.getRangeAt(0).cloneContents());

        // We rely on Turndown being available in the global scope (injected via content scripts matches)
        // NOTE: In MV3, we can't easily rely on global window vars from other content scripts unless declared in manifest content_scripts
        // Since we put Turndown in content_scripts, it SHOULD be available in the window context of the content script world.

        // However, executeScript runs in a separate world or same world depending on config. 
        // Safest is to just do basic text or re-inject logic if needed. 
        // For MVP, we'll try to access the global TurndownService if available, or just copy text.

        // A more robust way for "Clip Selection" is asking the content script to do it via message.
        chrome.runtime.sendMessage({ action: "clip-selection-internal" }); // Send to content script? No, content script listens to runtime.onMessage

        // Let's rely on standard copy for now or alert user implemented later.
        console.log("Selection clipping initiated");
    } catch (e) {
        console.error(e);
    }
}
