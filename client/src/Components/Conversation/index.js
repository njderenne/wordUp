import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_CHANNEL, ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_CHANNEL} from '../../utils/queries';
import AddFriend from '../AddFriend';
import { useStoreContext } from '../../utils/GlobalState';
//import { MESSAGE_ADDED } from '../../../../server/schemas/resolvers';

function Conversation() {
    //const [state, dispatch] = useStoreContext();
    const {loading, data} = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: "60301e27d76972653ceef23c"

        }
    });
    const [addMessage] = useMutation(ADD_MESSAGE);
    const [convoState, setConvoState] = useState({ createdBy: '', messageText: '', channelId: '' })
   
    useEffect(() => {
        if (data) {
            const channelMessages = data.channel.messages;
            console.log("data", channelMessages);
        }
    }, [data, loading]);

    const channelMessages = data.channel.messages;

    const handleMessageSubmit = async event => {
        event.preventDefault();
        console.log("start of message submit");
        const mutationResponse = addMessage({
            variables: {
                createdBy: convoState.createdBy, messageText: convoState.messageText,
                channelId: "60301e27d76972653ceef23c"
            }
        });
        console.log(mutationResponse);

       
        // addMessage({messageText:""});

    };

    const handleChange = event => {
        const { name, value } = event.target;
        setConvoState({
            ...convoState,
            [name]: value
        });
    };

    // const MessagesContainer = () => {
    //     <Conversation useQuery={QUERY_CHANNEL}>
    //         {({ data, loading, error, messageSubscribe }) => {
    //             if (!data) {
    //                 return null;
    //             }
    //             if (loading) {
    //                 return <span>Loading...</span>
    //             }
    //             if (error) {
    //                 return <p>Something went wrong.</p>
    //             }

    //             return (<MessageList 
    //                 //data.allMessages is async in a query in resolvers
    //                 messages={data.channelId.messages}
    //                 subscribeToMore = {subscribeToMore}
    //                 />);
    //         }}
    //     </Conversation>

        //   componentDidMount() {
        //     convoState.subscribeToMore({
        //         document: MESSAGE_ADDED,
        //         updateQuery: (prev, {subscriptionData}) => {
        //             if (!subscriptionData.data) return prev;
        //             return {
        //                 channelId.messages: [
        //                     subscriptionData.data.messageCreated,
        //                     ...prev.channelId.messages
        //                 ],
        //             };
        //         },
        //     });
        // }

    // };

    return (
        <div className="h-screen grid grid-flow-row grid-rows-6">
            {loading ? (<p>loading...</p>) : (
                    channelMessages.map(channelMessage => (
                        <div key={channelMessage._id}>
                            <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-gray-200 w-max items-center justify-center">
                                {channelMessage.messageText}
                            </p>
                            {/* <p className="block m-2 p-2 text-xl font-semibold rounded-full bg-purple-600 items-center justify-center">
                            Playing some P5R, just about to fight the last boss. Gonna platinum this game!
                             </p> */}
                        </div>
                    ))
              )}
            
            <div>
                <div className="m-2 flex fixed bottom-0 w-8/12">
                    <input name="messageText" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <input name="createdBy" onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button type="submit" onClick={handleMessageSubmit} className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                        Send
                    </button>
                    <AddFriend />

                </div>
            </div>
        </div>
    )
}

export default Conversation;