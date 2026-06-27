const CustomTooltip = ({ distribution }) => {
  const toolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = distribution.reduce((sum, item) => sum + item.count, 0);

      const percentage = ((payload[0].value / total) * 100).toFixed(1);
    }
    return (
      <div className="bg-white p-3 rounded shadow">
        <p>{payload[0].name}</p>
        <p>count: {payload[0].value}</p>
        <p>{percentage}</p>
      </div>
    );
  };
  return null;
};

export default CustomTooltip;
