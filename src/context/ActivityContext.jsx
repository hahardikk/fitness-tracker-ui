import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setActivities([]);
        setLoading(false);
        return;
      }

      const response = await api.get("/activities/get", {
        headers: {
          "X-User-Id": user.id,
        },
      });

      setActivities(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const addActivity = async (payload) => {
    try {
      setLoading(true);
      const response = await api.post("/activities/add", payload);
      setActivities((prev) => [response.data, ...prev]);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      await api.delete(`/activities/${id}`);

      setActivities((prev) => prev.filter((activity) => activity.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const generateRecommendation = async (activityId) => {
    try {
      setLoadingRecommendation(true);

      const response = await api.post(`/recommendation/generate/${activityId}`);

      setSelectedRecommendation(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchActivities();
    }
  }, []);

  const value = useMemo(
    () => ({
      activities,
      loading,
      error,
      fetchActivities,
      addActivity,
      deleteActivity,
      generateRecommendation,
      selectedRecommendation,
      loadingRecommendation,
      setSelectedRecommendation,
    }),
    [activities, loading, error, selectedRecommendation, loadingRecommendation],
  );

  return (
    <ActivityContext.Provider
      value={value}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
