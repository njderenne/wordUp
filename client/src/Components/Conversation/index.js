import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNEL} from '../../utils/queries';
import { MESSAGE_SUBSCRIPTION } from '../../utils/subscriptions';
import AddParticipant from '../AddParticipant';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MESSAGES } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import ChatParticipants from '../ChatParticipants';
import Menu from '../Menu';

function Conversation() {
    const [state, dispatch] = useStoreContext();
    const [messageField, setMessage] = useState('');
    const {currentChat} = state;
    const {data} = useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: {
            channelId: currentChat
        }
    });

    const {loading, data: queryData} = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: currentChat
        }
    });

    const [addMessage] = useMutation(ADD_MESSAGE);
    const [convoState, setConvoState] = useState()


    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };


    // query useEffect
    useEffect(() => {
        if (queryData) {
            dispatch({
                type: UPDATE_MESSAGES,
                messages: queryData.channel.messages
            });
            queryData.channel.messages.forEach((message) => {
                idbPromise('messages', 'put', message)
            });
        } 
         else if (!loading) {
            idbPromise('messages', 'get').then((messages) => {
                // dispatch({
                //     type: UPDATE_MESSAGES,
                //     messages: messages
                // })
            })
        }
    }, [queryData, loading, dispatch]);
    
    // subscription useEffect
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_MESSAGES,
                messages: data.messageAdded.messages
            });
            data.messageAdded.messages.forEach((message) => {
                idbPromise('messages', 'put', message)
            });
        } 
    }, [data, dispatch]);

    useEffect(() => {
        scrollToBottom()
      }, [state.messages]);

    const userData = Auth.getProfile();

    const handleMessageSubmit = async event => {
        event.preventDefault();
        try {
            await addMessage({
                variables: {
                    createdBy: convoState.createdBy, 
                    messageText: convoState.messageText,
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

    if (state.currentChat === '') {
        return (
            <div className="overflow-hidden bg-gray-dark h-screen">
                <div className='overflow-scroll h-screen overflow-x-hidden'>
                    <div className='h-1/6' ref={messagesEndRef} />
                </div>
                <div className='bg-gray-darkest overflow-hidden'>
                    <div className="m-2 flex fixed bottom-0 w-8/12">
                    </div>
                </div>
            </div>
        )
    }




    let width = window.innerWidth;
    console.log(width);
    let mobileWidth = width <= 845;
    console.log(mobileWidth);
    

    return (
        <div className="overflow-hidden bg-gray-dark h-screen">
            <div className='overflow-scroll h-screen overflow-x-hidden'>
            <div className='h-14' ref={messagesEndRef} />
                    {(state.messages.map(message => (
                        <div key={message._id} className="grid">
                            {userData.data.email === message.email ? (
                                <div className="grid flex flex-wrap justify-items-end">
                                    <p className="max-w-sm md:max-w-4xl flex flex-wrap m-2 p-2 text-xl font-semibold rounded-2xl bg-blue justify-items-end object-right break-all">
                                        {message.messageText}
                                    </p>
                                </div> 
                            ) : (
                                <div className="grid flex flex-wrap justify-items-start">
                                    <p className="mb-0 max-w-sm md:max-w-4xl flex flex-wrap m-2 p-2 text-xl font-semibold rounded-2xl bg-gray-light object-left break-all">
                                        {message.messageText}
                                    </p>
                                    <p className='pl-4 text-sm text-gray-lightest'>{message.sender}</p>
                                </div>
                            )}
                        </div>
                    ))
            )}
            <div className='h-1/6' ref={messagesEndRef} />
            </div>
            <div className='bg-gray-darkest overflow-hidden'>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" value={messageField} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-blue-dark mt-1 block w-full sm:text-sm border-2 border-black rounded-md sm:h-auto h-8" />
                    <button type="submit" onClick={handleMessageSubmit} className="rounded-lg bg-purple border-black border-2 w-auto sm:text-xl text-small font-bold hover:bg-purple-dark hover:text-gray-lightest p-2 sm:h-auto h-8">
                        Send
                    </button>
                    <div>
                        <AddParticipant />
                    </div>
                    <div>
                        <ChatParticipants />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Conversation;