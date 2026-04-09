import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Подгружаем наш файл из проекта
    await page.goto('file:///Users/dima/Desktop/Rfid-%D0%BF%D0%B0%D0%BD%D0%B5%D0%BB%D1%8C/index.html');
    
    // 1. Открываем окно Аватара
    await page.evaluate(() => {
        window.showAvatarInfo('Случайный Гость');
    });
    await page.waitForTimeout(600); // ждем анимации

    // Скрин 1: Модалка целиком
    await page.locator('#avatar-info-modal-content').screenshot({ path: '/Users/dima/Desktop/Rfid-панель/screenshots/avatar_modal_new.png' });

    // Скрин 2: Контейнер с карточками призов
    await page.locator('#avatar-prizes-container').screenshot({ path: '/Users/dima/Desktop/Rfid-панель/screenshots/prize_statuses_new.png' });

    // 3. Вызываем Confirm Modal через клик по кнопке отмены
    await page.evaluate(() => {
        const undoBtn = document.querySelector('.undo-btn');
        if (undoBtn) undoBtn.click();
    });
    await page.waitForTimeout(600); // ждем анимации окна подтверждения

    // Скрин 3: Модалка подтверждения
    await page.locator('#confirm-modal > div').screenshot({ path: '/Users/dima/Desktop/Rfid-панель/screenshots/confirm_undo_modal.png' });

    await browser.close();
    console.log("Screenshots captured successfully!");
})();
