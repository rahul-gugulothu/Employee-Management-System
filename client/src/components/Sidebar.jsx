import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi-speedometer2",
    },
    {
      name: "Employees",
      path: "/employees",
      icon: "bi-people-fill",
    },
    {
      name: "Add Employee",
      path: "/add-employee",
      icon: "bi-person-plus-fill",
    },
  ];

  return (
    <div
      className="bg-dark text-white shadow"
      style={{
        width: "260px",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}

      <div className="text-center py-4 border-bottom border-secondary">
        <i
          className="bi bi-building-fill-gear"
          style={{
            fontSize: "3rem",
            color: "#0d6efd",
          }}
        ></i>

        <h4 className="mt-2 fw-bold">
          EMS
        </h4>

        <small className="text-secondary">
          Admin Panel
        </small>
      </div>

      {/* Navigation */}

      <div className="mt-4">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`d-flex align-items-center text-decoration-none px-4 py-3 ${
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-light"
            }`}
            style={{
              transition: "0.3s",
            }}
          >
            <i className={`bi ${item.icon} me-3`}></i>

            <span>{item.name}</span>

          </Link>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;