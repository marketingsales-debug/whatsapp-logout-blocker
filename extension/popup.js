// popup.js for WhatsApp Logout Blocker

function updateStatus() {
    chrome.storage.local.get(["lastHeartbeat"], (data) => {
        if (data.lastHeartbeat) {
            const lastPulse = new Date(data.lastHeartbeat).toLocaleTimeString();
            document.getElementById("lastPulse").innerText = lastPulse;
            document.getElementById("serviceStatus").innerText = "Running";
            document.getElementById("serviceStatus").className = "status-value active";
        } else {
            document.getElementById("lastPulse").innerText = "Waiting for page...";
        }
    });
}

// Update UI every second
setInterval(updateStatus, 1000);
updateStatus();
