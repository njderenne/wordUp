import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNEL} from '../../utils/queries';
import AddFriend from '../AddFriend';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MESSAGES } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
function Conversation() {
    const [state, dispatch] = useStoreContext();
    const {loading, data} = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: "602ae6c1338b054c74f509fc"
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
            //
            // need to set up the indexDB then add this back --------------------------------
            //
            // data.channel.messages.forEach((message) => {
            //     idbPromise('messages', 'put', message)
            // });
        } 
        //  else if (!loading) {
        //     idbPromise('messages', 'get').then((messages) => {
        //         dispatch({
        //             type: UPDATE_MESSAGES,
        //             messages: messages
        //         })
        //     })
        // }
    }, [data, loading, dispatch]);

    console.log(state)

    const handleMessageSubmit = async event => {
        event.preventDefault();
        //console.log("start of message submit");
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText,
                channelId: "602ae6c1338b054c74f509fc"
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
        <div className="h-screen grid grid-flow-row grid-rows-6">
            <div>
            {loading ? (<p>loading...</p>) : (
                    state.messages.map(message => (
                        <div key={message._id}>
                            <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-gray-200 w-max items-center justify-center">
                                {message.messageText}
                            </p>
                        </div>
                    ))
            )}
            </div>
            <div>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <input name="createdBy" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
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