# JS-Free Proxy Middleware

This project converts a JavaScript-heavy page into a static HTML mirror with interactive forms.

## Setup

1. Install Node.js
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables (optional):
   ```bash
   export TARGET_URL="https://bloodrizer.github.io/kittensgame/"
   export PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Deployment

### Option 1: Glitch (Free Hosting)
- Create a new project on [Glitch](https://glitch.com/)
- Upload `server.js`, `package.json`
- Set `TARGET_URL` in project settings

### Option 2: Railway / Render / Replit
- Upload code
- Set environment variables
- Deploy the service

### Optional: Static Redirect Page (GitHub Pages)
Create an `index.html` with:
```html
<!DOCTYPE html>
<html>
<head><meta http-equiv="refresh" content="0; url=https://your-project.glitch.me/view"></head>
<body><p><a href="https://your-project.glitch.me/view">Click here</a> if not redirected.</p></body>
</html>
```
Host it on GitHub Pages for a quick public entry point.

## Summary
This middleware loads a live page in a headless browser, removes scripts, and serves a pure HTML snapshot (auto-refreshing every second).