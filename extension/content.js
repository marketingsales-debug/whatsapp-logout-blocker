// content.js for WhatsApp Logout Blocker

function log(message) {
    console.log(`[WhatsApp Logout Blocker] ${new Date().toLocaleTimeString()}: ${message}`);
}

// Function to ensure "Keep me signed in" is checked on the login page
function checkKeepMeSignedIn() {
    const checkbox = document.querySelector('input[name="remember-me"]');
    if (checkbox && !checkbox.checked) {
        log("Ensuring 'Keep me signed in' is checked.");
        checkbox.click();
    }
}

// Function to simulate activity to prevent timeout
function simulateActivity() {
    log("Sending heartbeat/simulating activity...");
    
    // Simulate a mouse move event that shouldn't affect UI but keeps the tab "active"
    const event = new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight
    });
    document.dispatchEvent(event);

    // Additionally, we can ping the background script to let it know we are alive
    chrome.runtime.sendMessage({ type: "HEARTBEAT" });
}

// Initialize
function init() {
    log("Extension content script loaded.");
    
    // Check for login checkbox periodically
    setInterval(checkKeepMeSignedIn, 5000);
    
    // Send heartbeat every 5 minutes to keep the session active
    setInterval(simulateActivity, 5 * 60 * 1000);
    
    // Also run immediately
    checkKeepMeSignedIn();
    simulateActivity();
}

// Watch for DOM changes to catch the login screen if it appears later
const observer = new MutationObserver((mutations) => {
    checkKeepMeSignedIn();
});

observer.observe(document.body, { childList: true, subtree: true });

init();
