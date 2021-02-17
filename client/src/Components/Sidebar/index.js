import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CHANNELS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CHANNEL } from '../../utils/actions';


function Sidebar() {
    // const [state, dispatch] = useStoreContext();
    // const { channels } = state;
    const { loading, data } = useQuery(QUERY_CHANNELS);
    let channels;

    if(data) {
        channels = data.channels
    } 

    // useEffect(() => {
    //     if (data) {
    //         dispatch({
    //             type: UPDATE_CHANNEL,
    //             channels: data.channels
    //         });

    //     } 
    // })

    return (
        <div className="bg-yellow-200 bg-transparent relative">
            <div className="border-b-4 border-black">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Conversations</h2>
            </div>
            <div className="">
                <button className="w-10/12 mx-auto my-3 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                     + New Conversation
                </button>
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
            <div className="fixed container bottom-0 w-full border-t-4 border-black p-6 grid grid-cols-2">
                <div className="col-auto">
                    <img className="" src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Test User One</p>
                    <p className="text-lg font-bold text-gray-900">Status: Online</p>
                </div>
                <div className="col-auto">
                    <p>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;