import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Enero", valor: Math.random() * 100 },
  { name: "Febrero", valor: Math.random() * 100 },
  { name: "Marzo", valor: Math.random() * 100 },
  { name: "Abril", valor: Math.random() * 100 },
  { name: "Mayo", valor: Math.random() * 100 },
  { name: "Junio", valor: Math.random() * 100 },
];
export const Dashboard = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" />
    </LineChart>
  );
};
