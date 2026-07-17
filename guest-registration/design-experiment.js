(() => {
    const digitsOnly = (value) => value.replace(/\D/g, '').replace(/^7/, '').slice(0, 10);

    const formatPhone = (value) => {
        const digits = digitsOnly(value);
        if (!digits) return '';

        let formatted = `(${digits.slice(0, 3)}`;
        if (digits.length >= 3) formatted += ') ';
        if (digits.length > 3) formatted += digits.slice(3, 6);
        if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
        if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
        return formatted;
    };

    document.querySelectorAll('[data-variant]').forEach((variant) => {
        const phone = variant.querySelector('[data-phone-input]');
        const consent = variant.querySelector('[data-required-consent]');
        const nextButton = variant.querySelector('[data-next-button]');

        const updateState = () => {
            const phoneIsComplete = digitsOnly(phone.value).length === 10;
            nextButton.disabled = !(phoneIsComplete && consent.checked);
        };

        phone.addEventListener('input', () => {
            phone.value = formatPhone(phone.value);
            updateState();
        });
        consent.addEventListener('change', updateState);
        nextButton.addEventListener('click', () => {
            if (!nextButton.disabled) nextButton.querySelector('span').textContent = 'Код отправлен';
        });
    });

    const tabs = [...document.querySelectorAll('[data-variant-tab]')];
    const variants = [...document.querySelectorAll('[data-variant]')];

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const selected = tab.dataset.variantTab;
            tabs.forEach((item) => item.classList.toggle('is-active', item === tab));
            variants.forEach((variant) => variant.classList.toggle('is-active', variant.dataset.variant === selected));
        });
    });
})();
