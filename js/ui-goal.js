let goalCounter = 0;
let goalTabs = [];

function ensureTabsUI() {
  const container = document.getElementById('goalsContainer');
  if (!document.getElementById('goalTabsBar')) {
    // Панель вкладок
    const tabsBar = document.createElement('div');
    tabsBar.id = 'goalTabsBar';
    tabsBar.className = 'flex gap-2 mb-4';
    container.appendChild(tabsBar);
  }
  if (!document.getElementById('goalTabsContent')) {
    // Контент вкладок
    const tabsContent = document.createElement('div');
    tabsContent.id = 'goalTabsContent';
    container.appendChild(tabsContent);
  }
}

function addGoal() {
  ensureTabsUI();
  goalCounter++;
  const currentGoalNumber = goalTabs.length + 1;
  const autoId = `goal_${goalCounter.toString().padStart(3, '0')}`;
  const tabId = `goalTab_${autoId}`;
  const contentId = `goalContent_${autoId}`;

  // Вкладка
  const tab = document.createElement('button');
  tab.className = 'goal-tab px-4 py-2 rounded-t-lg border border-b-0 bg-gray-200 text-gray-700 font-medium hover:bg-blue-100 transition';
  tab.id = tabId;
  tab.type = 'button';
  tab.innerHTML = `Цель #${currentGoalNumber} <span class="ml-2 text-red-400 cursor-pointer" title="Удалить" onclick="event.stopPropagation(); removeGoalTab('${tabId}', '${contentId}')">✕</span>`;
  tab.onclick = () => activateGoalTab(tabId, contentId);

  // Контент
  const content = document.createElement('div');
  content.className = 'goal-content';
  content.id = contentId;
  content.style.display = 'none';
  content.innerHTML = `
    <fieldset class="goal rounded-lg border p-4 mb-6">
      <legend class="font-semibold text-lg mb-2">Цель #${currentGoalNumber}</legend>
      <div class="flex flex-col gap-3">
        <input name="goalId" type="hidden" value="${autoId}" />
        <label class="flex flex-col text-gray-700 font-medium">Название цели:
          <input name="name" type="text" placeholder="Название цели" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
        </label>
        <label class="flex flex-col text-gray-700 font-medium">Описание цели:
          <input name="desc" type="text" placeholder="Описание цели" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
        </label>
        <label class="flex flex-col text-gray-700 font-medium">Единица измерения:
          <input name="unit" type="text" placeholder="₽, %, шт и т.д." class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
        </label>
        <div class="flex gap-2">
          <label class="flex flex-col text-gray-700 font-medium flex-1">Начальное значение:
            <input name="startValue" type="number" placeholder="1000000" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
          <label class="flex flex-col text-gray-700 font-medium flex-1">Дата нач. значения:
            <input name="startDate" type="date" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
        </div>
        <div class="flex gap-2">
          <label class="flex flex-col text-gray-700 font-medium flex-1">Целевое значение:
            <input name="targetValue" type="number" placeholder="1200000" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
          <label class="flex flex-col text-gray-700 font-medium flex-1">Дата целевого значения:
            <input name="targetDate" type="date" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
        </div>
        <div class="flex gap-2">
          <label class="flex flex-col text-gray-700 font-medium flex-1">Текущее значение:
            <input name="currentValue" type="number" placeholder="1100000" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
          <label class="flex flex-col text-gray-700 font-medium flex-1">Дата текущего значения:
            <input name="currentDate" type="date" class="mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
          </label>
        </div>
        <!-- Плановые значения -->
        <div class="plannedValues mb-2">
          <label class="text-gray-700 font-medium">Плановые значения:
            <button type="button" class="ml-2 px-2 py-1 bg-blue-200 rounded add-planned-value">+ Добавить</button>
          </label>
          <div class="planned-values-list"></div>
        </div>
        <!-- Исторические значения -->
        <div class="historicalValues mb-2">
          <label class="text-gray-700 font-medium">Исторические значения:
            <button type="button" class="ml-2 px-2 py-1 bg-green-200 rounded add-historical-value">+ Добавить</button>
          </label>
          <div class="historical-values-list"></div>
        </div>
        <!-- Здесь позже будут критерии и вехи -->
      </div>
    </fieldset>
  `;

  // Добавить вкладку и контент
  document.getElementById('goalTabsBar').appendChild(tab);
  document.getElementById('goalTabsContent').appendChild(content);
  goalTabs.push({tabId, contentId});

  activateGoalTab(tabId, contentId);

  // Добавляем обработчики для динамических списков плановых и исторических значений
  setTimeout(() => {
    // Плановые значения
    const plannedList = content.querySelector('.planned-values-list');
    const addPlannedBtn = content.querySelector('.add-planned-value');
    if (addPlannedBtn && plannedList) {
      addPlannedBtn.onclick = () => {
        const row = document.createElement('div');
        row.className = 'value-row';
        row.innerHTML = `
          <input type="number" placeholder="Значение" class="px-2 py-1 border rounded planned-value" />
          <input type="date" class="px-2 py-1 border rounded planned-date" />
          <button type="button" class="ml-2 text-red-500 remove-value" title="Удалить">✕</button>
        `;
        row.querySelector('.remove-value').onclick = () => row.remove();
        plannedList.appendChild(row);
      };
    }
    // Исторические значения
    const historicalList = content.querySelector('.historical-values-list');
    const addHistoricalBtn = content.querySelector('.add-historical-value');
    if (addHistoricalBtn && historicalList) {
      addHistoricalBtn.onclick = () => {
        const row = document.createElement('div');
        row.className = 'value-row';
        row.innerHTML = `
          <input type="number" placeholder="Значение" class="px-2 py-1 border rounded historical-value" />
          <input type="date" class="px-2 py-1 border rounded historical-date" />
          <button type="button" class="ml-2 text-red-500 remove-value" title="Удалить">✕</button>
        `;
        row.querySelector('.remove-value').onclick = () => row.remove();
        historicalList.appendChild(row);
      };
    }
  }, 0);
}

