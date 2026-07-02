import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await API.get(`/employees/${id}`);

        setEmployee({
          ...res.data.employee,
          joiningDate: res.data.employee.joiningDate
            ? res.data.employee.joiningDate.substring(0, 10)
            : "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/employees/${id}`, employee);

      toast.success("Employee Updated Successfully!");

      navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3 p-md-4">

        {/* Header */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">

          <div>
            <h2 className="fw-bold">Edit Employee</h2>

            <p className="text-muted mb-0">
              Update employee information.
            </p>
          </div>

          <i
            className="bi bi-pencil-square text-warning d-none d-md-block"
            style={{ fontSize: "55px" }}
          ></i>

        </div>

        {/* Form */}

        <div className="card shadow border-0">

          <div className="card-body p-3 p-md-4">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Employee ID</label>

                  <input
                    type="text"
                    className="form-control"
                    name="employeeId"
                    value={employee.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Phone Number</label>

                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Department</label>

                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Designation</label>

                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Salary</label>

                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="fw-semibold">Joining Date</label>

                  <input
                    type="date"
                    className="form-control"
                    name="joiningDate"
                    value={employee.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <label className="fw-semibold">Status</label>

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

              <div className="d-grid d-md-flex justify-content-md-end">

                <button
                  type="submit"
                  className="btn btn-warning btn-lg"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Update Employee
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default EditEmployee;