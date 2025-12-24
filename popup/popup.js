document.addEventListener('DOMContentLoaded', async () => {
    const titleInput = document.getElementById('title');
    const textarea = document.getElementById('markdown-content');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const statusDiv = document.getElementById('status');

    const showStatus = (msg, type = 'info') => {
        statusDiv.textContent = msg;
        statusDiv.style.color = type === 'error' ? 'red' : '#666';
        if (type !== 'error') setTimeout(() => statusDiv.textContent = '', 3000);
    };

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
        // Skip restricted URLs
        if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) {
            showStatus("Cannot clip this page.", "error");
            return;
        }

        try {
            // Inject scripts first
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['libs/Readability.js', 'libs/turndown.js', 'content.js']
            });

            // Send message
            chrome.tabs.sendMessage(tab.id, { action: "clip" }, (response) => {
                if (chrome.runtime.lastError) {
                    showStatus("Error: " + chrome.runtime.lastError.message, "error");
                    return;
                }

                if (response && response.markdown) {
                    titleInput.value = response.title || tab.title;
                    textarea.value = response.markdown;
                    showStatus('');
                } else if (response && response.error) {
                    showStatus(response.error, 'error');
                }
            });

        } catch (err) {
            console.error(err);
            showStatus('Detailed Error: ' + err.message, 'error');
        }
    }

    copyBtn.addEventListener('click', () => {
        textarea.select();
        document.execCommand('copy');
        showStatus('Copied to clipboard!');
    });

    downloadBtn.addEventListener('click', () => {
        const filename = (titleInput.value || 'clipping').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.md';
        const blob = new Blob([textarea.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: filename,
            saveAs: true
        });
    });
});
