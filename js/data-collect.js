// Функция для сбора значений из контейнера с рядами (например, плановые или исторические значения)
// container — DOM-элемент, содержащий строки с input'ами (дата и значение)
// Возвращает массив объектов вида: { date: 'YYYY-MM-DD', value: число }
function collectValues(container) {
  // Ищем строки значений по классу, игнорируя заголовки/лейблы
  const rows = container.querySelectorAll('.value-row');
  return Array.from(rows).map(row => {
    // Находим поля по типу или по классам, чтобы не зависеть от порядка
    const dateInput = row.querySelector("input[type='date'], .planned-date, .historical-date");
    const valueInput = row.querySelector("input[type='number'], .planned-value, .historical-value");
    const date = dateInput ? dateInput.value : '';
    const value = valueInput ? Number(valueInput.value) : NaN;
    return { date, value };
  }).filter(v => v.date && !isNaN(v.value));
}

