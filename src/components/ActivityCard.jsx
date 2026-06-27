import { FaRobot } from "react-icons/fa";

const ActivityCard = ({
  activity,
  onDelete,
  onRecommendation,
  loadingRecommendation,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{activity.type}</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Duration:</span> {activity.duration}
        </p>

        <p>
          <span className="font-semibold">Calories: </span>{" "}
          {activity.caloriesBurned}
        </p>

        <p>
          <span className="font-semibold">Start Time:</span>{" "}
          {new Date(activity.startTime).toLocaleString()}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Additional Metrics:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(activity.additionalMetrics || {}).map(
            ([key, value]) => (
              <span
                key={key}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {key}: {value}
              </span>
            ),
          )}
        </div>
      </div>
      <div className="flex gap-3 mt-auto pt-6">
        <button
          type="button"
          onClick={() => onRecommendation(activity.id)}
          disabled={loadingRecommendation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex item-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaRobot />
          {loadingRecommendation ? "Generating..." : "AI Recommendation"}
        </button>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("Delete this Activity?")) {
              await onDelete(activity.id);
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
