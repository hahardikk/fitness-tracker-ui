import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import Activities from "../pages/Activities";
import AddActivity from "../pages/AddActivity";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/add-activity"
        element={
          <ProtectedRoutes>
            <AddActivity />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/activities"
        element={
          <ProtectedRoutes>
            <Activities />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
