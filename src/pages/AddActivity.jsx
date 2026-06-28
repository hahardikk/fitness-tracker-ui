import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useActivity } from "../context/ActivityContext";

const convertValue = (value) => {
  if (!isNaN(value) && value !== "") {
    return Number(value);
  }
  return value;
};

const toCamelCase = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

const AddActivity = () => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [startTime, setStartTime] = useState("");
  const [metrics, setMetrics] = useState([{ key: "", value: "" }]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");

  const dateRef = useRef(null);

  const { addActivity, loading } = useActivity();

  const addMetric = () => {
    setMetrics([...metrics, { key: "", value: "" }]);
  };

  const updateMetric = (index, field, value) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index][field] = value;
    setMetrics(updatedMetrics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setsuccess("");

      const additionalMetrics = {};

      metrics.forEach((metric) => {
        if (metric.key.trim() !== "") {
          additionalMetrics[toCamelCase(metric.key)] = convertValue(
            metric.value,
          );
        }
      });

      const payload = {
        userId: localStorage.getItem("userId"),

        type,

        duration: Number(duration),

        caloriesBurned: Number(caloriesBurned),

        additionalMetrics,

        startTime,
      };

      const saved = await addActivity(payload);

      if (!saved) {
        throw new Error();
      }

      setsuccess("Activity saved Successfully");

      setType("");

      setDuration("");

      setCaloriesBurned("");

      setStartTime("");

      setMetrics([{ key: "", value: "" }]);
    } catch {
      setError("Failed to save Activity");
    }
  };

  const openDatePicker = () => {
    dateRef.current?.showPicker?.();
    dateRef.current?.focus();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 mb-20 bg-white p-8 rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300">
        <h1 className="text-4xl font-bold mb-2">Add New Activity 💪</h1>
        <p className="text-gray-500 mb-6">
          Track your workout and fitness progress
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 ">
          <select
            id="activityType"
            name="activityType"
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Activity</option>
            <option value="RUNNING">RUNNING</option>
            <option value="WALKING">WALKING</option>
            <option value="CYCLING">CYCLING</option>
            <option value="SWIMMING">SWIMMING</option>
            <option value="WEIGHT_TRAINING">WEIGHT_TRAINING</option>
            <option value="GYM">GYM</option>
            <option value="YOGA">YOGA</option>
            <option value="CARDIO">CARDIO</option>
            <option value="STRETCHING">STRETCHING</option>
            <option value="OTHER">OTHER</option>
          </select>
          <label className="text-black text-md" htmlFor="duration">
            Duration(in minutes)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            placeholder="Duration(minutes)"
            required
            value={duration}
            min="0"
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
          <label className="text-black text-md" htmlFor="calories">
            Calories Burned
          </label>
          <input
            required
            id="calories"
            name="calories"
            type="number"
            placeholder="Calories Burned"
            value={caloriesBurned}
            min="0"
            onChange={(e) => {
              setCaloriesBurned(e.target.value);
            }}
            className="w-full rounded-lg border p-3"
          />

          <div className="border-t pt-2">
            <h3 className="text-black text-xl mb-1">Additional Metrics 📊</h3>
            <p className="text-gray-500 text-sm mb-2">
              Add custom workout details
            </p>
            <div className="space-y-3">
              {metrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Metric Name"
                    value={metric.key}
                    onChange={(e) => updateMetric(index, "key", e.target.value)}
                    className="border rounded-lg p-3"
                  />
                  <input
                    placeholder="Metric Value"
                    value={metric.value}
                    onChange={(e) =>
                      updateMetric(index, "value", e.target.value)
                    }
                    className="border rounded-lg p-3"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={addMetric}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-lg font-medium transition"
          >
            Add More
          </button>
          <label className="block mb-1" htmlFor="startTime">
            Workout Date & Time
          </label>
          <input
            type="datetime-local"
            ref={dateRef}
            id="startTime"
            name="startTime"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            onClick={openDatePicker}
            className="w-full border rounded-lg p-3"
          />
          {success && (
            <p className="text-green-600 text-center mb-3">{success}</p>
          )}

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save Activity"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddActivity;
