import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNEL} from '../../utils/queries';
import { MESSAGE_SUBSCRIPTION } from '../../utils/subscriptions';
import AddFriend from '../AddFriend';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MESSAGES } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';

function Conversation() {
    const [state, dispatch] = useStoreContext();
    const [messageField, setMessage] = useState('');
    const {currentChat} = state;
    const {loading, data, subscribeToMore} = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: currentChat
        }
    });
    // const {
    //     data: { messageAdded },
    //     loading 
    // } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { channelId: currentChat } });

    const [addMessage] = useMutation(ADD_MESSAGE);
    const [convoState, setConvoState] = useState()
    
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_MESSAGES,
                messages: data.channel.messages
            });
            data.channel.messages.forEach((message) => {
                idbPromise('messages', 'put', message)
            });
        } 
         else if (!loading) {
            idbPromise('messages', 'get').then((messages) => {
                dispatch({
                    type: UPDATE_MESSAGES,
                    messages: messages
                })
            })
        }
        // Error throwing from this line down
        // let unsubscribe = subscribeToMore ({
        //     document: MESSAGE_SUBSCRIPTION,
        //     variables: { channelId: currentChat },
        //     updateQuery: (prev, { subscriptionData }) => {
        //         if(!subscriptionData.data) return prev;
        //         const newFeedItem = subscriptionData.data.messageAdded;
        //         return Object.assign({}, prev, {
        //             channel: {
        //                 messages: [newFeedItem, ...prev.channel.messages]
        //             }
        //         })
        //     }
        // });
        // return () => {
        //     unsubscribe();
        // };
        // TO HERE
    }, [data, loading, dispatch, subscribeToMore]);

    const userData = Auth.getProfile();

    const handleMessageSubmit = async event => {
        event.preventDefault();
        try {
            await addMessage({
                variables: {
                    createdBy: convoState.createdBy, messageText: convoState.messageText,
                    channelId: currentChat
                }
            });
            setMessage('');
            
        } catch (e) {
            console.error(e);
        }
    };
    const handleChange = event => {
        const { name, value } = event.target;
        setConvoState({
            ...convoState,
            [name]: value
        });
        setMessage(event.target.value);
    };

    return (
        <div>
            <div>
            {/* {loading ? (<p>loading...</p>) : ( */}
                    {(state.messages.map(message => (
                        <div key={message._id} className="grid">
                            {userData.data.email === message.email ? (
                                <div className="grid flex flex-wrap justify-items-end">
                                    <p className="flex flex-wrap m-2 p-2 text-xl font-semibold rounded-full bg-gray-200 justify-items-end text-center object-right">
                                        {message.messageText}
                                    </p>
                                </div> 
                            ) : (
                                <div className="">
                                    <p className="flex flex-wrap m-2 p-2 text-xl text-gray-100 font-semibold rounded-full bg-purple-600 items-center justify-center text-right justify-self-end">
                                        {message.messageText}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
            )}
            </div>
            <div>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" value={messageField} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button type="submit" onClick={handleMessageSubmit} className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                        Send
                    </button>
                    <div>
                        <AddFriend />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Conversation;