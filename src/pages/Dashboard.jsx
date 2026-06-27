import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import Chart from "../components/Chart";
import CaloriesTrendChart from "../components/CaloriesTrendChart";
import ActivityBarChart from "../components/ActivityBarChart";
import { Link } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { activities, loading, error } = useActivity();

  const totalActivities = activities.length;

  const totalCalories = activities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0,
  );

  const averageDuration =
    activities.length > 0
      ? activities.reduce((sum, activity) => sum + activity.duration, 0) /
        activities.length
      : 0;

  const recentActivities = [...activities]
    .toSorted((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 5);

  const distribution = Object.values(
    activities.reduce((acc, activity) => {
      if (!acc[activity.type]) {
        acc[activity.type] = {
          activityType: activity.type,
          count: 0,
        };
      }
      acc[activity.type].count++;
      return acc;
    }, {}),
  );

  const sortedDistribution = [...distribution].sort(
    (a, b) => b.count - a.count,
  );

  const caloriesTrend = Object.values(
    activities.reduce((acc, activity) => {
      const date = new Date(activity.startTime).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = {
          date,
          calories: 0,
        };
      }
      acc[date].calories += activity.caloriesBurned;
      return acc;
    }, {}),
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {loading && (
          <div className="text-center py-10">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <h2 className="text-red-600 text-xl font-semibold">
                ⚠️ Failed to Load Dashboard Data
              </h2>
              <p className="text-gray-600 mt-2">Please try again later.</p>
            </div>
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold">
                📊 No Activity Data Available
              </h2>
              <p className="text-gray-600 mt-2">
                Add some activities to see dashboard analytics.
              </p>
            </div>
          </div>
        )}
        {!loading && !error && activities.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 py-3">
            <h1 className="text-2xl font-bold mb-2">
              Welcome Back, {user?.firstName}👋
            </h1>
            <p className="text-gray-500 mt-1 mb-2">
              Track your fitness journey and stay consistent.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-600">
                  Total Activities
                </h2>

                <p className="text-4xl font-bold mt-4">{totalActivities}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-600">
                  Calories Burned
                </h2>

                <p className="text-4xl font-bold mt-4">{totalCalories}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-600">
                  Most Performed Activity
                </h2>

                <p className="text-2xl font-bold mt-4">
                  {sortedDistribution[0]?.activityType || "N/A"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-gray-600 text-lg font-semibold">
                  Average Duration
                </h3>
                <p className="text-2xl font-bold mt-4">
                  {averageDuration.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-600">
                  Latest Activity
                </h2>
                <p className="text-2xl font-bold mt-4">
                  {recentActivities[0]?.type || "N/A"}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 mt-8">
              <h2 className="text-3xl font-bold mb-6">
                {" "}
                📊 Activity Distribution
              </h2>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                  <Chart distribution={distribution} />
                </div>
                <div className="space-y-5">
                  {distribution.map((item) => (
                    <div
                      key={item.activityType}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <span className="font-semibold text-lg">
                        {item.activityType}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 mt-8">
              <h2 className="text-3xl font-bold mb-6">🔥 Calories Trend</h2>
              <CaloriesTrendChart data={caloriesTrend} />
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 mt-8">
              <h2 className="text-3xl font-bold mb-6">📈 Activity Frequency</h2>
              <div className="max-w-4xl mx-auto">
                <ActivityBarChart data={distribution} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 mt-8 mb-8">
              <h2 className="text-3xl font-bold mb-6"> 📋 Recent Activities</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Activity</th>
                      <th className="text-left p-3">Duration</th>
                      <th className="text-left p-3">Calories</th>
                      <th className="text-left p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity) => (
                      <tr
                        key={activity.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{activity.type}</td>
                        <td className="p-3">{activity.duration} min</td>
                        <td className="p-3">{activity.caloriesBurned}</td>
                        <td className="p-3">
                          {new Date(activity.startTime).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition"
            >
              🤖 Generate AI Recommendations
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
