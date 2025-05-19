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
        setTimeout(() => {
            if (window.$.fn.dataTable.isDataTable('#tasksTable')) {
                window.$('#tasksTable').DataTable().destroy();
            }
            window.$('#tasksTable').DataTable();
        }, 0);
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!employee?.emp_id) return;

            try {
                const response = await axiosInstance.get(`/employee-tasks/${employee.emp_id}`);
                setTasks(response.data.tasks);
                console.log(tasks)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [employee]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Employee Tasks</h4>
                        <li style={{ listStyle: 'none' }} className="nav-item">
                            <NavLink to={'/dashboard/add-task'}>
                                <button className="btn btn-primary">+ Add Task</button>
                            </NavLink>
                        </li>
                    </div>

                    <table id="tasksTable" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No tasks assigned.</td>
                                </tr>
                            ) : (
                                tasks.map((task, index) => (
                                    <tr key={task.id}>
                                        <td>{index + 1}</td>
                                        <td>{task.task_title}</td>
                                        <td>{task.task_description}</td>
                                        <td>
                                            <span className={`badge bg-${task.status === 'Completed' ? 'success' : 'warning text-dark'}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td>{task.deadline}</td>
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
