// src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/new-dx-logo-updated.png'

const Sidebar = () => {
  return (
    <div className="sidebar text-white vh-100 p-3" style={{ width: '250px', position: 'sticky', top: 0 }}>
      {/* <h5 className="mb-4">Employee Panel</h5> */}
      <img src={Logo} alt="Logo" className="mb-3 sidebarLogo" />
      <ul className="nav flex-column sidebarLinks">

      <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
           Home
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/task"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
           My Tasks
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/attendance"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
            Attendance
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/leave-management"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
            Leave Management
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/office-events"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
            Office Events
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink
            to="/dashboard/team-chat"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active-link' : 'text-white'}`
            }
          >
            Team Chat
          </NavLink>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar
