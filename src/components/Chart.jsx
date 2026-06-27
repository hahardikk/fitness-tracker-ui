import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Chart = ({ distribution }) => {
  return (
    <PieChart width={450} height={350}>
      <Pie
        data={distribution}
        dataKey="count"
        nameKey="activityType"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={130}
        label
      >
        {distribution.map((entry, index) => (
          <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} distribution={distribution} />
      <Legend />
    </PieChart>
  );
};

export default Chart;
