document.addEventListener('DOMContentLoaded', async () => {
    const titleInput = document.getElementById('title');
    const textarea = document.getElementById('markdown-content');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const statusDiv = document.getElementById('status');

    // Helper to show status
    const showStatus = (msg, type = 'info') => {
        statusDiv.textContent = msg;
        statusDiv.style.color = type === 'error' ? 'red' : '#666';
        setTimeout(() => statusDiv.textContent = '', 3000);
    };

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
        // Function to try sending message
        const sendMessage = () => {
            chrome.tabs.sendMessage(tab.id, { action: "clip" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log("Message failed. Error: ", chrome.runtime.lastError.message);

                    // If receiving end does not exist, script might not be injected.
                    // Try to inject script dynamically.
                    if (chrome.runtime.lastError.message.includes("Receiving end does not exist")) {
                        showStatus('Injecting scripts...', 'info');
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            files: ['libs/Readability.js', 'libs/turndown.js', 'content.js']
                        }, () => {
                            if (chrome.runtime.lastError) {
                                showStatus('Error: Cannot script this page (e.g. Chrome Web Store).', 'error');
                                textarea.value = `Error: ${chrome.runtime.lastError.message}`;
                            } else {
                                // Retry sending message
                                setTimeout(() => {
                                    chrome.tabs.sendMessage(tab.id, { action: "clip" }, (response) => {
                                        if (chrome.runtime.lastError) {
                                            showStatus('Error: Still failed after injection.', 'error');
                                            textarea.value = `Error: ${chrome.runtime.lastError.message}`;
                                        } else {
                                            handleResponse(response);
                                        }
                                    });
                                }, 500); // Wait a bit for script to initialize
                            }
                        });
                        return;
                    }

                    showStatus('Error: Could not clip page. Reload and try again.', 'error');
                    textarea.value = `Error: ${chrome.runtime.lastError.message}`;
                    return;
                }
                handleResponse(response);
            });
        };

        const handleResponse = (response) => {
            if (response && response.markdown) {
                titleInput.value = response.title || tab.title;
                textarea.value = response.markdown;
                showStatus(''); // Clear status
            } else if (response && response.error) {
                showStatus(response.error, 'error');
            }
        };

        try {
            sendMessage();
        } catch (e) {
            showStatus('Unexpected error.', 'error');
        }
    }

    // Copy Handler
    copyBtn.addEventListener('click', () => {
        textarea.select();
        document.execCommand('copy');
        showStatus('Copied to clipboard!');
    });

    // Download Handler
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
