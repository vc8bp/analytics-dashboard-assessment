import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VahicalDestribuition = ({ data }) => {
  const vehicleTypeCounts = { BEV: 0, PHEV: 0 };

  data.forEach((item) => {
    if (item["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)") {
      vehicleTypeCounts.BEV++;
    } else if (item["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)") {
      vehicleTypeCounts.PHEV++;
    }
  });

  const chartData = {
    labels: ['BEV', 'PHEV'],
    datasets: [
      {
        label: 'Vehicle Types',
        data: [vehicleTypeCounts.BEV, vehicleTypeCounts.PHEV],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  return (
      <Pie data={chartData} />
  );
};

export default VahicalDestribuition;
