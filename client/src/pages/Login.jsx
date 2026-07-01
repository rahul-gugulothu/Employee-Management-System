import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <i
              className="bi bi-person-workspace"
              style={{
                fontSize: "55px",
                color: "#0d6efd",
              }}
            ></i>

            <h2 className="fw-bold mt-3">
              Employee Management
            </h2>

            <p className="text-muted">
              Admin Login
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              type="submit"
            >
              Login
            </button>

            <div className="text-center mt-4">
              Don't have an account?

              <Link
                to="/register"
                className="text-decoration-none ms-2"
              >
                Register
              </Link>
            </div>
          </form>

          <hr />

          <div className="text-center text-muted">
            <small>
              Employee Management System
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;