import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_CHANNEL } from '../../utils/mutations';
import { TOGGLE_NEWCHAT, UPDATE_CHANNEL } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_USER } from '../../utils/queries';


function AddChat() {
    const [state, dispatch] = useStoreContext();
    const [addChannel] = useMutation(ADD_CHANNEL);
    const { loading, data: queryData } = useQuery(QUERY_USER);

    const handleNewChannel = async event => {
        event.preventDefault();
        const chatName = document.querySelector('#chatName').value;

        try {
            const { data } = await addChannel({
                variables: {
                    name: chatName
                }
            });

            const newChat = data.addChannel._id;

            state.channels.forEach((channel) => {
                if(channel._id === newChat) {
                    idbPromise('channels', 'put', { ...channel });
                }
            })

            toggleNewChat();
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    function toggleNewChat() {
        dispatch({ type: TOGGLE_NEWCHAT });
        dispatch({
            type: UPDATE_CHANNEL,
            channels: queryData.user.channels
        });
        queryData.user.channels.forEach((channel) => {
            idbPromise('channels', 'put', channel);
        });
    }

    let width = window.innerWidth;
    let mobileWidth = width <= 845;
    if(mobileWidth && !state.newChatOpen) {
        return (
            <div className="">
                <button onClick={toggleNewChat} className="w-10/12 mx-auto my-3 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md bg-blue hover:bg-purple md:py-4 md:text-lg md:px-10">
                    + New Conversation
                </button>
            </div>
        )
    }

    if (!state.newChatOpen && !mobileWidth) {
        return (
            <div className="">
                <button onClick={toggleNewChat} className="w-10/12 mx-auto my-3 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md bg-blue hover:bg-purple md:py-4 md:text-lg md:px-10">
                    + New Conversation
                </button>
            </div>
        )
    }

    return (
        <div className="">
            {!mobileWidth ? 
                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray opacity-75"></div>
                    </div>
    
    
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
                    <div className="inline-block align-bottom border-4 bg-purple bg-transparent rounded-lg text-left overflow-hidden  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="container mx-auto px-4 pt-5 pb-4 align-center sm:p-6 sm:pb-4">
                            <div className="justify-center items-center sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="container mx-auto text-lg leading-6 font-bold" id="modal-headline">
                                        Give your chat a name!
                                        </h3>
                                    <div className="mt-2">
                                        <input id="chatName" className="container mx-auto my-2 border-2 "></input>
                                    </div>
                                    <button onClick={handleNewChannel} className="container mx-auto shadow-sm mt-1 block sm:text-sm border-2 rounded-md bg-blue hover:bg-purple-dark hover:text-gray-lightest hover:border-gray-lightest"> Add Chat </button>
                                    <button onClick={toggleNewChat} className="container mx-auto shadow-sm  mt-1 block sm:text-sm border-2 rounded-md bg-gray-light hover:bg-gray-lightest">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className='w-11/12 items-center mx-auto'>
                <h3 className="container mx-auto text-center font-bold text-lg leading-6 font-bold" id="modal-headline">
                    Give your chat a name!
                </h3>
                <div className="mt-2">
                    <input id="chatName" className="container mx-auto my-2 border-2 "></input>
                </div>
                <button onClick={handleNewChannel} className="bg-purple container mx-auto shadow-sm mt-1 block sm:text-sm border-2  hover:bg-blue font-bold rounded-md"> Add Chat </button>
                <button onClick={toggleNewChat} className="bg-purple container mx-auto shadow-sm mt-1 block sm:text-sm border-2  font-bold hover:bg-blue rounded-md">Close</button>
                <div className='pt-4 border-b-4'></div>
            </div>
        }
        </div>
    )
}


export default AddChat