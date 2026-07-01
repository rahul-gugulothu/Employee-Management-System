import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h3>Page Not Found</h3>

      <p className="text-muted">
        The page you are looking for doesn't exist.
      </p>

      <Link to="/dashboard" className="btn btn-primary mt-3">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;