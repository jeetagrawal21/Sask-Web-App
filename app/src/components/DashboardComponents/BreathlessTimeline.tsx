import React from 'react';
import { Line } from 'react-chartjs-2';

function BreathlessTimeline({ data }: any) {
  const chartData = {
    labels: data.map((item: any) => item['Response Time']),
    datasets: [
      {
        label: 'Breathlessness',
        data: data.map(
          (item: any) =>
            item['[162_VAS] Right now how breathless are you on a scale of 0-1']
        ),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D',
          },
        },
        ticks: {
          source: 'auto',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} />;
}

export default BreathlessTimeline;
