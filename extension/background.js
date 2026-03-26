// background.js for WhatsApp Logout Blocker

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "HEARTBEAT") {
        const tabId = sender.tab.id;
        console.log(`[Background] Heartbeat received from tab ${tabId}`);
        
        // We can use this to keep the tab "awake" if needed by updating its state
        // or just to monitor that the script is still running.
        chrome.storage.local.set({ lastHeartbeat: Date.now(), activeTabId: tabId });
    }
});

// Periodic check to see if we need to do anything globally
chrome.alarms.create("keepAlive", { periodInMinutes: 1 });

function extendWhatsAppCookies() {
    chrome.cookies.getAll({ domain: "whatsapp.com" }, (cookies) => {
        const oneYearFromNow = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60);
        cookies.forEach(cookie => {
            if (!cookie.session) {
                // Construct a valid URL for the cookie based on its domain
                let url = "https://" + (cookie.domain.startsWith('.') ? cookie.domain.substring(1) : cookie.domain) + cookie.path;
                
                chrome.cookies.set({
                    url: url,
                    name: cookie.name,
                    value: cookie.value,
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    sameSite: cookie.sameSite,
                    storeId: cookie.storeId,
                    expirationDate: oneYearFromNow
                });
            }
        });
        console.log(`[Background] Extended expiration for ${cookies.length} WhatsApp cookies.`);
    });
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepAlive") {
        extendWhatsAppCookies();
        
        chrome.storage.local.get(["activeTabId", "lastHeartbeat"], (data) => {
            if (data.activeTabId && data.lastHeartbeat) {
                const diff = Date.now() - data.lastHeartbeat;
                console.log(`[Background] Last heartbeat was ${Math.round(diff / 1000)}s ago`);
            }
        });
    }
});
