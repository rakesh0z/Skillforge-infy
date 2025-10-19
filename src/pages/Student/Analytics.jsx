import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Score',
        data: [65, 59, 80, 81],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      }
    ]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics</h2>
      <div style={{ maxWidth: 700 }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Analytics;
