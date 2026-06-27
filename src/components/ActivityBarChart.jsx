import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ActivityBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey={"activityType"} tick={{ fontSize: 14 }}/>
        <YAxis allowDecimals={false}/>
        <Tooltip />
        <Bar dataKey="count" radius={[10, 10, 0, 0]} fill="#2563eb" barSize={50}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityBarChart;
