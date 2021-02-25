import React from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { DELETE_CHANNEL } from '../../utils/mutations';
import { UPDATE_CHANNEL } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function DeleteChat() {
    const [state, dispatch] = useStoreContext();
    const [deleteChannel] = useMutation(DELETE_CHANNEL);

    const { currentChat } = state;

    const handleDeleteChannel = async event => {
        event.preventDefault();
        try {
            await deleteChannel({
                variables: {
                    channelId: currentChat
                }
            });
        } catch (e) {
            console.error(e);
        }
        window.location.reload();
        // updateIDB();
    };

    // function updateIDB() {
    //     dispatch({
    //         type: UPDATE_CHANNEL,
    //         channels: currentChat
    //     });
    //     ((currentChat) => {
    //         idbPromise('channels', 'delete', currentChat);
    //     });
    // }

    return (
        <div className="">
            <button onClick={handleDeleteChannel} className="w-10/12 mx-auto my-3 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-purple md:py-4 md:text-lg md:px-10">
                - Delete Conversation
            </button>
        </div>
    )
};

export default DeleteChat