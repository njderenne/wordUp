import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNEL} from '../../utils/queries';
import AddFriend from '../AddFriend';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MESSAGES } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';

function Conversation() {
    const [state, dispatch] = useStoreContext();
    const {currentChat} = state;
    const {loading, data} = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: currentChat
        }
    });
    const [addMessage] = useMutation(ADD_MESSAGE);
    const [convoState, setConvoState] = useState({ createdBy: '', messageText: '', channelId: '' })
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
    }, [data, loading, dispatch]);

    // console.log(state)
    // console.log(Auth.getProfile());
    const userData = Auth.getProfile();

    // console.log("this is user data", userData.data.email);
    // console.log("this is state data", state.messages[0].email);

    const handleMessageSubmit = async event => {
        event.preventDefault();
        //console.log("start of message submit");
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText,
                channelId: currentChat
            }
        });
    };
    const handleChange = event => {
        const { name, value } = event.target;
        setConvoState({
            ...convoState,
            [name]: value
        });
    };

    return (
        <div>
            <div>
            {/* {loading ? (<p>loading...</p>) : ( */}
                    {(state.messages.map(message => (
                        <div className="flex" key={message._id}>
                            {userData.data.email != message.email ? (
                            <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-gray-200 w-max items-center justify-center">
                                {message.messageText}
                            </p> ) : (
                            <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-purple-600 items-center justify-center text-right w-max justify-self-end">
                                {message.messageText}
                            </p> )}
                        </div>
                    ))
            )}
            </div>
            <div>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
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