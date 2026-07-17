import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'screenshots', 'returning_visit');

if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Загружаем index.html по абсолютному пути
    const indexPath = path.join(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`);
    await page.waitForSelector('#accounts-table-body tr');
    
    // 1. Ищем Смирнову
    await page.locator('#search-input').click();
    await page.locator('#search-input').fill('Смирнова');
    await page.waitForTimeout(500); // ждем фильтрации

    const smirnovaRow = page.locator('tr').filter({ hasText: 'Смирнова Анна Юрьевна' }).first();
    
    // 2. Проверяем, раскрыт ли список детей
    const toggleBtn = smirnovaRow.locator('.toggle-children-btn');
    const toggleText = await toggleBtn.locator('span').innerText();
    console.log("Toggle button text before click:", toggleText);
    
    if (toggleText.toLowerCase().includes('открыть') || toggleText.toLowerCase().includes('show')) {
        console.log("Clicking toggle button to expand...");
        await toggleBtn.click();
        await page.waitForTimeout(600); // ждем раскрытия
    } else {
        console.log("List already expanded");
    }

    // Скриншот 1: Таблица с кнопкой "Новый браслет"
    await page.screenshot({ 
        path: path.join(screenshotsDir, 'step1_returning_table.png'),
        clip: { x: 50, y: 150, width: 1180, height: 450 } 
    });

    const egorRow = page.locator('tr.child-list-row').filter({ hasText: 'Егор' }).first();
    
    // 3. Нажимаем кнопку "Новый браслет"
    await egorRow.locator('.child-bind-btn').click();
    await page.waitForTimeout(600); // ждем открытия модалки

    // Скриншот 2: Модалка привязки нового браслета
    await page.locator('#rfid-modal-content').screenshot({ 
        path: path.join(screenshotsDir, 'step2_bind_modal.png') 
    });

    // 4. Генерируем RFID код
    await page.locator('#rfid-generate-btn').click();
    await page.waitForTimeout(200);

    // 5. Нажимаем "Подтвердить"
    await page.locator('#rfid-confirm-btn').click();
    await page.waitForTimeout(500); // ждем закрытия модалки и появления тоста

    // Скриншот 3: Вся страница с тостом успеха
    await page.screenshot({ 
        path: path.join(screenshotsDir, 'step3_bind_success.png') 
    });

    // Ожидаем окончательного обновления и затухания тоста (если надо)
    await page.waitForTimeout(1000);

    // 6. Открываем карточку аватара Егора (кнопка "Детали")
    await egorRow.locator('.child-details-btn').click();
    await page.waitForTimeout(600); // ждем модалки

    // 7. Раскрываем историю посещений
    await page.locator('#visits-accordion-btn').click();
    await page.waitForTimeout(500); // ждем раскрытия аккордеона

    // Скриншот 4: Карточка Аватара с историей посещений
    await page.locator('#avatar-info-modal-content').screenshot({ 
        path: path.join(screenshotsDir, 'step4_avatar_history.png') 
    });

    await browser.close();
    console.log("Returning visit screenshots captured successfully!");
})();
