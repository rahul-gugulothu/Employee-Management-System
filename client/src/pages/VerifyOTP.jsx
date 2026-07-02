import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await API.post("/auth/resend-otp", {
        email,
      });

      toast.success(res.data.message);

      setSeconds(60);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to resend OTP"
      );
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
              className="bi bi-shield-lock-fill"
              style={{
                fontSize: "55px",
                color: "#0d6efd",
              }}
            ></i>

            <h2 className="fw-bold mt-3">
              Verify Email
            </h2>

            <p className="text-muted">
              OTP has been sent to
            </p>

            <strong>{email}</strong>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="fw-semibold">
                Enter OTP
              </label>

              <input
                type="text"
                className="form-control form-control-lg text-center"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

          <div className="text-center mt-4">

            {seconds > 0 ? (
              <p className="text-muted">
                Resend OTP in <strong>{seconds}s</strong>
              </p>
            ) : (
              <button
                className="btn btn-link text-decoration-none"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;