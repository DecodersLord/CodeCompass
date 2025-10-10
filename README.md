# 🧭 Code Compass

An AI-powered Chrome extension that helps you solve LeetCode problems without giving away the solution. Get hints, summaries, and conceptual guidance while you learn!

## ✨ Features

-   **📝 Problem Summaries**: Get concise, bullet-pointed summaries of LeetCode problems
-   **💡 Smart Hints**: Request hints that guide your thinking without revealing the solution
-   **🎯 Socratic Learning**: AI asks questions to help you discover the solution yourself
-   **⚡ Typewriter Effect**: Beautiful animated responses that appear character-by-character
-   **💬 Conversation History**: All interactions persist during your session
-   **🎨 Clean UI**: Modern side panel interface with color-coded message types

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   Chrome browser (v121 or higher)
-   Chrome AI APIs enabled (see setup below)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/codecompass.git
    cd codecompass
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build the extension**

    ```bash
    npm run build
    ```

4. **Load in Chrome**
    - Open Chrome and navigate to `chrome://extensions`
    - Enable "Developer mode" (toggle in top-right)
    - Click "Load unpacked"
    - Select the `dist` folder from the project directory

### Enable Chrome AI APIs

Code Compass uses Chrome's built-in AI capabilities. Enable them by:

1. Navigate to `chrome://flags`
2. Search for and enable:
    - `#optimization-guide-on-device-model` → **Enabled**
    - `#prompt-api-for-gemini-nano` → **Enabled**
    - `#summarization-api-for-gemini-nano` → **Enabled**
3. Restart Chrome
4. The first time you use the extension, Chrome will download the AI model (~1.5GB)

## 📖 Usage

1. **Navigate to a LeetCode problem**

    ```
    https://leetcode.com/problems/two-sum/
    ```

2. **Click the Code Compass extension icon**

    - The side panel will open on the right

3. **Ask for help**
    - Type "Summarize" to get a problem summary
    - Type "Generate a Hints" to get conceptual hints
    - Type custom questions for future features

### Development Workflow

**For UI development:**

```bash
npm run dev
```

View at `http://localhost:5173` with mock Chrome APIs

**For extension testing:**

```bash
npm run build -- --watch
```

Then reload the extension in Chrome after changes

### Key Technologies

-   **React 18** - UI framework
-   **Vite** - Build tool
-   **@crxjs/vite-plugin** - Chrome extension bundler
-   **Tailwind CSS** - Styling
-   **DaisyUI** - UI components
-   **Chrome AI APIs** - On-device AI (Gemini Nano)

## 🔧 Configuration

### Allowed Origins

By default, Code Compass only works on LeetCode problem pages. Modify in `App.jsx`:

```javascript
const allowedOrigins = ["https://leetcode.com/problems/"];
```

## 📝 Scripts

| Command                    | Description                               |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Start Vite dev server (UI development)    |
| `npm run build`            | Build production extension                |
| `npm run build -- --watch` | Build in watch mode (recommended for dev) |
| `npm run preview`          | Preview production build                  |

## 🐛 Troubleshooting

### "Could not establish connection" error

**Solution:** Reload the LeetCode page after installing/updating the extension

### "Summarizer API not available"

**Solution:**

1. Enable Chrome AI flags (see Enable Chrome AI APIs section)
2. Restart Chrome
3. Wait for model download on first use

### Extension not loading

**Solution:**

1. Run `npm run build`
2. Go to `chrome://extensions`
3. Click the refresh icon on Code Compass
4. Reload the LeetCode page

### Side panel not opening

**Solution:**

1. Make sure you're on a LeetCode problem page (`/problems/*`)
2. Check that the extension is enabled
3. Try clicking the extension icon again

## 🚧 Roadmap

-   [ ] **Similar Problems**: Find related problems to practice
-   [ ] **Custom Prompts**: Ask any question about the problem
-   [ ] **Difficulty Analysis**: Understand what makes a problem hard
-   [ ] **Pattern Recognition**: Learn common problem-solving patterns
-   [ ] **Code Review**: Get feedback on your approach (no solutions!)
-   [ ] **Multi-language Support**: Summaries in your preferred language
-   [ ] **Dark Mode**: Eye-friendly dark theme
-   [ ] **Export Chat**: Save conversations for later review

## 🙏 Acknowledgments

-   Built with [Chrome's Built-in AI APIs](https://developer.chrome.com/docs/ai/built-in)
-   Inspired by the need for better learning tools on coding platforms
-   Thanks to the LeetCode community for problem-solving inspiration

---

**⚠️ Important Note**: Code Compass is designed to help you **learn**, not to provide solutions. It follows the Socratic method - guiding you to discover answers yourself. If you're looking for direct code solutions, this tool isn't for you!

**Made with ❤️ for learners who want to truly understand algorithms**
