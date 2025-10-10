// src/background.js
console.log("Code Compass background worker loaded");

// Enable side panel to open when clicking the action icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error("Side panel behavior error:", error));
