import React from 'react';
import { Line } from 'react-chartjs-2';

function BrainFogTimeline({ data }: any) {
  const chartData = {
    labels: data.map((item: any) => item['Response Time']),
    datasets: [
      {
        label: 'Brain Fog',
        data: data.map(
          (item: any) =>
            item['[126_VAS] Right now how severe is your brain fog on a scale ']
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

export default BrainFogTimeline;
