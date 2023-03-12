import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type DataItem = {
  name: string,
  uv: number,
  pv: number,
  amt: number,
}

type Props = {
  data: DataItem[],
}

const SimpleLineChart = ({ data }: Props) => {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Cough severity" stroke="#82ca9d" />
    </LineChart>
  );
};

export default SimpleLineChart;
