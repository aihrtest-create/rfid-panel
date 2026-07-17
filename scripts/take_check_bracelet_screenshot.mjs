import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const indexPath = path.join(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`);
    await page.waitForSelector('#check-bracelet-global-btn');
    await page.waitForTimeout(500);
    
    // Take a screenshot of the check-bracelet button specifically
    const btn = page.locator('#check-bracelet-global-btn');
    await btn.screenshot({ path: path.join(__dirname, 'screenshots', 'check_bracelet_btn.png') });
    
    // Also take a screenshot of the header area containing the button
    await page.screenshot({
        path: path.join(__dirname, 'screenshots', 'check_bracelet_header.png'),
        clip: { x: 50, y: 15, width: 1180, height: 85 }
    });
    
    await browser.close();
    console.log("Check bracelet button screenshots captured successfully!");
})();
