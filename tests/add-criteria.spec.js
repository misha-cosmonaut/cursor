const { test, expect } = require('@playwright/test');

test.describe('Критерии внутри цели', () => {
  test('добавление критерия и данные попадают в отчёт', async ({ page }) => {
    await page.goto('/');

    // Добавляем цель
    await page.locator('button:has-text("+ Добавить цель")').click();

    // Добавляем критерий
    await page.locator('button:has-text("+ Добавить критерий")').click();

    // Заполняем значения цели (минимально для графика)
    await page.fill('input[name="startDate"]', '2025-01-01');
    await page.fill('input[name="targetDate"]', '2025-12-31');
    await page.fill('input[name="currentDate"]', '2025-06-01');
    await page.fill('input[placeholder="1000000"]', '10');
    await page.fill('input[placeholder="1200000"]', '20');
    await page.fill('input[placeholder="1100000"]', '15');

    // Заполняем критерий
    await page.fill('input[placeholder="Название критерия"]', 'Критерий A');
    await page.fill('input[placeholder="Описание"]', 'Описание критерия');
    await page.fill('input[name="c_startDate"]', '2025-01-01');
    await page.fill('input[name="c_targetDate"]', '2025-12-31');
    await page.fill('input[name="c_currentDate"]', '2025-06-01');
    await page.fill('input[name="c_startValue"]', '1');
    await page.fill('input[name="c_targetValue"]', '2');
    await page.fill('input[name="c_currentValue"]', '1.5');

    // Сгенерировать отчёт
    await page.locator('button:has-text("Сгенерировать отчёт")').click();

    // Проверяем, что появился график цели
    await expect(page.locator('#report canvas')).toHaveCount(2);

    // Проверим присутствие заголовков
    await expect(page.locator('#report h3')).toContainText('Цель:');
    await expect(page.locator('#report h4')).toContainText('Критерий: Критерий A');
  });
});


