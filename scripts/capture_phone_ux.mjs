import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots', 'phone_ux');
fs.mkdirSync(outDir, { recursive: true });

// A simple static file server to avoid file:// protocol security restrictions on loading Tailwind from CDN
function startServer() {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            // Normalize path to prevent directory traversal
            let safeUrl = req.url.split('?')[0];
            if (safeUrl === '/' || safeUrl === '') {
                safeUrl = '/index.html';
            }
            
            // Handle url decoded paths
            const decodedPath = decodeURIComponent(safeUrl);
            const filePath = path.join(__dirname, decodedPath);
            
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                } else {
                    const ext = path.extname(filePath).toLowerCase();
                    let contentType = 'text/html';
                    if (ext === '.js' || ext === '.mjs') contentType = 'application/javascript';
                    else if (ext === '.css') contentType = 'text/css';
                    else if (ext === '.png') contentType = 'image/png';
                    else if (ext === '.svg') contentType = 'image/svg+xml';
                    else if (ext === '.json') contentType = 'application/json';
                    
                    res.writeHead(200, { 
                        'Content-Type': contentType,
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(data);
                }
            });
        });
        
        server.listen(4173, '127.0.0.1', () => {
            resolve(server);
        });
    });
}

async function run() {
    console.log('Starting local HTTP server...');
    const server = await startServer();
    console.log('Server running on http://127.0.0.1:4173');
    
    let browser;
    try {
        browser = await chromium.launch({ headless: true, channel: 'chrome' });
        const context = await browser.newContext({
            viewport: { width: 1280, height: 900 },
            recordVideo: { dir: outDir, size: { width: 1280, height: 900 } }
        });
        const page = await context.newPage();

        console.log('Navigating to index.html via HTTP...');
        await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle' });
        await page.waitForSelector('#accounts-table-body tr');
        await page.waitForTimeout(1000);

        // Step 1: Show main screen
        console.log('Step 1: Main screen');
        await page.waitForTimeout(1500);

        // Step 2: Open add account modal
        console.log('Step 2: Opening modal');
        await page.locator('#add-account-btn').click();
        await page.waitForTimeout(1000);

        // Step 3: Focus phone field
        console.log('Step 3: Focus phone');
        await page.locator('#new-account-phone').click();
        await page.waitForTimeout(800);

        // Step 4: Type area code slowly
        console.log('Step 4: Type operator code');
        await page.locator('#new-account-phone').pressSequentially('999', { delay: 250 });
        await page.waitForTimeout(600);

        // Step 5: Complete the number
        console.log('Step 5: Complete number');
        await page.locator('#new-account-phone').pressSequentially('5554433', { delay: 200 });
        await page.waitForTimeout(800);

        // Step 6: Try extra digits (blocked)
        console.log('Step 6: Extra digits');
        await page.locator('#new-account-phone').pressSequentially('789', { delay: 300 });
        await page.waitForTimeout(600);

        // Step 7: Click send SMS
        console.log('Step 7: Send SMS');
        await page.locator('#send-sms-btn').click();
        await page.waitForTimeout(1200);

        // Step 8: Enter wrong SMS code
        console.log('Step 8: Wrong code');
        await page.locator('#sms-code-input').pressSequentially('0000', { delay: 200 });
        await page.waitForTimeout(400);
        await page.locator('#verify-sms-btn').click();
        await page.waitForTimeout(1000);

        // Step 9: Enter correct SMS code
        console.log('Step 9: Correct code');
        await page.locator('#sms-code-input').fill('');
        await page.waitForTimeout(200);
        await page.locator('#sms-code-input').pressSequentially('1234', { delay: 200 });
        await page.waitForTimeout(400);
        await page.locator('#verify-sms-btn').click();
        await page.waitForTimeout(1500);

        // Step 10: Try submit without FIO
        console.log('Step 10: Submit without FIO');
        await page.locator('#submit-add-account').click();
        await page.waitForTimeout(1000);

        // Step 11: Fill FIO and child
        console.log('Step 11: Fill FIO');
        await page.locator('#new-account-fio').click();
        await page.locator('#new-account-fio').pressSequentially('Тестов Тест Тестович', { delay: 60 });
        await page.waitForTimeout(500);
        await page.locator('#add-child-field-btn').click();
        await page.waitForTimeout(400);
        const childGroup = page.locator('.child-input-group').last();
        await childGroup.locator('.child-name').click();
        await childGroup.locator('.child-name').pressSequentially('Маша', { delay: 100 });
        await childGroup.locator('.child-dob').fill('2018-03-15');
        await page.waitForTimeout(1000);

        // Step 12: Submit successfully
        console.log('Step 12: Submit success');
        await page.locator('#submit-add-account').click();
        await page.waitForTimeout(2000);

        // Final pause
        await page.waitForTimeout(1500);

        const videoPath = await page.video().path();
        await page.close();
        await context.close();
        
        // Rename the video
        const finalVideoPath = path.join(outDir, 'phone_ux_demo.webm');
        if (fs.existsSync(videoPath)) {
            fs.copyFileSync(videoPath, finalVideoPath);
            console.log(`Video saved: ${finalVideoPath}`);
            
            // Also copy to the brain directory for safety
            const brainDir = '/Users/dima/.gemini/antigravity-ide/brain/341d68e0-34a3-47c7-a62b-dcea7aea8059/phone_ux_screenshots';
            if (fs.existsSync(brainDir)) {
                fs.copyFileSync(videoPath, path.join(brainDir, 'phone_ux_demo.webm'));
                console.log(`Video also copied to brain: ${path.join(brainDir, 'phone_ux_demo.webm')}`);
            }
        }
    } finally {
        if (browser) {
            await browser.close();
        }
        server.close();
        console.log('Server stopped. Done!');
    }
}

run().catch(err => {
    console.error(err);
    process.exitCode = 1;
});

