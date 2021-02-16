import React from 'react';
import Sidebar from '../Components/Sidebar'


const Dashboard = () => {
    return (
        <div className="grid grid-cols-4">
            <div className="col-span-2 col-start-1 col-end-4">
                <h1>wordUp</h1>
            </div>
            <div className="col-span-1 col-start-4 col-end-5 border-l-2 border-black h-screen bg-yellow-200 bg-transparent">
                <Sidebar />
            </div>
        </div>
    )
};

export default Dashboard;