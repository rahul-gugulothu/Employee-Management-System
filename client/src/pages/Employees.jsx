import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);

      toast.success("Employee Deleted Successfully!");

      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="container-fluid p-3 p-md-4">

        {/* Header */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">

          <div>
            <h2 className="fw-bold mb-1">Employees</h2>

            <p className="text-muted mb-0">
              Total Employees : {employees.length}
            </p>
          </div>

          <Link
            to="/add-employee"
            className="btn btn-primary w-100 w-md-auto"
          >
            <i className="bi bi-person-plus-fill me-2"></i>
            Add Employee
          </Link>

        </div>

        {/* Search */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email or Department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Table */}

        <div className="card shadow border-0">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>
                    <th>Employee</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredEmployees.length > 0 ? (

                    filteredEmployees.map((emp) => (

                      <tr key={emp._id}>

                        <td>

                          <div className="d-flex align-items-center">

                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                              style={{
                                width: "45px",
                                height: "45px",
                                minWidth: "45px",
                                fontWeight: "bold",
                              }}
                            >
                              {emp.name.charAt(0).toUpperCase()}
                            </div>

                            <div>

                              <div className="fw-semibold">
                                {emp.name}
                              </div>

                              <small className="text-muted">
                                {emp.employeeId}
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>{emp.email}</td>

                        <td>{emp.department}</td>

                        <td>{emp.designation}</td>

                        <td>

                          <span
                            className={`badge ${
                              emp.status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {emp.status}
                          </span>

                        </td>

                        <td>

                          <div className="d-flex gap-2">

                            <Link
                              to={`/edit-employee/${emp._id}`}
                              className="btn btn-warning btn-sm"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(emp._id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-4"
                      >

                        <i className="bi bi-search fs-1 text-secondary"></i>

                        <p className="mt-3">
                          No Employees Found
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Employees;