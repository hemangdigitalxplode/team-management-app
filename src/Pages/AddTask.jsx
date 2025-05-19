import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AddTask = () => {
  const [clients, setClients] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    taskId: 'DX001',
    description: '',
    clientId: '',
    assignedDate: '',
    dueDate: '',
    priority: 'high',
    status: 'pending',
    comment: ''
  });

  useEffect(() => {
    // Replace this with your real API
    fetch('https://api.example.com/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error("Error fetching clients:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskDetails);
    alert('Task Created!');
    setTaskDetails({
      taskId: 'DX001',
      description: '',
      clientId: '',
      assignedDate: '',
      dueDate: '',
      priority: 'high',
      status: 'pending',
      comment: ''
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4">
          <h4 className="mb-4">Add New Task</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Task ID */}
              <div className="col-md-6">
                <label className="form-label">Task ID</label>
                <input type="text" className="form-control" value={taskDetails.taskId} readOnly />
              </div>

              {/* Task Description */}
              <div className="col-md-6">
                <label className="form-label">Task Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={taskDetails.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Client Name */}
              <div className="col-md-6">
                <label className="form-label">Client Name</label>
                <select
                  className="form-select"
                  name="clientId"
                  value={taskDetails.clientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>

              {/* Assigned Date */}
              <div className="col-md-6">
                <label className="form-label">Assigned Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="assignedDate"
                  value={taskDetails.assignedDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Due Date */}
              <div className="col-md-6">
                <label className="form-label">Due Date (Deadline)</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={taskDetails.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Priority */}
              <div className="col-md-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={taskDetails.priority}
                  onChange={handleChange}
                >
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={taskDetails.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Comment */}
              <div className="col-md-6">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  name="comment"
                  rows="1"
                  value={taskDetails.comment}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button (full row) */}
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">Save Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
