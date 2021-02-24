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


function Sidebar() {
    const [state, dispatch] = useStoreContext();

    const {currentChat} = state;

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
            data.channelAdded.channels.forEach((channel) => {
                idbPromise('channels', 'put', channel)
            });
        }
    }, [data, dispatch]);


    function selectChat(id) {
        dispatch({ type: TOGGLE_CHAT, currentChat: id });
        return id;
    }

    return (
        <div className="bg-gray bg-transparent relative">
            <div className="border-b-4 border-black">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Conversations</h2>
            </div>
            <AddChat />
            <div className="grid mx-auto justify-center grid-flow-row">
                {state.channels.map(channel => (
                <div key={channel._id}>
                    {currentChat === channel._id ?
                    (
                        <div onClick={() => {selectChat(channel._id)}} key={channel._id} className="bg-purple flex border border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                            {/* <img src="../../assets/avatar.png" /> */}
                            <p className="text-lg font-bold text-gray-900" >{channel.name}</p>
                        </div>
                    ) : (
                        <div onClick={() => {selectChat(channel._id)}} key={channel._id} className="flex border border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                            {/* <img src="../../assets/avatar.png" /> */}
                            <p className="text-lg font-bold text-gray-900" >{channel.name}</p>
                        </div>
                    )}
                </div>
            ))}
            </div>
            <div>
                <AddFriend />
            </div>
            <div className="fixed container bottom-0 w-full border-t-4 border-black bg-gray p-6 grid grid-cols-2">
                <div className="col-auto">
                    <p className="text-lg font-bold text-gray-900">{state.firstName} {state.lastName}</p>
                    <p className="text-lg font-bold text-gray-900">Status: Online</p>
                    <a href="/" onClick={() => Auth.logout()} className="text-lg font-bold text-gray-900 rounded-md border border-transparent hover:border-gray-lightest hover:bg-purple">Logout</a>
                </div>


            </div>
        </div>
    )
}

export default Sidebar;