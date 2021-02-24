import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import { GET_USERS, TOGGLE_NEWFRIEND } from '../../utils/actions';

function AddFriend() {
    const [state, dispatch] = useStoreContext();
    const [addFriend] = useMutation(ADD_FRIEND);
    const { loading, data } = useQuery(QUERY_USERS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: GET_USERS,
                users: data.users
            });
            data.users.forEach((users) => {
                idbPromise('users', 'put', users);
            });
        } else if (!loading) {
            idbPromise('users', 'get').then((users) => {
                dispatch({
                    type: GET_USERS,
                    users: users
                });
            });
        }
    }, [data, loading, dispatch]);

    const handleNewFriend = async event => {
        event.preventDefault();
        const friend = document.querySelector('#searchBar').value;
        console.log(friend)
        for (let i = 0; i < state.users.length; i++) {
            if (friend === state.users[i].email) {
                let addFriendId = state.users[i]._id
                console.log(addFriendId)
                try {
                await addFriend({
                variables: {
                    friendId: addFriendId
                }
                    });
                    console.log("friend added" + friend)
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };

    function toggleNewFriend() {
        dispatch({ type: TOGGLE_NEWFRIEND });
    };

    if (!state.newFriendOpen) {
        return (
            <div className="">
                <button onClick={toggleNewFriend} className="w-10/12 mx-auto my-3 flex items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-purple md:py-4 md:text-lg md:px-10">+ Add Friend</button>
            </div>
        )
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>


                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom border-4 bg-purple bg-transparent rounded-lg text-left overflow-hidden  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white container mx-auto px-4 pt-5 pb-4 align-center sm:p-6 sm:pb-4">
                        <div className="justify-center items-center sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="container mx-auto text-lg leading-6 font-bold text-gray-900" id="modal-headline">
                                    Enter Friend's Email
                                    </h3>
                                <div className="mt-2">
                                    <input id="searchBar" className="container mx-auto my-2 border-2 border-black"></input>
                                </div>
                                <button onClick={handleNewFriend} className="container mx-auto shadow-sm focus:ring-indigo-500 focus:border-blue-dark mt-1 block sm:text-sm border-2 border-black rounded-md"> Add Friend </button>
                                <button onClick={toggleNewFriend} className="container mx-auto shadow-sm focus:ring-indigo-500 focus:border-blue-dark mt-1 block sm:text-sm border-2 border-black rounded-md">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFriend