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
                
            }
        } catch (e) {
            console.error(e)
        }
        toggleFriendsList()
        window.location.reload();
    }

    function clickHandler(friend) {
        let tempHighlight = document.getElementById(friend)
        tempHighlight.classList.add("bg-purple-dark")
        tempHighlight.classList.add("text-gray-lightest")
        tempHighlight.classList.add("border-transparent")
        tempHighlight.classList.add("border-gray-lightest")
        
        tempFriendArray.push(friend)
    }

    function toggleFriendsList() {
        dispatch({ type: TOGGLE_FRIENDS });
    }

    if(!state.friendsListOpen) {
        return (
            <button onClick={toggleFriendsList} className="rounded-lg bg-purple  border-2 sm:text-xl text-small font-bold hover:bg-purple-dark hover:text-gray-lightest p-2 sm:h-auto h-8">
                +Member
            </button>
        )
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-purple rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="grid grid-col-4">
                            <div className="grid col-span-1 sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium" id="modal-headline">
                                        Friends List
                                    </h3>
                                    <ul className="mt-2">
                                        {state.friends.map(friend => (
                                            <p onClick={() => { clickHandler(friend._id) }} key={friend._id} id={friend._id} className="text-sm hover:bg-purple-dark cursor-pointer border hover:text-gray-lightest border-transparent hover:border-gray-lightest rounded-md">{friend.firstName} {friend.lastName}</p>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleAddSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-darkest shadow-sm px-4 py-2 bg-blue text-base font-medium sm:ml-3 sm:w-auto sm:text-sm  hover:bg-purple-dark border hover:text-gray-lightest border-transparent hover:border-gray-lightest">
                            Add
                        </button>
                        <button type="button" onClick={toggleFriendsList} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-gray-light text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:bg-gray-lightest">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddParticipant;