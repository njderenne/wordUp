import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState'
import { TOGGLE_FRIENDS, GET_FRIENDS } from '../../utils/actions';
import { ADD_PARTICIPANT } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers'

function AddParticipant() {
    const [state, dispatch] = useStoreContext();
    const [addParticipant] = useMutation(ADD_PARTICIPANT)
    const { loading, data } = useQuery(QUERY_USER)

    let tempFriendArray = []

    useEffect(() => {
        if (data) {
            dispatch({
                type: GET_FRIENDS,
                friends: data.user.friends
            });
            data.user.friends.forEach((friend) => {
                idbPromise('friends', 'put', friend);
            })
        } else if (!loading) {
            idbPromise('friends', 'get').then((friends) => {
                dispatch({
                    type: GET_FRIENDS,
                    friends: friends
                });
            });
        }
    }, [data, loading, dispatch]);

    const handleAddSubmit = async event => {
        event.preventDefault();
        try {
            for(let i = 0; i < tempFriendArray.length; i++) {
            addParticipant({
                variables: {
                    channelId: state.currentChat,
                    participants: tempFriendArray[i]
                }
            });
            console.log("added")
        }
        } catch (e) {
            console.error(e)
        }
    }

    function clickHandler(friend) {
        tempFriendArray.push(friend)
        
    }

    function toggleFriendsList() {
        dispatch({ type: TOGGLE_FRIENDS });
    }

    if(!state.friendsListOpen) {
        return (
            <button onClick={toggleFriendsList} className="rounded-lg bg-green-500 border-black border-2 w-auto text-xl font-semibold p-2">
                Add Friend
            </button>
        )
    }

    return (

        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Friends List
                                </h3>
                                <div className="mt-2">
                                    {state.friends.map(friend => (
                                        <p onClick={() => {clickHandler(friend._id)}} key={friend._id} className="text-sm text-gray-500">{friend.firstName} {friend.lastName}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleAddSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Add
                        </button>
                        <button type="button" onClick={toggleFriendsList} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddParticipant;