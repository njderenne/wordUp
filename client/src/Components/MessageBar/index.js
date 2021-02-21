import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';
import AddFriend from '../AddFriend'

function MessageBar() {

    const [convoState, setConvoState] = useState()
    const [addMessage] = useMutation(ADD_MESSAGE);

    const handleMessageSubmit = async event => {
        event.preventDefault();
        console.log("start of message submit");
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText, channelId: "602c9b5d28bfe1469c1d68a8"
            }
        });
       
        console.log(mutationResponse);
       
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
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button type="submit" onClick={handleMessageSubmit} className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                        Send
                    </button>
                    <AddFriend />

                </div>
            </div>
    )
}

export default MessageBar