// src/components/Header.jsx
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext'; // adjust path as needed

const Header = () => {
  const navigate = useNavigate();
  const { setEmployee } = useUser(); // Get context setter

  const handleLogout = () => {
    setEmployee(null); // Clear context state
    localStorage.removeItem('employee'); // Clear localStorage
    toast.warn('Logged out successfully!');
    navigate('/'); // Redirect to login
  };

  return (
    <div className="d-flex justify-content-end align-items-center p-3 border-bottom">
      <li style={{ listStyle: 'none' }} className='nav-item'>
        <button className='btn btn-sm btn-danger mx-4' onClick={handleLogout}>
          Logout
        </button>
      </li>

      <li style={{ listStyle: 'none' }} className='nav-item'>
        <NavLink to="/dashboard/notification">
          <i className="bi bi-bell me-3 fs-5" role="button" title="Notifications"></i>
        </NavLink>
      </li>

      <li style={{ listStyle: 'none' }} className='nav-item'>
        <img
          src="https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.jpg?s=612x612&w=0&k=20&c=DB5oXy7_aasPbpr7zfpfV92ZYsPIQfFWLyweKEz_UVs="
          alt="Profile"
          className="rounded-circle"
          width="35"
          height="35"
        />
      </li>
    </div>
  );
};

export default Header;
