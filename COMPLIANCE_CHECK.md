# Chrome Web Store Policy Compliance Check

This document outlines the compliance of the **Web2Markdown Clipper** extension with the Chrome Web Store Developer Program Policies.

## 1. Compliance Checklist

| Requirement | Status | Details |
| :--- | :--- | :--- |
| **Manifest V3** | ✅ Compliant | Uses `manifest_version: 3`. |
| **No Remote Code** | ✅ Compliant | All scripts (`content.js`, `background.js`, `popup.js`, `libs/Readability.js`, `libs/turndown.js`) are bundled locally. No externally hosted code (e.g., CDN links) is used in logic. |
| **Minimal Permissions** | ✅ Compliant | Requests only permissions necessary for core functionality (see Section 2). |
| **User Data Privacy** | ✅ Compliant | Does not collect, transmit, or sell user data. All processing happens locally in the browser. |
| **Single Purpose** | ✅ Compliant | The extension has a single, clear purpose: clipping web pages to Markdown. |

## 2. Permissions Audit

The following permissions are requested in `manifest.json`. You must provide these justifications during the store submission process.

| Permission | Usage Justification |
| :--- | :--- |
| `activeTab` | Access the title and URL of the current tab to generate the Markdown front-matter. |
| `scripting` | Inject `Readability.js` and content scripts into the page to extract content. |
| `storage` | Save user preferences (though currently not heavily used, it is standard for options). |
| `downloads` | Save the generated `.md` file to the user's computer. |
| `contextMenus` | Provide the "right-click to clip" functionality. |
| `clipboardWrite` | Allow the user to copy the Markdown content to their clipboard via the popup button. |

## 3. Privacy Policy Guidance

Even if you do not collect data, you may need to fill out the "Privacy practices" tab.

-   **Do you collect user data?**: No.
-   **Do you use remote servers?**: No.
-   **Certification**: You will certify that you do not sell data, use it for unrelated purposes, or for creditworthiness.

## 4. Next Steps for Developer

1.  **Review the Code**: Ensure you haven't added any analytics scripts or external font loaders that might violate CSP (Content Security Policy). *Current check shows none.*
2.  **Screenshots**: Ensure your store screenshots accurately reflect the functionality.
3.  **Description**: Do not use "keyword stuffing". Describe the extension naturally.

This extension appears to be fully compliant with current policies as of Dec 2025.
