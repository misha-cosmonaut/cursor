function runDemo() {
  // Header
  document.getElementById('reportDate').value = '2025-06-30';
  document.getElementById('department').value = 'Sales Department';
  document.getElementById('responsible').value = 'John Doe';

  // Add goal
  addGoal();
  // Wait for dynamic handlers to attach
  setTimeout(() => {
    const goalFieldset = document.querySelector('#goalsContainer fieldset.goal');
    if (!goalFieldset) return;

    goalFieldset.querySelector("input[name='name']").value = 'Увеличить продажи';
    goalFieldset.querySelector("input[name='desc']").value = 'Рост на 20%';
    goalFieldset.querySelector("input[name='unit']").value = '%';
    goalFieldset.querySelector("input[name='startValue']").value = '100';
    goalFieldset.querySelector("input[name='startDate']").value = '2025-01-01';
    goalFieldset.querySelector("input[name='targetValue']").value = '120';
    goalFieldset.querySelector("input[name='targetDate']").value = '2025-12-31';
    goalFieldset.querySelector("input[name='currentValue']").value = '110';
    goalFieldset.querySelector("input[name='currentDate']").value = '2025-06-01';

    // Goal planned row
    const addPlannedBtn = goalFieldset.querySelector('.add-planned-value');
    if (addPlannedBtn) addPlannedBtn.click();
    const gPlannedRow = goalFieldset.querySelector('.planned-values-list .value-row');
    if (gPlannedRow) {
      gPlannedRow.querySelector('.planned-value').value = '105';
      gPlannedRow.querySelector('.planned-date').value = '2025-03-01';
    }

    // Goal historical row
    const addHistBtn = goalFieldset.querySelector('.add-historical-value');
    if (addHistBtn) addHistBtn.click();
    const gHistRow = goalFieldset.querySelector('.historical-values-list .value-row');
    if (gHistRow) {
      gHistRow.querySelector('.historical-value').value = '102';
      gHistRow.querySelector('.historical-date').value = '2025-02-01';
    }

    // Add criterion
    const addCritBtn = goalFieldset.querySelector('.add-criterion');
    if (addCritBtn) addCritBtn.click();

    // Wait a tick for criterion block
    setTimeout(() => {
      const crit = goalFieldset.querySelector('.criteria-list .criterion');
      if (crit) {
        crit.querySelector("input[name='c_name']").value = 'Лиды';
        crit.querySelector("input[name='c_desc']").value = 'Рост лидов';
        crit.querySelector("input[name='c_unit']").value = 'шт';
        crit.querySelector("input[name='c_startValue']").value = '1000';
        crit.querySelector("input[name='c_startDate']").value = '2025-01-01';
        crit.querySelector("input[name='c_targetValue']").value = '1500';
        crit.querySelector("input[name='c_targetDate']").value = '2025-12-31';
        crit.querySelector("input[name='c_currentValue']").value = '1200';
        crit.querySelector("input[name='c_currentDate']").value = '2025-06-01';

        // Criterion planned
        const cAddPlanned = crit.querySelector('.c_add-planned');
        if (cAddPlanned) cAddPlanned.click();
        const cPlannedRow = crit.querySelector('.c-planned-list .value-row');
        if (cPlannedRow) {
          cPlannedRow.querySelector('.planned-value').value = '1300';
          cPlannedRow.querySelector('.planned-date').value = '2025-03-01';
        }

        // Criterion historical
        const cAddHist = crit.querySelector('.c_add-historical');
        if (cAddHist) cAddHist.click();
        const cHistRow = crit.querySelector('.c-historical-list .value-row');
        if (cHistRow) {
          cHistRow.querySelector('.historical-value').value = '1100';
          cHistRow.querySelector('.historical-date').value = '2025-02-01';
        }
      }

      // Generate report after all fills
      generateReport();
    }, 50);
  }, 50);
}


