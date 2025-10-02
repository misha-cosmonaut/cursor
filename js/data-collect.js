// Функция для сбора значений из контейнера с рядами (например, плановые или исторические значения)
// container — DOM-элемент, содержащий строки с input'ами (дата и значение)
// Возвращает массив объектов вида: { date: 'YYYY-MM-DD', value: число }
function collectValues(container) {
  // Преобразуем дочерние элементы контейнера в массив и обрабатываем каждый ряд
  return Array.from(container.children).map(row => {
    // Извлекаем два input'а: первый — дата, второй — значение
    const [dateInput, valueInput] = row.querySelectorAll("input");
    // Формируем объект с датой и числовым значением
    return { date: dateInput.value, value: Number(valueInput.value) };
  // Оставляем только те объекты, где дата указана и значение — число
  }).filter(v => v.date && !isNaN(v.value));
}

