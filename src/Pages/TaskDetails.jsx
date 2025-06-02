import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTaskTimer from '../hooks/useTaskTimer';
import { useUser } from '../context/UserContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const TaskDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { employee } = useUser();
    const task = state?.task;
    const [status, setStatus] = useState('Pending');

    const {
        seconds,
        isTiming,
        setIsTiming,
        formatTime,
    } = useTaskTimer(task?.id);

    // ✅ Ensure both task and employee are loaded
    if (!task || !employee?.id) {
        return <div className="p-4 text-muted">Loading task details...</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">
                    <button
                        className="btn btn-outline-dark rounded-circle mb-3 d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px' }}
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h3 className="mb-3">Task Details</h3>

                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <label className="form-label">Task ID</label>
                            <input type="text" className="form-control" value={task.task_id} readOnly />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" value={task.subject} readOnly />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <textarea type="text" className="form-control" value={task.description} readOnly />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Priority</label>
                            <input
                                type="text"
                                className={`form-control ${task.priority === 'High'
                                    ? 'text-danger'
                                    : task.priority === 'Moderate'
                                        ? 'text-warning'
                                        : 'text-success'
                                    }`}
                                value={task.priority}
                                readOnly
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Deadline</label>
                            <input type="text" className="form-control" value={task.due_date} readOnly />
                        </div>

                        {task.client && (
                            <div className="col-md-6">
                                <label className="form-label">Client</label>
                                <input type="text" className="form-control" value={task.client.name} readOnly />
                            </div>
                        )}

                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Working">Working</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        {task.document_path && (
                            <div className="col-md-6">
                                <label className="form-label">Attached Document</label>
                                {
                                    task.document_path.endsWith('.pdf') ? (
                                        <iframe
                                            src={`https://mockup4clients.com/task-management-backend/public/${task.document_path}`}
                                            width="100%"
                                            height="400px"
                                            title="Document Preview"
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={`https://mockup4clients.com/task-management-backend/public/${task.document_path}`}
                                            alt="Document"
                                            className="img-fluid rounded border"
                                        />
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {/* Timer section */}
                    <div className="row mb-3">
                        <div className="col-md-6 d-flex flex-column align-items-end justify-content-end">
                            <button
                                className={`btn btn-sm ${isTiming ? 'btn-danger' : 'btn-success'} mb-2`}
                                onClick={() => setIsTiming((prev) => !prev)}
                            >
                                {isTiming ? 'Stop' : 'Start'} Timer
                            </button>
                            <div className="fw-bold">
                                Time Spent: {formatTime(seconds)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
