import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState'
import { TOGGLE_PARTICIPANTS, GET_PARTICIPANTS } from '../../utils/actions';
import { QUERY_CHANNEL } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers'

function ChatParticipants() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_CHANNEL, {
        variables: {
            channelId: state.currentChat
        }
    });

    useEffect(() => {
        if (data) {
            dispatch({
                type: GET_PARTICIPANTS,
                participants: data.channel.participants
            });
            data.channel.participants.forEach((participant) => {
                idbPromise('participants', 'put', participant);
            })
        } else if (!loading) {
            idbPromise('participants', 'get').then((participants) => {
                dispatch({
                    type: GET_PARTICIPANTS,
                    participants: participants
                });
            });
        }
    }, [data, loading, dispatch]);


    function toggleParticipantsList() {
        dispatch({ type: TOGGLE_PARTICIPANTS });
    }

    if(state.currentChat === '') {
        return(
            <div></div>
        )
    }

    if(!state.participantsListOpen ) {
        return (
            <button onClick={toggleParticipantsList} className="rounded-lg bg-purple border-black border-2 w-auto sm:text-xl text-small font-bold hover:bg-purple-dark hover:text-gray-lightest p-2 h-full">
            Members
            </button>
        )
    }



    return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-purple rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Members in Chat
                                </h3>
                                <div className="mt-2">
                                    {state.participants.map(participant => (
                                        <p key={participant._id} className="text-sm rounded-md text-gray-500 cursor-default">{participant.firstName} {participant.lastName}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={toggleParticipantsList} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:bg-gray-lightest">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatParticipants;