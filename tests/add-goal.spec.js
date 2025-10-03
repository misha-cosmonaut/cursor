const { test, expect } = require('@playwright/test');

test.describe('Генератор отчёта', () => {
  test('должен открыть страницу и отобразить кнопку "Добавить цель"', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем, что страница загрузилась
    await expect(page).toHaveTitle('Генератор отчёта');
    
    // Проверяем наличие заголовка
    await expect(page.locator('h1')).toContainText('Редактор отчёта');
    
    // Проверяем наличие кнопки "Добавить цель"
    const addGoalButton = page.locator('button:has-text("+ Добавить цель")');
    await expect(addGoalButton).toBeVisible();
  });

  test('должен добавить новую цель при клике на кнопку "Добавить цель"', async ({ page }) => {
    await page.goto('/');
    
    // Находим кнопку "Добавить цель"
    const addGoalButton = page.locator('button:has-text("+ Добавить цель")');
    
    // Проверяем, что изначально нет целей
    const goalsContainer = page.locator('#goalsContainer');
    await expect(goalsContainer).toBeEmpty();
    
    // Кликаем на кнопку "Добавить цель"
    await addGoalButton.click();
    
    // Проверяем, что появилась вкладка с целью
    await expect(page.locator('button:has-text("Цель #1")')).toBeVisible();
    
    // Проверяем, что появилась форма для добавления цели
    await expect(page.locator('input[placeholder="Название цели"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Описание цели"]')).toBeVisible();
    await expect(page.locator('input[placeholder="₽, %, шт и т.д."]')).toBeVisible();
    
    // Проверяем, что появились поля для значений
    await expect(page.locator('input[placeholder="1000000"]')).toBeVisible();
    await expect(page.locator('input[placeholder="1100000"]')).toBeVisible();
    await expect(page.locator('input[placeholder="1200000"]')).toBeVisible();
  });

  test('должен заполнить новую цель данными', async ({ page }) => {
    await page.goto('/');
    
    // Кликаем на кнопку "Добавить цель"
    await page.locator('button:has-text("+ Добавить цель")').click();
    
    // Заполняем форму цели
    await page.fill('input[placeholder="Название цели"]', 'Увеличить продажи');
    await page.fill('input[placeholder="Описание цели"]', 'Увеличить объем продаж на 20%');
    await page.fill('input[placeholder="₽, %, шт и т.д."]', '%');
    await page.fill('input[placeholder="1000000"]', '100');
    await page.fill('input[placeholder="1100000"]', '115');
    await page.fill('input[placeholder="1200000"]', '120');
    
    // Заполняем даты
    await page.fill('input[name="startDate"]', '2024-01-01'); // Дата начального значения
    await page.fill('input[name="targetDate"]', '2024-12-31'); // Дата целевого значения
    await page.fill('input[name="currentDate"]', '2024-06-01'); // Дата текущего значения
    
    // Проверяем, что данные сохранились в полях
    await expect(page.locator('input[placeholder="Название цели"]')).toHaveValue('Увеличить продажи');
    await expect(page.locator('input[placeholder="Описание цели"]')).toHaveValue('Увеличить объем продаж на 20%');
    await expect(page.locator('input[placeholder="₽, %, шт и т.д."]')).toHaveValue('%');
    await expect(page.locator('input[placeholder="1000000"]')).toHaveValue('100');
    await expect(page.locator('input[placeholder="1100000"]')).toHaveValue('115');
    await expect(page.locator('input[placeholder="1200000"]')).toHaveValue('120');
  });
});
