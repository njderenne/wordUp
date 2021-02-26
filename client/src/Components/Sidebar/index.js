import React, { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import AddChat from '../AddChat';
import AddFriend from '../SearchFriend';
import { UPDATE_CHANNEL, GET_USER, TOGGLE_CHAT } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth'
import { CHANNEL_SUBSCRIPTION } from '../../utils/subscriptions';
import DeleteChat from '../DeleteChat';


function Sidebar() {
    const [state, dispatch] = useStoreContext();

    const { currentChat } = state;

    const { loading, data: queryData } = useQuery(QUERY_USER);

    const userData = Auth.getProfile();

    const { data } = useSubscription(CHANNEL_SUBSCRIPTION, {
        variables: {
            userId: userData.data._id
        }
    })

    useEffect(() => {
        if (queryData) {
            dispatch({
                type: UPDATE_CHANNEL,
                channels: queryData.user.channels
            });
            queryData.user.channels.forEach((channel) => {
                idbPromise('channels', 'put', channel);
            });
            dispatch({
                type: GET_USER,
                firstName: queryData.user.firstName,
                lastName: queryData.user.lastName
            });
        } else if (!loading) {
            idbPromise('channels', 'get').then((channels) => {
                dispatch({
                    type: UPDATE_CHANNEL,
                    channels: channels
                });
            });
        }
    }, [queryData, loading, dispatch]);

    // subscription useEffect
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_CHANNEL,
                channels: data.channelAdded.channels
            });
        }
    }, [data, dispatch]);


    function selectChat(id) {
        dispatch({ type: TOGGLE_CHAT, currentChat: id });
        return id;
    }

    return (
        <div className="bg-gray relative">
            <div className="border-b-4 ">
                <h2 className="mt-6 text-center text-3xl font-extrabold">Conversations</h2>
            </div>
            <AddChat />
            <AddFriend />
            <DeleteChat />
            <div className="grid mx-auto justify-center grid-flow-row">
                {state.channels.map(channel => (
                    <div key={channel._id}>
                        {currentChat === channel._id ?
                            (
                                <div onClick={() => { selectChat(channel._id) }} key={channel._id} className="bg-purple cursor-pointer flex border border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                                    <p className="text-lg font-bold hover:text-gray-lightest" >{channel.name}</p>
                                </div>
                            ) : (
                                <div onClick={() => { selectChat(channel._id) }} key={channel._id} className="flex border cursor-pointer  border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                                    <p className="text-lg font-bold hover:text-gray-lightest" >{channel.name}</p>
                                </div>
                            )}
                    </div>
                ))}
            </div>
            <div>
            </div>
            <div className="fixed container bottom-0 w-full border-t-4  bg-gray p-4 grid grid-cols-2">
                <div className="col-auto">
                    <div className="flex">
                        <h1 className="font-sans text-3xl">word</h1>
                        <h1 className="font-sans text-3xl text-purple justify-right text-right">U</h1>
                        <h1 className="font-sans text-3xl justify-right text-right">p</h1>
                    </div>
                    <p className="text-lg font-bold">{state.firstName} {state.lastName}</p>
                    <a href="/" onClick={() => Auth.logout()} className="text-lg font-bold rounded-md border border-transparent hover:border-gray-lightest hover:bg-purple">Logout</a>
                </div>


            </div>
        </div>
    )
}

export default Sidebar;