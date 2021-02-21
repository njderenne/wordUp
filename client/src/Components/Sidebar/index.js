import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { ADD_CHANNEL } from '../../utils/mutations'
import { useStoreContext } from '../../utils/GlobalState';
import AddChat from '../AddChat';
import { UPDATE_CHANNEL, GET_USER, TOGGLE_CHAT } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth'


function Sidebar() {
    const [state, dispatch] = useStoreContext();

    const [addChat, { error }] = useMutation(ADD_CHANNEL) 

    const { loading, data } = useQuery(QUERY_USER);

    const newConversation = async event => {
        event.preventDefault();
        try {

        } catch (e) {
            console.log(e)
        }
        console.log("Conversation Added")
    }

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_CHANNEL,
                channels: data.user.channels
            });
            data.user.channels.forEach((channel) => {
                idbPromise('channels', 'put', channel);
            });
        } else if (!loading) {
            idbPromise('channels', 'get').then((channels) => {
                dispatch({
                    type: UPDATE_CHANNEL,
                    channels: channels
                });
            });
        }
    }, [data, loading, dispatch]);

    function selectChat(id) {
        dispatch({ type: TOGGLE_CHAT, currentChat: id });
        //console.log(id)
    }

    function getChannelId(id) {
        console.log("channel function");
        console.log(id);
    }

    return (
        <div className="bg-yellow-200 bg-transparent relative">
            <div className="border-b-4 border-black">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Conversations</h2>
            </div>
            <AddChat />
            <div className="grid mx-auto justify-center grid-flow-row">
            {state.channels.map(channel => (
                <div onClick={() => {selectChat(channel._id)}} key={channel._id} className="flex hover:bg-yellow-400 my-1">
                    <img src="../../assets/avatar.png" />
                    <p className="text-lg font-bold text-gray-900" >{channel.name}</p>
                </div>
            ))}
            </div>
            <div className="fixed container bottom-0 w-full border-t-4 border-black p-6 grid grid-cols-2">
                <div className="col-auto">
                    <p className="text-lg font-bold text-gray-900">{state.firstName} {state.lastName}</p>
                    <p className="text-lg font-bold text-gray-900">Status: Online</p>
                    <a href="/" onClick={() => Auth.logout()} className="text-lg font-bold text-gray-900">Logout</a>
                </div>


            </div>
        </div>
    )
}

export default Sidebar;