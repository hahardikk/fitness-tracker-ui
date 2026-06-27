import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match");
      setLoading(false);
      return;
    }
    try {
      console.log(formData);
      const response = await api.post("/users/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      console.log("SUCCESS:");
      console.log(response.data);
      setMessage("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          Fitness Tracker
        </h1>

        <p className="text-center text-black font-semibold text-xl mb-8">Create Your Account</p>
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2.5"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl mt-1 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
