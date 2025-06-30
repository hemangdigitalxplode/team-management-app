// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import axiosInstance from '../api/axios'

const Dashboard = () => {
  const { employee } = useUser()
  console.log(employee)
  console.log('Employee tasks:', employee?.tasks);
  const [employeeTasks, setEmployeeTasks] = useState([]);

  // Provide greetings to employee
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // fetching the tasks of employees.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (employee?.emp_id) {
          const res = await axiosInstance.get(`/employee-tasks/${employee.emp_id}`);
          console.log('Fetched tasks:', res.data.tasks);
          setEmployeeTasks(res.data.tasks);
        }
      } catch (err) {
        console.error('Error fetching employee tasks:', err);
      }
    };

    fetchTasks();
  }, [employee?.emp_id]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4">
          <h3>
            {getGreeting()}, {employee?.name || 'Employee'}!
          </h3>
          <p className="text-muted small mt-1">
            Welcome to XplodeFlowPilot — manage your tasks efficiently, stay on track, and never miss a deadline.
          </p>
          <div className="row mt-4">
            {/* Employee ID */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-person-badge fs-4"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Employee ID</h6>
                    <h5 className="mb-0">{employee?.emp_id}</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Department */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-diagram-3 fs-4"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Department</h6>
                    <h5 className="mb-0">{employee?.department}</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Post */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-award fs-4"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Post</h6>
                    <h5 className="mb-0">DX Member</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-envelope-at fs-4"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">Contact</h6>
                    <h6 className="mb-0">{employee?.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="row mt-4">
            {/* Card 1 - Total Tasks */}
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-primary h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Tasks</h5>
                  <h3 className="card-text">{employeeTasks.length}</h3>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <a href="/dashboard/task" className="text-white text-decoration-none d-flex justify-content-between align-items-center">
                    More info <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 - Completed Tasks */}
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-success h-100">
                <div className="card-body">
                  <h5 className="card-title">Completed Tasks</h5>
                  <h3 className="card-text">
                    {employeeTasks.filter(task => task.status === 'Completed').length}
                  </h3>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <a href="/dashboard/task" className="text-white text-decoration-none d-flex justify-content-between align-items-center">
                    More info <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 - Overdue Tasks */}
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-danger h-100">
                <div className="card-body">
                  <h5 className="card-title">Overdue Tasks</h5>
                  <h3 className="card-text">{Math.floor(Math.random() * 4) + 1}</h3>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <a href="/dashboard/task" className="text-white text-decoration-none d-flex justify-content-between align-items-center">
                    More info <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4 - Pending Tasks */}
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-warning h-100">
                <div className="card-body">
                  <h5 className="card-title">Pending Tasks</h5>
                  <h3 className="card-text">
                    {employeeTasks.filter(task => task.status === 'Pending').length}
                  </h3>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <a href="/dashboard/task" className="text-white text-decoration-none d-flex justify-content-between align-items-center">
                    More info <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
