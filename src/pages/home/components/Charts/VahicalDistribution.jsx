import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PopularMakesChart = ({ data }) => {
  const makeCounts = {};

  data.forEach((item) => {
    const make = item.Make;
    if (makeCounts[make]) {
      makeCounts[make]++;
    } else {
      makeCounts[make] = 1;
    }
  });

  const makes = Object.keys(makeCounts).slice(0, 10); 
  const counts = makes.map((make) => makeCounts[make]);

  const chartData = {
    labels: makes,
    datasets: [
      {
        label: 'Most Popular Makes',
        data: counts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
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

export default PopularMakesChart;
