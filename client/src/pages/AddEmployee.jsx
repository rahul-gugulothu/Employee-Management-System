import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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

      alert("Employee Added Successfully!");

      navigate("/employees");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container p-4">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3>Add Employee</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Employee ID</label>

                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={employee.employeeId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={employee.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={employee.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Phone</label>

                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      value={employee.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Department</label>

                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={employee.department}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Designation</label>

                    <input
                      type="text"
                      className="form-control"
                      name="designation"
                      value={employee.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Salary</label>

                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      value={employee.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Joining Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="joiningDate"
                      value={employee.joiningDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <button className="btn btn-success">
                  Add Employee
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddEmployee;