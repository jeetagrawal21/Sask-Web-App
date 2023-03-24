import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../../stylings/DashboardStyles/Graph.css";

type DataItem = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
};

type Props = {
  data: DataItem[];
};

const Graph = ({ data }: Props) => {
  return (
    <LineChart className="graph-container" width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Cough severity" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Graph;
