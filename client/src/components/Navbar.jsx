import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Remove JWT token
    localStorage.removeItem("token");

    // Show success notification
    toast.success("Logged out successfully!");

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
      style={{ backgroundColor: "#0d6efd" }}
    >
      <div className="container-fluid">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <i
            className="bi bi-building-fill-gear me-2"
            style={{ fontSize: "1.8rem", color: "white" }}
          ></i>

          <span
            className="navbar-brand fw-bold mb-0"
            style={{ fontSize: "1.3rem" }}
          >
            Employee Management System
          </span>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center ms-auto">

          <div className="text-end me-3">
            <div
              className="fw-semibold text-white"
              style={{ fontSize: "15px" }}
            >
              Welcome
            </div>

            <small className="text-light">
              Administrator
            </small>
          </div>

          <button
            className="btn btn-light d-flex align-items-center"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;