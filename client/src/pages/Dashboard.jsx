import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  // Dashboard Statistics
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "active"
  ).length;

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Dashboard</h2>

          <div className="row">
            {/* Total Employees */}
            <div className="col-md-4 mb-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h5>Total Employees</h5>
                  <h2 className="text-primary">{totalEmployees}</h2>
                </div>
              </div>
            </div>

            {/* Active Employees */}
            <div className="col-md-4 mb-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h5>Active Employees</h5>
                  <h2 className="text-success">{activeEmployees}</h2>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="col-md-4 mb-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h5>Departments</h5>
                  <h2 className="text-warning">{totalDepartments}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4>Recent Employees</h4>

            <table className="table table-striped table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Employees Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;