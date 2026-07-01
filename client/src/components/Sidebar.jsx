import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        minHeight: "100vh",
        width: "250px"
      }}
    >
      <h3 className="mb-4">EMS</h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link to="/dashboard" className="nav-link text-white">
            🏠 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link to="/employees" className="nav-link text-white">
            👨 Employees
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link to="/add-employee" className="nav-link text-white">
            ➕ Add Employee
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;