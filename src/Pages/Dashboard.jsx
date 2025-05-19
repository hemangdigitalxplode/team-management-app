// src/pages/Dashboard.jsx
import React from 'react'
import { useUser } from '../context/UserContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Dashboard = () => {
  const { employee } = useUser()
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4">
          <h3>Welcome, {employee?.name || 'Employee'}!</h3>
          <p>Employee ID: {employee?.emp_id}</p>
          <p>Department: {employee?.department}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
