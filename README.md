# Render Puppeteer Fix

This project sets up Puppeteer on Render **with a system-installed Chrome**, ensuring that JavaScript-heavy pages can be rendered properly.

## Setup & Deployment

### 1️⃣ Modify Render Build Command
In your **Render Dashboard → Settings**, update the **Build Command** to:

```sh
./install_chromium.sh && npm install
```

This installs Chrome **before** installing Node.js dependencies.

### 2️⃣ Deploy on Render
- Go to **Render → Manual Deploy**  
- Click **"Deploy latest commit"**  
- Wait for it to finish.

### 3️⃣ Test It
Visit:
```
https://your-app-name.onrender.com/view
```

### 🔧 Fixes Implemented
- **Installs Chrome during build**
- **Uses Puppeteer with system-installed Chrome**
- **Sets correct cache path for Puppeteer**

If any issues arise, check **Render Logs**. 🚀
