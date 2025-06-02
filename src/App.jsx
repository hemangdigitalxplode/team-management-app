// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import EmployeeLogin from './Pages/EmployeeLogin'
import Dashboard from './Pages/Dashboard'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tasks from './Pages/Tasks'
// import AddTask from './Pages/AddTask'
import AddTask from './Pages/AddTask'
import Attendance from './Pages/Attendance'
import OfficeEvents from './Pages/OfficeEvents'
import DXChat from './Pages/DXChat'
import TaskDetails from './Pages/TaskDetails';
import Notifications from './Pages/Notifications';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/task" element={<Tasks />} />
        <Route path='/dashboard/task/:id' element={<TaskDetails/>} />
        <Route path="/dashboard/add-task" element={<AddTask />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/leave-management" element={<Attendance />} />
        <Route path="/dashboard/office-events" element={<OfficeEvents />} />
        <Route path="/dashboard/team-chat" element={<DXChat />} />
        <Route path="/dashboard/notification" element={<Notifications />} />
      </Routes>
      {/* Toast Container (should be outside routes) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>

  )
}

export default App
