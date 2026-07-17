import { chromium } from 'playwright';

async function run() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForSelector('#accounts-table-body tr');
    
    console.log("CLICKING CHECK BRACELET BUTTON...");
    await page.click('#check-bracelet-global-btn');
    await page.waitForTimeout(1000);
    
    console.log("TEST CODES CONTAINER HTML:");
    console.log(await page.locator('#check-bracelet-test-codes').innerHTML());
    
    await browser.close();
}
run();
