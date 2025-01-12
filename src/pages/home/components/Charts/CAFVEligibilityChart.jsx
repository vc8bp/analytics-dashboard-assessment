import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CAFVEligibilityChart = ({ data }) => {
  const eligibilityCounts = { Eligible: 0, NotEligible: 0, Unknown: 0 };

  data.forEach((item) => {
    const eligibility = item['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    if (eligibility === 'Clean Alternative Fuel Vehicle Eligible') {
      eligibilityCounts.Eligible++;
    } else if (eligibility === 'Not eligible due to low battery range') {
      eligibilityCounts.NotEligible++;
    } else {
      eligibilityCounts.Unknown++;
    }
  });

  const chartData = {
    labels: ['Eligible', 'Not Eligible', 'Eligibility Unknown'],
    datasets: [
      {
        label: 'CAFV Eligibility',
        data: Object.values(eligibilityCounts),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
  };

  return <Pie data={chartData} options={chartOptions} />
  
};

export default CAFVEligibilityChart;
