import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Подгружаем наш файл из проекта
    const indexPath = path.join(projectRoot, 'index.html');
    await page.goto(`file://${indexPath}`);
    
    // 1. Открываем окно Аватара
    await page.evaluate(() => {
        window.showAvatarInfo('Случайный Гость');
    });
    await page.waitForTimeout(600); // ждем анимации

    // Скрин 1: Модалка целиком
    const screen1Path = path.join(projectRoot, 'docs', 'screenshots', 'avatar_modal_new.png');
    await page.locator('#avatar-info-modal-content').screenshot({ path: screen1Path });

    // Скрин 2: Контейнер с карточками призов
    const screen2Path = path.join(projectRoot, 'docs', 'screenshots', 'prize_statuses_new.png');
    await page.locator('#avatar-prizes-container').screenshot({ path: screen2Path });

    // 3. Вызываем Confirm Modal через клик по кнопке отмены
    await page.evaluate(() => {
        const undoBtn = document.querySelector('.undo-btn');
        if (undoBtn) undoBtn.click();
    });
    await page.waitForTimeout(600); // ждем анимации окна подтверждения

    // Скрин 3: Модалка подтверждения
    const screen3Path = path.join(projectRoot, 'docs', 'screenshots', 'confirm_undo_modal.png');
    await page.locator('#confirm-modal > div').screenshot({ path: screen3Path });

    await browser.close();
    console.log("Screenshots captured successfully!");
})();
