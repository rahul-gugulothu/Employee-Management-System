import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    alert("Logged out successfully!");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">

        <span className="navbar-brand fw-bold">
          Employee Management System
        </span>

        <div className="ms-auto d-flex align-items-center">

          <span className="text-white me-3">
            Welcome, Admin
          </span>

          <button
            className="btn btn-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;