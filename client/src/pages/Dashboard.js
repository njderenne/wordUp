import React from 'react';
import Sidebar from '../Components/Sidebar'
import Conversation from '../Components/Conversation'


const Dashboard = () => {

    let width = window.innerWidth;
    console.log(width);
    let mobileWidth = width <= 845;
    console.log(mobileWidth);
    return (

        <div>
        {mobileWidth ?
                <div className="grid grid-cols-4 grid-flow-row">
                    <div>
                        <Sidebar />
                    </div>
                    <div className="col-span-3 col-start-1 col-end-5 h-screen bg-gray-700">
                        <Conversation />
                    </div>
                </div>
            :
                <div className="grid grid-cols-4 grid-flow-row">
                    <div className="col-span-2 col-start-1 col-end-4 h-screen bg-gray-700">
                        <Conversation />
                    </div>
                    <div className="col-span-1 col-start-4 col-end-5 border-l-2 border-black h-screen bg-gray bg-transparent">
                        <Sidebar />
                    </div>
                </div>
            }
        </div>
    )
};

export default Dashboard;