import React, { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);

      setEmail("");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right,#4facfe,#00f2fe)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">

            <i
              className="bi bi-envelope-lock-fill"
              style={{
                fontSize: "55px",
                color: "#0d6efd",
              }}
            ></i>

            <h2 className="fw-bold mt-3">
              Forgot Password
            </h2>

            <p className="text-muted">
              Enter your registered email
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </form>

          <div className="text-center mt-4">

            <Link
              to="/"
              className="text-decoration-none"
            >
              Back to Login
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;