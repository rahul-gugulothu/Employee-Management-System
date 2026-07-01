import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "active",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", employee);

      toast.success("Employee Added Successfully!");

      navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          {/* Page Header */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold">
                Add Employee
              </h2>

              <p className="text-muted mb-0">
                Fill in the employee details below.
              </p>
            </div>

            <i
              className="bi bi-person-plus-fill text-primary"
              style={{ fontSize: "55px" }}
            ></i>

          </div>

          {/* Form */}

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Employee ID
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      placeholder="EMP001"
                      value={employee.employeeId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      name="name"
                      value={employee.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="john@example.com"
                      name="email"
                      value={employee.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="9876543210"
                      name="phone"
                      value={employee.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Department
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="IT"
                      name="department"
                      value={employee.department}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Designation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Software Engineer"
                      name="designation"
                      value={employee.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Salary
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="50000"
                      name="salary"
                      value={employee.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Joining Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="joiningDate"
                      value={employee.joiningDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={employee.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                </div>

                <div className="text-end">

                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Add Employee
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddEmployee;