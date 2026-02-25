# 🚀 GX Upload Helper for Brave & Edge

A browser extension that replicates the iconic **"Easy Files"** feature from Opera GX for Chromium-based browsers like Brave and Edge. This tool streamlines the file upload process by prioritizing your most recent content: the clipboard.



## ✨ Key Features
- **Clipboard Preview:** Automatically detects and displays images from your clipboard the moment you click an "Upload" button on any website.
- **Ctrl+V Support:** A "Hardened" paste fallback designed specifically to bypass Brave's strict privacy shields when automatic API access is restricted.
- **Privacy-First Design:** Operates entirely within the browser's security sandbox, requiring explicit user gestures for all data interactions.

## 🛠 Installation (Developer Mode)
1. Download or clone this repository to your local machine.
2. Open your browser and navigate to `brave://extensions` (Brave) or `edge://extensions` (Edge).
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing the extension files.

## ⚠️ Important for Brave/Edge Users
Due to high-security defaults in these browsers, please follow these steps for the best experience:
1. **Refresh Your Tabs:** After updating the extension, you **must refresh** any open tabs (e.g., Facebook) to reconnect the content scripts.
2. **Configure Brave Shields:** If the clipboard fails to load, click the **Brave Shield (Lion icon)** in the address bar and set **Fingerprinting Protection** to **Disabled** for that site.
3. **Check Permissions:** Ensure "Clipboard" access is set to **Allow** in the browser's Site Settings.

## 🔒 Security & Technical Notes
This project demonstrates an understanding of the Chromium security model:
- **Sandboxing:** The extension cannot execute local files or access the file system directly without user interaction.
- **Context Management:** Handles the common `TypeError` and `ReferenceError` issues associated with extension context invalidation during updates.
- **Event Interception:** Uses event capture to block default browser behavior and inject a custom UI into the DOM.

## 🖼 Preview
