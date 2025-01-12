import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ElectricRangeChart = ({ data }) => {
  const rangeCounts = { '0-100': 0, '101-200': 0, '201-300': 0, '301+': 0 };

  data.forEach((item) => {
    const range = item["Electric Range"];
    if (range > 0 && range <= 100) rangeCounts['0-100']++;
    else if (range > 100 && range <= 200) rangeCounts['101-200']++;
    else if (range > 200 && range <= 300) rangeCounts['201-300']++;
    else if (range > 300) rangeCounts['301+']++;
  });

  const chartData = {
    labels: ['0-100 miles', '101-200 miles', '201-300 miles', '301+ miles'],
    datasets: [
      {
        label: 'Electric Range Distribution',
        data: Object.values(rangeCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
      <Bar data={chartData} options={chartOptions} />
  );
};

export default ElectricRangeChart;
