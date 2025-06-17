import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTaskTimer from '../hooks/useTaskTimer';
import { useUser } from '../context/UserContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const TaskDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { employee } = useUser();
    const task = state?.task;

    const [status, setStatus] = useState(task?.status || 'To-do');
    const [showModal, setShowModal] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { seconds, isTiming, startTimer, stopTimer, formatTime } = useTaskTimer(task.id);


    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Parse document path
    let documents = [];
    try {
        documents = task?.document_path ? JSON.parse(task.document_path) : [];
        if (!Array.isArray(documents)) documents = [];
    } catch {
        documents = [];
    }

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        try {
            await axiosInstance.put(`/tasks/${task.id}/status`, {
                status: newStatus,
                emp_id: employee.emp_id,
            });
            toast.success('Status updated successfully!');
        } catch (error) {
            console.error('Failed to update status', error);
            toast.error('Could not update status.');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleSubmitTask = async () => {
        if (!task || !employee) return;

        const formData = new FormData();
        formData.append('task_id', task.task_id);
        formData.append('emp_id', employee.emp_id);
        formData.append('client_id', task.client?.client_id || '');
        formData.append('remarks', remarks);
        formData.append('time_spent', parseInt(seconds) || 0);

        selectedFiles.forEach(file => {
            formData.append('documents[]', file);
        });

        try {
            await axiosInstance.post('/task-submissions', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Task submitted successfully!');
            closeModal();
        } catch (error) {
            console.error('Task submission failed:', error);
            toast.error('Submission failed. Try again.');
        }
    };

    if (!task || !employee?.emp_id) {
        return <div className="p-4 text-muted">Loading task details...</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1" style={{ minHeight: '100vh', background: '#f9f9f9' }}>
                <Header />
                <div className="p-4">
                    <button
                        className="btn btn-outline-dark rounded-circle mb-3"
                        style={{ width: '40px', height: '40px' }}
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>

                    <h3 className="mb-3">Task Details</h3>
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <label className="form-label">Task ID</label>
                            <input type="text" className="form-control" value={task.task_id || ''} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" value={task.subject || ''} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" value={task.description || ''} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Priority</label>
                            <input
                                type="text"
                                className={`form-control ${task.priority === 'High' ? 'text-danger' :
                                    task.priority === 'Moderate' ? 'text-warning' : 'text-success'
                                    }`}
                                value={task.priority || ''}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Deadline</label>
                            <input
                                type="text"
                                className="form-control"
                                value={task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB') : ''}
                                readOnly
                            />
                        </div>
                        {task.client?.name && (
                            <div className="col-md-6">
                                <label className="form-label">Client</label>
                                <input type="text" className="form-control" value={task.client.name} readOnly />
                            </div>
                        )}
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={status} onChange={handleStatusChange}>
                                <option value="To-do">To-do</option>
                                <option value="Working">Working</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        {documents.length > 0 && (
                            <div className="col-md-6">
                                <label className="form-label">Attached Documents</label>
                                {documents.map((file, index) => {
                                    const fileExtension = file.split('.').pop().toLowerCase();
                                    const fileUrl = `https://mockup4clients.com/task-management-backend/public/${file}`;
                                    return (
                                        <div key={index} className="mb-2">
                                            {['pdf'].includes(fileExtension) ? (
                                                <iframe src={fileUrl} width="100%" height="400px" title={`doc-${index}`}></iframe>
                                            ) : ['jpg', 'jpeg', 'png'].includes(fileExtension) ? (
                                                <img src={fileUrl} alt={`doc-${index}`} className="img-fluid rounded border" />
                                            ) : (
                                                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                    {file.split('/').pop()}
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="col-md-6 mb-3">
                        <p>Time Spent: {formatTime(seconds)}</p>

                        {!isTiming ? (
                            <button className='btn btn-sm btn-primary' onClick={startTimer}>Start Task</button>
                        ) : (
                            <button className='btn btn-sm btn-danger' onClick={stopTimer}>Stop Task</button>
                        )}
                    </div>

                    <div className="col-md-12 mt-4">
                        <label className="form-label">Comments</label>
                        <textarea className="form-control" value={task.comment || ''} readOnly />
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 text-end">
                            <button className="btn btn-primary btn-sm" onClick={openModal}>
                                Submit Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Modal */}
            {showModal && (
                <div className="modal show fade d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Submit Task</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Task ID</label>
                                    <input type="text" className="form-control" value={task.task_id} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Attach Documents</label>
                                    <input type="file" className="form-control" onChange={handleFileChange} multiple />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Remarks</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Time Spent</label>
                                    <input type="text" className="form-control" value={formatTime(seconds)} readOnly />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={handleSubmitTask}>
                                    Submit Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
