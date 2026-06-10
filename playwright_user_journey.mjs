import { chromium } from 'playwright';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4173/';

async function step(page, label, action, settleMs = 1000) {
    console.log(`STEP: ${label}`);
    if (action) {
        await action();
    }
    if (!page.isClosed() && settleMs > 0) {
        await page.waitForTimeout(settleMs).catch(() => {});
    }
}

async function run() {
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
        slowMo: 250,
        args: ['--window-size=1440,1024']
    });

    const context = await browser.newContext({
        viewport: { width: 1440, height: 1024 }
    });

    const page = await context.newPage();

    await page.goto(baseUrl, { waitUntil: 'load' });
    await page.waitForSelector('#accounts-table-body tr');
    await page.waitForTimeout(1500);

    await step(page, 'Поиск существующего аккаунта', async () => {
        await page.locator('#search-input').click();
        await page.locator('#search-input').fill('Смирнова');
    });

    await step(page, 'Сброс поиска', async () => {
        await page.locator('#search-input').fill('');
    });

    const smirnovaRow = page.locator('tr').filter({ hasText: 'Смирнова Анна Юрьевна' }).first();

    await step(page, 'Раскрытие списка детей у первого аккаунта', async () => {
        await smirnovaRow.locator('.toggle-children-btn').click();
    }, 1200);

    const egorRow = page.locator('tr.child-list-row').filter({ hasText: 'Егор' }).first();

    await step(page, 'Открытие карточки аватара ребенка', async () => {
        await egorRow.locator('.avatar-info-trigger').click();
    }, 1200);

    await step(page, 'Раскрытие истории посещений', async () => {
        await page.locator('#visits-accordion-btn').click();
    });

    await step(page, 'Выдача доступного приза', async () => {
        const prizeCard = page.locator('#avatar-prizes-container > div').filter({ hasText: 'Стикерпак' }).first();
        await prizeCard.getByRole('button', { name: 'Выдать' }).click();
    }, 1200);

    await step(page, 'Закрытие окна аватара', async () => {
        await page.locator('#avatar-info-modal .close-avatar-info').first().click();
    });

    await step(page, 'Открытие формы нового аккаунта', async () => {
        await page.locator('#add-account-btn').click();
    });

    await step(page, 'Заполнение данных родителя', async () => {
        await page.locator('#new-account-fio').fill('Петрова Мария Сергеевна');
        await page.locator('#new-account-phone').fill('+7 999 555 44 33');
        await page.locator('#send-sms-btn').waitFor({ state: 'visible' });
    });

    await step(page, 'Отправка СМС-кода', async () => {
        await page.locator('#send-sms-btn').click();
    });

    await step(page, 'Подтверждение номера', async () => {
        await page.locator('#sms-code-input').fill('1234');
        await page.locator('#verify-sms-btn').click();
    }, 1200);

    await step(page, 'Добавление ребенка в форму', async () => {
        await page.locator('#add-child-field-btn').click();
    });

    const childGroup = page.locator('.child-input-group').last();

    await step(page, 'Заполнение данных ребенка', async () => {
        await childGroup.locator('.child-name').fill('Никита');
        await childGroup.locator('.child-dob').fill('2019-06-14');
    });

    await step(page, 'Создание аккаунта', async () => {
        await page.locator('#submit-add-account').click();
    }, 1400);

    await step(page, 'Поиск только что созданного аккаунта', async () => {
        await page.locator('#search-input').fill('Петрова');
    }, 1200);

    const petrovaRow = page.locator('tr').filter({ hasText: 'Петрова Мария Сергеевна' }).first();

    await step(page, 'Раскрытие списка детей у нового аккаунта', async () => {
        await petrovaRow.locator('.toggle-children-btn').click();
    }, 1200);

    const nikitaRow = page.locator('tr.child-list-row').filter({ hasText: 'Никита' }).first();

    await step(page, 'Запуск привязки браслета', async () => {
        await nikitaRow.locator('.attach-bracelet-btn').click();
    }, 1200);

    await step(page, 'Имитация прикладывания браслета', async () => {
        await page.locator('#rfid-attach-btn').click();
    }, 2500);

    await step(page, 'Перевод браслета в состояние аватара', async () => {
        await nikitaRow.locator('.simulate-avatar-trigger').click();
    });

    await step(page, 'Открытие карточки нового аватара', async () => {
        await nikitaRow.locator('.avatar-info-trigger').click();
    }, 1200);

    await step(page, 'Раскрытие истории визитов нового аватара', async () => {
        await page.locator('#visits-accordion-btn').click();
    });

    await step(page, 'Финальная пауза на экране', null, 4000);

    await browser.close();
    console.log('User journey completed.');
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
