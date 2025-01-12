import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CityEVBarChart = ({ data }) => {
  const cityCounts = {};
  data.forEach((item) => {
    const city = item.City;
    if (cityCounts[city]) {
      cityCounts[city]++;
    } else {
      cityCounts[city] = 1;
    }
  });

  const cities = Object.keys(cityCounts);
  const counts = Object.values(cityCounts);

  const chartData = {
    labels: cities,
    datasets: [
      {
        label: 'Number of EVs',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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

  return <Bar data={chartData} options={chartOptions} />;
};

export default CityEVBarChart;
