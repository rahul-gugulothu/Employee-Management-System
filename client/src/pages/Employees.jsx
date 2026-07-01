import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);

      alert("Employee Deleted Successfully!");

      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Employees</h2>

            <Link to="/add-employee" className="btn btn-primary">
              + Add Employee
            </Link>
          </div>

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {employees.length > 0 ? (

                employees.map((emp) => (

                  <tr key={emp._id}>

                    <td>{emp.employeeId}</td>
                    <td>{emp.name}</td>
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

                      <Link
                        to={`/edit-employee/${emp._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="7" className="text-center">
                    No Employees Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}

export default Employees;