function activateGoalTab(tabId, contentId) {
  goalTabs.forEach(({tabId: tId, contentId: cId}) => {
    const tab = document.getElementById(tId);
    const content = document.getElementById(cId);
    if (tab && content) {
      if (tId === tabId) {
        tab.classList.add('bg-white', 'border-b-white', 'z-10');
        tab.classList.remove('bg-gray-200');
        content.style.display = '';
      } else {
        tab.classList.remove('bg-white', 'border-b-white', 'z-10');
        tab.classList.add('bg-gray-200');
        content.style.display = 'none';
      }
    }
  });
}

function updateGoalNumbers() {
  goalTabs.forEach((goalTab, index) => {
    const goalNumber = index + 1;
    const tab = document.getElementById(goalTab.tabId);
    const content = document.getElementById(goalTab.contentId);
    
    if (tab) {
      // Обновить текст вкладки, сохранив кнопку удаления
      const closeButton = tab.querySelector('span');
      if (closeButton) {
        tab.innerHTML = `Цель #${goalNumber} <span class="ml-2 text-red-400 cursor-pointer" title="Удалить" onclick="event.stopPropagation(); removeGoalTab('${goalTab.tabId}', '${goalTab.contentId}')">✕</span>`;
      }
    }
    
    if (content) {
      // Обновить заголовок в контенте
      const legend = content.querySelector('legend');
      if (legend) {
        legend.textContent = `Цель #${goalNumber}`;
      }
    }
  });
}

window.removeGoalTab = function(tabId, contentId) {
  // Удалить вкладку и контент
  const tab = document.getElementById(tabId);
  const content = document.getElementById(contentId);
  if (tab) tab.remove();
  if (content) content.remove();
  // Удалить из массива
  goalTabs = goalTabs.filter(t => t.tabId !== tabId);
  // Обновить нумерацию оставшихся целей
  updateGoalNumbers();
  // Активировать соседнюю вкладку
  if (goalTabs.length > 0) {
    const next = goalTabs[0];
    if (next) activateGoalTab(next.tabId, next.contentId);
  }
};
