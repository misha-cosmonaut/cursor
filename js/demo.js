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

    // Goal planned rows (4-5 точек в году)
    const goalPlanPoints = [
      { value: '102', date: '2025-02-01' },
      { value: '105', date: '2025-03-01' },
      { value: '110', date: '2025-05-01' },
      { value: '115', date: '2025-08-01' },
      { value: '118', date: '2025-11-01' }
    ];
    const addPlannedBtn = goalFieldset.querySelector('.add-planned-value');
    if (addPlannedBtn) {
      goalPlanPoints.forEach(p => {
        addPlannedBtn.click();
        const rows = goalFieldset.querySelectorAll('.planned-values-list .value-row');
        const row = rows[rows.length - 1];
        row.querySelector('.planned-value').value = p.value;
        row.querySelector('.planned-date').value = p.date;
      });
    }

    // Goal historical rows (4 точки)
    const goalHistPoints = [
      { value: '101', date: '2025-01-15' },
      { value: '103', date: '2025-03-15' },
      { value: '108', date: '2025-05-15' },
      { value: '109', date: '2025-07-15' }
    ];
    const addHistBtn = goalFieldset.querySelector('.add-historical-value');
    if (addHistBtn) {
      goalHistPoints.forEach(p => {
        addHistBtn.click();
        const rows = goalFieldset.querySelectorAll('.historical-values-list .value-row');
        const row = rows[rows.length - 1];
        row.querySelector('.historical-value').value = p.value;
        row.querySelector('.historical-date').value = p.date;
      });
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

        // Criterion planned rows
        const cPlanPoints = [
          { value: '1100', date: '2025-02-01' },
          { value: '1200', date: '2025-04-01' },
          { value: '1300', date: '2025-06-01' },
          { value: '1400', date: '2025-09-01' },
          { value: '1450', date: '2025-11-01' }
        ];
        const cAddPlanned = crit.querySelector('.c_add-planned');
        if (cAddPlanned) {
          cPlanPoints.forEach(p => {
            cAddPlanned.click();
            const rows = crit.querySelectorAll('.c-planned-list .value-row');
            const row = rows[rows.length - 1];
            row.querySelector('.planned-value').value = p.value;
            row.querySelector('.planned-date').value = p.date;
          });
        }

        // Criterion historical rows
        const cHistPoints = [
          { value: '1050', date: '2025-02-01' },
          { value: '1120', date: '2025-03-15' },
          { value: '1180', date: '2025-05-15' },
          { value: '1190', date: '2025-07-15' }
        ];
        const cAddHist = crit.querySelector('.c_add-historical');
        if (cAddHist) {
          cHistPoints.forEach(p => {
            cAddHist.click();
            const rows = crit.querySelectorAll('.c-historical-list .value-row');
            const row = rows[rows.length - 1];
            row.querySelector('.historical-value').value = p.value;
            row.querySelector('.historical-date').value = p.date;
          });
        }
      }

      // Generate report after all fills
      generateReport();
    }, 50);
  }, 50);
}


