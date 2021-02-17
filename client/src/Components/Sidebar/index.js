import React from 'react';

function Sidebar() {
    return (
        <div className="bg-yellow-200 bg-transparent relative">
            <div className="border-b-4 border-black">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Conversations</h2>
            </div>
            <div className="grid mx-auto justify-center grid-flow-row">
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Brent Johnson</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Joe Soltis</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Frank Eslinger</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Rachel Pampel</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Mat Lynaugh</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Andrew Smajda</p>
                </div>
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Ben Kohlman, Andy Harris</p>
                </div>
            </div>
            <div className="fixed container bottom-0 w-full border-t-4 border-black p-6">
                <div className="mx-auto justify-center">
                    <img className="float-right" src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Test User One</p>
                    <p className="text-lg font-bold text-gray-900">Status: Online</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;