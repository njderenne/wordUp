import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_CHANNELS, QUERY_ME } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CHANNEL } from '../../utils/actions';


function Sidebar() {
    const [state, dispatch] = useStoreContext();
    // const { channels } = state;
    const { loading, data } = useQuery(QUERY_CHANNELS);
    // const { userData } = useQuery(QUERY_ME);
    let channels;

    if(data) {
        channels = data.channels
    } 
    else if (loading){
        return <h2>loading</h2>
    }
    
    console.log(data);
    // console.log(userData);

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
            {channels.map((name) => (
            <div className="grid mx-auto justify-center grid-flow-row">
                <div className="flex hover:bg-yellow-400 my-1">
                    <img src="../../../public/avatar.png" />
                    <p className="text-lg font-bold text-gray-900">{name}</p>
                </div>
            </div>
            ))}
            <div className="fixed container bottom-0 w-full border-t-4 border-black p-6 grid grid-cols-2">
                <div className="col-auto">
                    <img className="" src="../../../public/avatar.png" default />
                    <p className="text-lg font-bold text-gray-900">Test User</p>
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