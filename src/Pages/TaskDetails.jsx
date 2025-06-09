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

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const {
        seconds,
        isTiming,
        setIsTiming,
        formatTime
    } = useTaskTimer(task?.id); // ✅ Only task ID is needed

    // Safely parse document path
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
            alert('Could not update status. Try again.');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmitTask = async () => {
        if (!task || !employee) return;

        const formData = new FormData();
        formData.append('task_id', task.task_id);
        formData.append('emp_id', employee.emp_id);
        formData.append('client_id', task.client?.client_id || '');
        formData.append('remarks', remarks);
        formData.append('time_spent', parseInt(seconds) || 0);

        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('documents[]', selectedFiles[i]);
            }
        }

        try {
            const response = await axiosInstance.post('/task-submissions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Task submitted successfully!');
            closeModal();
        } catch (error) {
            console.error('Task submission failed:', error);
            toast.error('Failed to submit task. Please try again.');
        }
    };

    if (!task || !employee?.id) {
        return <div className="p-4 text-muted">Loading task details...</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1" style={{ minHeight: '100vh', background: '#f9f9f9' }}>
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
                                className={`form-control ${task.priority === 'High'
                                        ? 'text-danger'
                                        : task.priority === 'Moderate'
                                            ? 'text-warning'
                                            : 'text-success'
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
                                value={
                                    task.due_date
                                        ? new Date(task.due_date).toLocaleDateString('en-GB').replaceAll('/', '-')
                                        : ''
                                }
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
                                        <div key={index} className="mb-3">
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

                    <div className="col-md-6">
                        <button
                            className={`btn btn-sm ${isTiming ? 'btn-danger' : 'btn-success'} mb-2`}
                            onClick={() => setIsTiming((prev) => !prev)}
                        >
                            {isTiming ? 'Stop' : 'Start'} Task
                        </button>
                        <div className="fw-bold">Time Spent: {formatTime(seconds)}</div>
                    </div>

                    <div className="col-md-12 mt-5">
                        <label className="form-label">Comments</label>
                        <textarea type="text" className="form-control" value={task.comment || ''} readOnly />
                    </div>

                    <div className="row my-3">
                        <div className="col-md-6">
                            <div className="text-end mt-4">
                                <button className="btn btn-primary btn-sm" onClick={openModal}>
                                    Submit Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                                <button type="button" className="btn btn-secondary btn-sm" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmitTask}>
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
