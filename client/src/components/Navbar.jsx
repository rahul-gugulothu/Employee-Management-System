import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <nav
      className="navbar navbar-dark shadow-sm sticky-top"
      style={{
        backgroundColor: "#0d6efd",
        zIndex: 1100,
      }}
    >
      <div className="container-fluid">

        {/* Left */}

        <div className="d-flex align-items-center">

          {/* Mobile Menu */}

          <button
            className="btn btn-link text-white d-lg-none me-2 p-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            <i className="bi bi-list"></i>
          </button>

          <i
            className="bi bi-building-fill-gear me-2"
            style={{
              fontSize: "1.7rem",
            }}
          ></i>

          <span
            className="navbar-brand mb-0 fw-bold"
            style={{
              fontSize: "clamp(1rem,2vw,1.3rem)",
            }}
          >
            Employee Management System
          </span>

        </div>

        {/* Right */}

        <div className="d-flex align-items-center">

          <div className="text-end me-3 d-none d-md-block">

            <div className="fw-semibold text-white">
              Welcome
            </div>

            <small className="text-light">
              Administrator
            </small>

          </div>

          <button
            className="btn btn-light btn-sm"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>

            <span className="d-none d-sm-inline">
              Logout
            </span>

          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;