import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            title: 'Project Deadline Extended',
            message: 'The deadline for the ABC project has been extended to 25th May.',
            time: '2 hours ago',
            type: 'info',
        },
        {
            id: 2,
            title: 'New Task Assigned',
            message: 'You have been assigned a new task: "Client Presentation Design".',
            time: 'Today at 10:30 AM',
            type: 'primary',
        },
        {
            id: 3,
            title: 'Office Event',
            message: 'Join us for the Friday Fun Session in the lounge at 5 PM!',
            time: 'Yesterday',
            type: 'success',
        },
        {
            id: 4,
            title: 'Policy Update',
            message: 'Company leave policy has been updated. Please check the HR portal.',
            time: '2 days ago',
            type: 'warning',
        },
    ];

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">
                    <h3>Notifications</h3>
                    <p className="mb-4">Explore upcoming and past office events, celebrations, and important dates here.</p>

                    <div className="list-group">
                        {notifications.map((note) => (
                            <div key={note.id} className={`list-group-item list-group-item-${note.type} mb-3`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{note.title}</h5>
                                        <p className="mb-1">{note.message}</p>
                                        <small className="text-muted">{note.time}</small>
                                    </div>
                                    <div>
                                        <i className="bi bi-bell-fill fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notifications
