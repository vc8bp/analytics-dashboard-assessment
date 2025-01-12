import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const EVYearChart = ({ data }) => {
  const yearCounts = {};

  data.forEach((item) => {
    const year = item["Model Year"];
    if (yearCounts[year]) {
      yearCounts[year]++;
    } else {
      yearCounts[year] = 1;
    }
  });

  const years = Object.keys(yearCounts).sort((a, b) => a - b);
  const counts = years.map((year) => yearCounts[year]);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'EV Growth Over Years',
        data: counts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
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
      <Line data={chartData} options={chartOptions}  />
  );
};

export default EVYearChart;
