import ActivityCard from "../components/ActivityCard";
import Navbar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useActivity } from "../context/ActivityContext";

const Activities = () => {
  const {
    activities,
    loading,
    error,
    deleteActivity,
    generateRecommendation,
    selectedRecommendation,
    loadingRecommendation,
    setSelectedRecommendation,
  } = useActivity();

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">My Activities 💪</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-center py-10">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <h2 className="text-red-600 text-xl font-semibold">
                ⚠️ Failed to Load Activities
              </h2>
              <p className="text-gray-600 mt-2">Please try again later.</p>
            </div>
          )}

          {!error && !loading && activities.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-md p-10 text-center">
              <h2 className="text-2xl font-bold">🏃 No Activities Yet</h2>
              <p className="text-gray-500 mt-2">
                Start tracking your fitness journey.
              </p>
            </div>
          )}

          {!error &&
            !loading &&
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onDelete={deleteActivity}
                onRecommendation={generateRecommendation}
                loadingRecommendation={loadingRecommendation}
              />
            ))}
        </div>
      </div>
      {(selectedRecommendation || loadingRecommendation) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white pt-1 px-8 pb-8 rounded-2xl max-w-3xl w-full shadow-2xl max-h-[80vh] overflow-y-auto relative">
            {!loadingRecommendation && (
              <button
                type="button"
                onClick={() => setSelectedRecommendation(null)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 cursor-pointer rounded-lg z-50"
              >
                ✕
              </button>
            )}
            <h2 className="text-2xl font-bold mb-4">AI Recommendation</h2>

            {loadingRecommendation ? (
              <LoadingSpinner />
            ) : (
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-lg text-blue-600">
                    Recommendation
                  </h3>
                  <p className="mt-2 text-gray-700">
                    {selectedRecommendation.recommendation}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-600">
                    Improvements
                  </h3>
                  <ul className="list-disc ml-5 mt-2 space-y-l">
                    {selectedRecommendation.improvement?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-red-600">
                    Safety Tips
                  </h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {selectedRecommendation.safety?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-purple-600">
                    Suggestion
                  </h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {selectedRecommendation.suggestion?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Activities;
