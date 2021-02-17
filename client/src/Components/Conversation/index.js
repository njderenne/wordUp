import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';

function Conversation() {
    const [convoState, setConvoState] = useState({ createdBy: '', messageText: '', createdAt: '' })
    const [addMessage] = useMutation(ADD_MESSAGE);

    const handleMessageSubmit = async event => {
        event.preventDefault();
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText, createdAt: convoState.createdAt
            }
        });
        const display = mutationResponse.data.addMessage;
        console.log(display);
        console.log(useState);
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
                <p>
                    Hey, what's up?
                </p>
                <p>
                    Playing some P5R, just about to fight the last boss. Gonna platinum this game!
                </p>
            </div>
            <div>
                <div className="flex object-none object-bottom">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Conversation;