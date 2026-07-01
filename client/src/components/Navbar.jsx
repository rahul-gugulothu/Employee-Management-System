import React from "react";

function Navbar() {
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

          <button className="btn btn-light btn-sm">
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;