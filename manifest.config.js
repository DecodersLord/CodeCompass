import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
    manifest_version: 3,
    name: "CodeCompass",
    version: "0.0.1",
    description: "CodeCompass",
    content_scripts: [
        {
            matches: ["https://leetcode.com/problems/*"],
            js: ["src/content.js"],
        },
    ],
    action: {
        default_popup: "index.html",
        default_title: "CodeCompass",
    },
    side_panel: {
        default_path: "index.html",
    },
    background: {
        service_worker: "src/background.js",
    },
    permissions: ["tabs", "activeTab", "scripting", "storage", "sidePanel"],
});
