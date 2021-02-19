import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNELS} from '../../utils/queries';
import AddFriend from '../AddFriend'

function Conversation() {
    const [convoState, setConvoState] = useState({ createdBy: '', messageText: '', channelId: '' })
    const [addMessage] = useMutation(ADD_MESSAGE);

    const handleMessageSubmit = async event => {
        event.preventDefault();
        console.log("start of message submit");
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText, channelId: "602fec40e4390f32ac60d0aa"
            }
        });
       
        console.log(mutationResponse);
        addMessage({messageText:""});
       
    };
//////////////////////////////////////
    const handleChange = event => {
        const { name, value } = event.target;
        setConvoState({
            ...convoState,
            [name]: value
        });
    };
/////////////////////////////////////

    const MessagesContainer = () => {
        <Query query={QUERY_CHANNELS}>
            {({ data, loading, error, messageSubscribe }) => {
                if (!data) {
                    return null;
                }
                if (loading) {
                    return <span>Loading...</span>
                }
                if (error) {
                    return <p>Something went wrong.</p>
                }

                return (<MessageList 
                    messages={data.channelId.messages}
                    subscribeToMore = {subscribeToMore}
                    />);
            }}
        </Query>
    };

    return (
        <div className="h-screen grid grid-flow-row grid-rows-6">
            <div>
                <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-gray-200 w-max items-center justify-center">
                    Hey, what's up?
                </p>
                <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-purple-600 items-center justify-center">
                    Playing some P5R, just about to fight the last boss. Gonna platinum this game!
                </p>
            </div>
            <div>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button type="submit" onClick={handleMessageSubmit} className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                        Send
                    </button>
                    <button className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                        <AddFriend />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Conversation;