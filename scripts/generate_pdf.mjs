import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    const htmlPath = path.join(__dirname, '..', 'docs', 'instruction.html');
    console.log(`Loading HTML file: ${htmlPath}`);
    
    await page.goto(`file://${htmlPath}`);
    await page.waitForLoadState('networkidle');
    
    const pdfPath = path.join(__dirname, '..', 'docs', 'Инструкция_Регистрация_и_Привязка.pdf');
    console.log(`Generating PDF: ${pdfPath}`);
    
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: {
            top: '12mm',
            bottom: '12mm',
            left: '12mm',
            right: '12mm'
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
            <div style="font-family: 'Inter', sans-serif; font-size: 8px; width: 100%; display: flex; justify-content: space-between; padding: 0 15px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 5px;">
                <span>Инструкция кассира: Регистрация и привязка браслетов RFID</span>
                <span>Страница <span class="pageNumber"></span> из <span class="totalPages"></span></span>
            </div>
        `
    });
    
    console.log("PDF generated successfully!");
    await browser.close();
}

run().catch(err => {
    console.error("Error generating PDF:", err);
    process.exit(1);
});
