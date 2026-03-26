# WhatsApp Logout Blocker (Chrome Extension)

A lightweight Google Chrome extension designed to prevent WhatsApp Web from logging out automatically due to inactivity or expired sessions.

## Features
* **Automatic "Keep me signed in"**: Automatically checks the "Keep me signed in" box on the login screen so you don't have to remember.
* **Cookie Preservation**: Scans WhatsApp authentication cookies and continually pushes their expiration dates one year into the future, preventing natural timeout logouts.
* **Session Pulse**: Simulates a minor background activity event every 5 minutes to keep your tab active and prevent Chrome from suspending it.
* **Status Monitoring**: Includes a clean, simple popup UI to check the status of the background service and see the time of the last successful heartbeat pulse.

## How to Install (Developer Mode)

To install this extension directly from the source code into Chrome:

1. Clone or download this repository to your computer.
2. Open Google Chrome.
3. In the address bar, type `chrome://extensions/` and press Enter.
4. Turn on the **Developer mode** switch in the top right corner.
5. Click the **Load unpacked** button that appears in the top left.
6. Select the `extension/` folder located inside the repository you just downloaded.
7. The **WhatsApp Logout Blocker** extension will now appear in your list of extensions. Ensure the toggle is switched **ON**.
8. Go to [web.whatsapp.com](https://web.whatsapp.com) and log in.

*Tip: You can pin the extension to your Chrome toolbar to easily check the heartbeat status!*

## Files Overview
* `manifest.json`: The Manifest V3 configuration file.
* `background.js`: A background service worker that monitors the state and extends cookie expirations.
* `content.js`: The script injected into the WhatsApp Web page to simulate activity.
* `popup.html` / `popup.js`: The UI components for the extension.

## Permissions Required
This extension uses standard Manifest V3 APIs and requires the following permissions:
* `tabs` & `activeTab`: To monitor the active state of WhatsApp.
* `storage`: To store the timestamp of the last successful heartbeat.
* `alarms`: To run periodic background tasks (cookie extension and pulse checks).
* `scripting`: To execute the keep-alive scripts.
* `cookies`: To extend the expiration date of WhatsApp authentication cookies.
