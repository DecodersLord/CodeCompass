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
    icons: {
        16: "public/CodeCompass - 16x16.png",
        24: "public/CodeCompass - 24x24.png",
        32: "public/CodeCompass - 32x32.png",
        48: "public/CodeCompass - 48x48.png",
        64: "public/CodeCompass - 64x64.png",
        128: "public/CodeCompass - 128x128.png",
        256: "public/CodeCompass - 256x256.png",
    },
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
