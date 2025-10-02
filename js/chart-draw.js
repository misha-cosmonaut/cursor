function drawChart(canvasId, startDate, startValue, plannedValues, historicalValues, currentDate, currentValue, unit) {
  const labels = [];
  const plannedData = [];
  const actualData = [];

  if (startDate) labels.push(startDate);
  plannedValues.forEach(p => { if (!labels.includes(p.date)) labels.push(p.date); });
  historicalValues.forEach(h => { if (!labels.includes(h.date)) labels.push(h.date); });
  if (currentDate && !labels.includes(currentDate)) labels.push(currentDate);
  labels.sort();

  labels.forEach(d => {
    if (d === startDate) {
      plannedData.push(startValue);
      actualData.push(startValue);
    } else {
      const p = plannedValues.find(p => p.date === d);
      plannedData.push(p ? p.value : null);

      const h = historicalValues.find(h => h.date === d);
      if (h) {
        actualData.push(h.value);
      } else if (d === currentDate) {
        actualData.push(currentValue);
      } else {
        actualData.push(null);
      }
    }
  });

  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        { label: "План (" + unit + ")", data: plannedData, borderColor: "blue", fill: false, spanGaps: true },
        { label: "Факт (" + unit + ")", data: actualData, borderColor: "red", fill: false, spanGaps: true }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

