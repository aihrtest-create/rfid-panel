import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'http://127.0.0.1:4173/';

let currentMouseX = 200;
let currentMouseY = 200;

async function moveAndClick(page, selector) {
    const element = page.locator(selector).first();
    await element.waitFor({ state: 'visible' });
    const box = await element.boundingBox();
    if (box) {
        const targetX = box.x + box.width / 2;
        const targetY = box.y + box.height / 2;
        
        const steps = 30;
        const startX = currentMouseX;
        const startY = currentMouseY;
        for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const t = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            const x = startX + (targetX - startX) * t;
            const y = startY + (targetY - startY) * t;
            await page.mouse.move(x, y);
            await page.waitForTimeout(8);
        }
        currentMouseX = targetX;
        currentMouseY = targetY;
        
        await page.waitForTimeout(300);
        await page.mouse.down();
        await page.waitForTimeout(80);
        await page.mouse.up();
        await page.waitForTimeout(500);
    } else {
        await element.click();
    }
}

async function moveClickAndType(page, selector, text) {
    await moveAndClick(page, selector);
    const element = page.locator(selector).first();
    await element.focus();
    await element.fill('');
    await page.keyboard.type(text, { delay: 90 }); 
    await page.waitForTimeout(500);
}

async function step(page, label, action, settleMs = 3000) {
    const timeSec = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[${timeSec}s] STEP: ${label}`);
    if (action) {
        await action();
    }
    if (!page.isClosed() && settleMs > 0) {
        await page.waitForTimeout(settleMs).catch(() => {});
    }
}

let startTime = Date.now();

async function run() {
    const videoDir = path.join(__dirname, 'videos');
    if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir);
    }

    console.log("Launching chrome browser for recording...");
    
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
        args: ['--window-size=1280,1024']
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 960 },
        recordVideo: {
            dir: videoDir,
            size: { width: 1280, height: 960 }
        }
    });

    const page = await context.newPage();
    
    // Inject custom cursor
    await page.addInitScript(() => {
        window.addEventListener('DOMContentLoaded', () => {
            const cursor = document.createElement('div');
            cursor.style.position = 'fixed';
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursor.style.borderRadius = '50%';
            cursor.style.backgroundColor = '#ff5a28';
            cursor.style.border = '2px solid white';
            cursor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '999999';
            cursor.style.transform = 'translate(-50%, -50%)';
            cursor.style.left = '200px';
            cursor.style.top = '200px';
            document.body.appendChild(cursor);

            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.width = '40px';
            ripple.style.height = '40px';
            ripple.style.borderRadius = '50%';
            ripple.style.border = '4px solid #ff5a28';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '999998';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.opacity = '0';
            ripple.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease-out';
            document.body.appendChild(ripple);

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });

            document.addEventListener('mousedown', (e) => {
                ripple.style.left = `${e.clientX}px`;
                ripple.style.top = `${e.clientY}px`;
                ripple.style.transform = 'translate(-50%, -50%) scale(0.2)';
                ripple.style.opacity = '1';
                ripple.style.transition = 'none';
                ripple.offsetHeight;
                ripple.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease-out';
                ripple.style.transform = 'translate(-50%, -50%) scale(1)';
            });

            document.addEventListener('mouseup', () => {
                ripple.style.opacity = '0';
                ripple.style.transform = 'translate(-50%, -50%) scale(1.6)';
            });
        });
    });

    startTime = Date.now();

    await step(page, 'Загрузка интерфейса RFID панели', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' });
        await page.waitForSelector('#accounts-table-body tr');
        await page.mouse.move(200, 200);
    }, 4500);

    // ==========================================
    // PATH 1: FIRST VISIT & REGISTRATION (PETROVA -> NIKITA)
    // ==========================================

    await step(page, 'Открытие формы нового аккаунта', async () => {
        await moveAndClick(page, '#add-account-btn');
    }, 3500);

    await step(page, 'Заполнение ФИО родителя', async () => {
        await moveClickAndType(page, '#new-account-fio', 'Петрова Мария Сергеевна');
    }, 2500);

    await step(page, 'Заполнение номера телефона родителя', async () => {
        await moveClickAndType(page, '#new-account-phone', '9995554433');
    }, 3000);

    await step(page, 'Отправка СМС-кода', async () => {
        await moveAndClick(page, '#send-sms-btn');
    }, 3000);

    await step(page, 'Ввод кода СМС подтверждения', async () => {
        await moveClickAndType(page, '#sms-code-input', '1234');
    }, 2000);

    await step(page, 'Подтверждение номера по СМС', async () => {
        await moveAndClick(page, '#verify-sms-btn');
    }, 3000);

    await step(page, 'Добавление строки для ребенка', async () => {
        await moveAndClick(page, '#add-child-field-btn');
    }, 3000);

    await step(page, 'Заполнение имени ребенка', async () => {
        await moveClickAndType(page, '.child-input-group .child-name', 'Никита');
    }, 2500);

    await step(page, 'Заполнение даты рождения ребенка', async () => {
        await moveClickAndType(page, '.child-input-group .child-dob', '14.06.2019');
    }, 3000);

    await step(page, 'Создание нового аккаунта', async () => {
        await moveAndClick(page, '#submit-add-account');
    }, 4500);

    await step(page, 'Прикладывание браслета к считывателю (Никита)', async () => {
        await moveAndClick(page, '#rfid-generate-btn');
        await page.waitForTimeout(500);
        await page.locator('#rfid-code-input').focus();
        await page.keyboard.press('Enter');
    }, 6000); 

    // ==========================================
    // PATH 2: REPEAT VISIT & DISCOVER AVATAR (SMIRNOVA -> EGOR)
    // ==========================================
    
    await step(page, 'Поиск существующего аккаунта Смирнова', async () => {
        await moveClickAndType(page, '#search-input', 'Смирнова');
    }, 3500);

    const smirnovaRow = page.locator('tr').filter({ hasText: 'Смирнова Анна Юрьевна' }).first();

    const toggleText = await smirnovaRow.locator('.toggle-children-btn').innerText();
    if (toggleText.toLowerCase().includes('открыть')) {
        await step(page, 'Раскрытие списка детей у Смирновой', async () => {
            await moveAndClick(page, 'tr:has-text("Смирнова Анна Юрьевна") .toggle-children-btn');
        }, 3000);
    } else {
        await step(page, 'Список детей Смирновой уже раскрыт', null, 2500);
    }

    await step(page, 'Запуск привязки нового браслета для Егора', async () => {
        await moveAndClick(page, 'tr.child-list-row:has-text("Егор") .child-bind-btn');
    }, 3500);

    await step(page, 'Прикладывание нового браслета к считывателю (Егор)', async () => {
        await moveAndClick(page, '#rfid-generate-btn');
        await page.waitForTimeout(500);
        await page.locator('#rfid-code-input').focus();
        await page.keyboard.press('Enter');
    }, 6000); 

    // ==========================================
    // PATH 3: PRIZE VERIFICATION (CHECK BRACELET -> EGOR)
    // ==========================================

    await step(page, 'Запуск проверки браслета', async () => {
        await moveAndClick(page, '#check-bracelet-global-btn');
    }, 3500);

    await step(page, 'Имитация прикладывания браслета к считывателю для проверки', async () => {
        await moveAndClick(page, '#check-bracelet-test-codes button:has-text("Егор")');
        await page.waitForTimeout(500);
        await page.locator('#check-bracelet-input').focus();
        await page.keyboard.press('Enter');
    }, 5500); 

    await step(page, 'Выдача доступного приза Егору', async () => {
        await moveAndClick(page, '#avatar-prizes-container > div:has-text("Стикерпак") button:has-text("Выдать")');
    }, 4500);

    await step(page, 'Закрытие окна аватара Егора', async () => {
        await moveAndClick(page, '#avatar-info-modal .close-avatar-info:has-text("Закрыть окно")');
    }, 4000);

    await step(page, 'Финальный сброс поиска клиентов', async () => {
        await moveClickAndType(page, '#search-input', '');
    }, 4500);

    await browser.close();
    
    const files = fs.readdirSync(videoDir);
    const videoFile = files.filter(f => f.endsWith('.webm')).map(f => ({
        name: f,
        time: fs.statSync(path.join(videoDir, f)).mtime.getTime()
    })).sort((a,b) => b.time - a.time)[0];
    
    if (videoFile) {
        const srcPath = path.join(videoDir, videoFile.name);
        const destPath = path.join(__dirname, 'Инструкция_Демонстрация.webm');
        fs.renameSync(srcPath, destPath);
        console.log(`\nSUCCESS: Video saved to ${destPath}`);
    } else {
        console.log("\nError: Could not locate recorded video.");
    }
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
