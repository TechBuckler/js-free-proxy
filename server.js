const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

let browser;
let page;

async function initBrowser() {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    page = await browser.newPage();
    const TARGET_URL = process.env.TARGET_URL || 'https://bloodrizer.github.io/kittensgame/';
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });
    console.log(`Loaded target page: ${TARGET_URL}`);
    await wrapInteractiveElements();
}

async function wrapInteractiveElements() {
    await page.evaluate(() => {
        let elemId = 0;
        document.querySelectorAll('button').forEach(btn => {
            const id = 'elem-' + (elemId++);
            btn.setAttribute('data-proxy-id', id);
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/action';
            const hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'elemId';
            hidden.value = id;
            form.appendChild(hidden);
            const clone = btn.cloneNode(true);
            clone.type = 'submit';
            form.appendChild(clone);
            btn.parentNode.replaceChild(form, btn);
        });
    });
}

async function getSnapshot() {
    await page.evaluate(() => {
        document.querySelectorAll('script').forEach(script => script.remove());
    });
    let headContent = await page.evaluate(() => {
        document.head.querySelectorAll('script').forEach(script => script.remove());
        return document.head.innerHTML;
    });
    let bodyContent = await page.evaluate(() => document.body.innerHTML);
    return `<html><head>${headContent}<meta http-equiv="refresh" content="1"></head><body>${bodyContent}</body></html>`;
}

app.get('/view', async (req, res) => {
    try {
        const snapshot = await getSnapshot();
        res.set('Content-Type', 'text/html');
        res.send(snapshot);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating snapshot");
    }
});

app.post('/action', async (req, res) => {
    const elemId = req.body.elemId;
    if (!elemId) return res.redirect('/view');
    try {
        const selector = `[data-proxy-id="${elemId}"]`;
        const element = await page.$(selector);
        if (element) {
            await element.click();
            console.log(`Clicked element with id: ${elemId}`);
        }
    } catch (err) {
        console.error(`Error handling action for element ${elemId}:`, err);
    }
    res.redirect('/view');
});

app.get('/', (req, res) => res.redirect('/view'));

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initBrowser();
});