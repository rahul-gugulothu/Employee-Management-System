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

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "inactive"
  ).length;

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary),
    0
  );

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          {/* Welcome Card */}

          <div className="card bg-primary text-white shadow border-0 mb-4">
            <div className="card-body">
              <h3>Welcome Admin 👋</h3>
              <p className="mb-0">
                Manage employees, departments and company records from one place.
              </p>
            </div>
          </div>

          <h2 className="mb-4">Dashboard</h2>

          <div className="row">

            {/* Total Employees */}

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <i className="bi bi-people-fill display-4 text-primary"></i>

                  <h5 className="mt-3">Total Employees</h5>

                  <h2 className="fw-bold">{totalEmployees}</h2>
                </div>
              </div>
            </div>

            {/* Active Employees */}

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <i className="bi bi-person-check-fill display-4 text-success"></i>

                  <h5 className="mt-3">Active Employees</h5>

                  <h2 className="fw-bold">{activeEmployees}</h2>
                </div>
              </div>
            </div>

            {/* Inactive Employees */}

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <i className="bi bi-person-x-fill display-4 text-danger"></i>

                  <h5 className="mt-3">Inactive Employees</h5>

                  <h2 className="fw-bold">{inactiveEmployees}</h2>
                </div>
              </div>
            </div>

            {/* Departments */}

            <div className="col-lg-6 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <i className="bi bi-building display-4 text-warning"></i>

                  <h5 className="mt-3">Departments</h5>

                  <h2 className="fw-bold">{totalDepartments}</h2>
                </div>
              </div>
            </div>

            {/* Total Salary */}

            <div className="col-lg-6 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <i className="bi bi-currency-rupee display-4 text-info"></i>

                  <h5 className="mt-3">Total Salary</h5>

                  <h2 className="fw-bold">
                    ₹ {totalSalary.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* Recent Employees */}

          <div className="card shadow border-0 mt-4">

            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Recent Employees</h4>
            </div>

            <div className="card-body">

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-primary">

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

        </div>
      </div>
    </>
  );
}

export default Dashboard;