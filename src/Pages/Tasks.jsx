import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Tasks = () => {
    const { employee } = useUser();
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (tasks.length > 0) {
            setTimeout(() => {
                if (window.$.fn.dataTable.isDataTable('#tasksTable')) {
                    window.$('#tasksTable').DataTable().destroy();
                }
                window.$('#tasksTable').DataTable();
            }, 0);
        }
    }, [tasks]); // run when tasks change

    useEffect(() => {
        const fetchTasks = async () => {
            if (!employee?.emp_id) return;

            try {
                const response = await axiosInstance.get(`/employee-tasks/${employee.emp_id}`);
                setTasks(response.data.tasks);
                console.log(response.data.tasks)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [employee]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1" style={{ minHeight: '100vh', background: '#f9f9f9' }}>
                <Header />
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>My Tasks</h4>
                        {/* <li style={{ listStyle: 'none' }} className="nav-item">
                            <NavLink to={'/dashboard/add-task'}>
                                <button className="btn btn-primary">+ Add Task</button>
                            </NavLink>
                        </li> */}
                    </div>

                    <table id="tasksTable" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Task ID</th>
                                <th>Task Title</th>
                                <th>Client Name</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned Date</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">No tasks assigned.</td>
                                </tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>{task.task_id}</td>
                                        <td>{task.subject}</td>
                                        <td>{task.client?.name || 'N/A'}</td>
                                        <td>
                                            <span className={`badge text-white text-capitalize bg-${task.status === 'Completed' ? 'success' : 'warning'}`}>
                                                {task.status}
                                            </span>

                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${task.priority === 'High'
                                                    ? 'bg-danger'
                                                    : task.priority === 'Moderate'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-success'
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td>{new Date(task.assigned_date).toLocaleDateString('en-GB').replaceAll('/', '-')}</td>
                                        <td>{new Date(task.due_date).toLocaleDateString('en-GB').replaceAll('/', '-')}</td>
                                        <td>
                                            <NavLink
                                                to={`/dashboard/task/${task.id}`}
                                                state={{ task }}
                                                className=""
                                            >
                                                <button className='btn btn-sm bg-warning'><i className="bi bi-eye"></i></button>
                                            </NavLink>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
