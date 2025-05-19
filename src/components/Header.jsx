// src/components/Header.jsx
import React from 'react'

const Header = () => {
  return (
    <div className="d-flex justify-content-end align-items-center p-3 border-bottom">
      <a href='/'>
        <button className='btn btn-sm btn-danger mx-4'>Logout</button>
      </a>

      <i className="bi bi-bell me-3 fs-5" role="button" title="Notifications"></i>
      <img
        src="https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.jpg?s=612x612&w=0&k=20&c=DB5oXy7_aasPbpr7zfpfV92ZYsPIQfFWLyweKEz_UVs="
        alt="Profile"
        className="rounded-circle"
        width="35"
        height="35"
      />
    </div>
  )
}

export default Header
