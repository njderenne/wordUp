import React from 'react';
import Sidebar from '../Components/Sidebar'
import Conversation from '../Components/Conversation'
import Menu from '../Components/Menu';
import useWindowSize from '../utils/useWindowSize';


const Dashboard = () => {

    const size = useWindowSize();
    let mobileWidth = size.width <= 845;

    return (
        <div>
        {mobileWidth ?
                <div className="grid grid-cols-4 grid-flow-row">
                    <div className="col-span-3 col-start-1 col-end-5">
                        <Menu />
                    </div>
                    <div className="col-span-3 col-start-1 col-end-5 h-screen">
                        <Conversation />
                    </div>
                </div>
            :
                <div className="grid grid-cols-4 grid-flow-row">
                    <div className="col-span-2 col-start-1 col-end-4 h-screen">
                        <Conversation />
                    </div>
                    <div className="col-span-1 col-start-4 col-end-5 border-l-2  h-screen bg-gray">
                        <Sidebar />
                    </div>
                </div>
            }
        </div>
    )
};

export default Dashboard;