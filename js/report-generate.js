function generateReport() {
  const date = document.getElementById("reportDate").value;
  const department = document.getElementById("department").value;
  const responsible = document.getElementById("responsible").value;

  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <h2>Отчёт</h2>
    <p><b>Дата:</b> ${date}</p>
    <p><b>Подразделение:</b> ${department}</p>
    <p><b>Ответственный:</b> ${responsible}</p>
  `;

  const goals = document.querySelectorAll("#goalsContainer fieldset");
  goals.forEach((goal, index) => {
    const name = goal.querySelector("input[name='name']").value;
    const desc = goal.querySelector("input[name='desc']").value;
    const unit = goal.querySelector("input[name='unit']").value;

    const startValue = Number(goal.querySelector("input[name='startValue']").value);
    const startDate = goal.querySelector("input[name='startDate']").value;
    const targetValue = Number(goal.querySelector("input[name='targetValue']").value);
    const targetDate = goal.querySelector("input[name='targetDate']").value;
    const currentValue = Number(goal.querySelector("input[name='currentValue']").value);
    const currentDate = goal.querySelector("input[name='currentDate']").value;

    const plannedValues = collectValues(goal.querySelector(".plannedValues"));
    const historicalValues = collectValues(goal.querySelector(".historicalValues"));

    // расчёт прогресса
    const progressTotal = currentValue - startValue;
    const lastHist = historicalValues.length ? historicalValues[historicalValues.length - 1].value : startValue;
    const progressSinceLast = currentValue - lastHist;
    const progressPercent = ((currentValue - startValue) / (targetValue - startValue)) * 100;

    // блок отчёта
    const blockId = "goalChart" + index;
    const block = document.createElement("div");
    block.className = "goal";
    block.innerHTML = `
      <h3>Цель: ${name}</h3>
      <p><b>Описание:</b> ${desc}</p>
      <ul>
        <li><b>Начальное значение:</b> ${startValue} (${startDate})</li>
        <li><b>Целевое значение:</b> ${targetValue} (${targetDate})</li>
        <li><b>Текущее значение:</b> ${currentValue} (${currentDate})</li>
      </ul>
      <h4>Прогресс</h4>
      <ul>
        <li>Общий прогресс: ${progressTotal} ${unit}</li>
        <li>С последнего исторического значения: ${progressSinceLast} ${unit}</li>
        <li>Прогресс, %: ${progressPercent.toFixed(1)}%</li>
      </ul>
      <canvas id="${blockId}"></canvas>
    `;
    reportDiv.appendChild(block);

    drawChart(blockId, startDate, startValue, plannedValues, historicalValues, currentDate, currentValue, unit);

    // критерии
    const criteria = goal.querySelectorAll(".criteriaContainer .criterion");
    criteria.forEach((crit, cIndex) => {
      const cname = crit.querySelector("input[name='c_name']").value;
      const cdesc = crit.querySelector("input[name='c_desc']").value;
      const cunit = crit.querySelector("input[name='c_unit']").value;
      const cstartValue = Number(crit.querySelector("input[name='c_startValue']").value);
      const cstartDate = crit.querySelector("input[name='c_startDate']").value;
      const ctargetValue = Number(crit.querySelector("input[name='c_targetValue']").value);
      const ctargetDate = crit.querySelector("input[name='c_targetDate']").value;
      const ccurrentValue = Number(crit.querySelector("input[name='c_currentValue']").value);
      const ccurrentDate = crit.querySelector("input[name='c_currentDate']").value;

      const cplannedValues = collectValues(crit.querySelector(".c_plannedValues"));
      const chistoricalValues = collectValues(crit.querySelector(".c_historicalValues"));

      const cprogressTotal = ccurrentValue - cstartValue;
      const clastHist = chistoricalValues.length ? chistoricalValues[chistoricalValues.length - 1].value : cstartValue;
      const cprogressSinceLast = ccurrentValue - clastHist;
      const cprogressPercent = ((ccurrentValue - cstartValue) / (ctargetValue - cstartValue)) * 100;

      const cBlockId = "critChart" + index + "_" + cIndex;
      const cBlock = document.createElement("div");
      cBlock.className = "criterion";
      cBlock.innerHTML = `
        <h4>Критерий: ${cname}</h4>
        <p><b>Описание:</b> ${cdesc}</p>
        <ul>
          <li><b>Начальное значение:</b> ${cstartValue} (${cstartDate})</li>
          <li><b>Целевое значение:</b> ${ctargetValue} (${ctargetDate})</li>
          <li><b>Текущее значение:</b> ${ccurrentValue} (${ccurrentDate})</li>
        </ul>
        <h5>Прогресс</h5>
        <ul>
          <li>Общий прогресс: ${cprogressTotal} ${cunit}</li>
          <li>С последнего исторического значения: ${cprogressSinceLast} ${cunit}</li>
          <li>Прогресс, %: ${cprogressPercent.toFixed(1)}%</li>
        </ul>
        <canvas id="${cBlockId}"></canvas>
      `;
      reportDiv.appendChild(cBlock);

      drawChart(cBlockId, cstartDate, cstartValue, cplannedValues, chistoricalValues, ccurrentDate, ccurrentValue, cunit);
    });
  });
}

