import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/employees"
  element={
    <ProtectedRoute>
      <Employees />
    </ProtectedRoute>
  }
/>
<Route path="/register" element={<Register />} />
<Route
  path="/add-employee"
  element={
    <ProtectedRoute>
      <AddEmployee />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-employee/:id"
  element={
    <ProtectedRoute>
      <EditEmployee />
    </ProtectedRoute>
  }
/>

      </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;