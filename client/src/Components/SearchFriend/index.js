import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import { GET_USERS } from '../../utils/actions';

function AddFriend() {
    const [state, dispatch] = useStoreContext();
    const [addFriend] = useMutation(ADD_FRIEND);
    const { loading, data } = useQuery(QUERY_USERS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: GET_USERS,
                users: data.user
            });
            data.user.forEach((users) => {
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
        const friend = document.querySelector('#searchBar').value
        try {
            await addFriend({
                variables: {
                    friendId: friend
                }
            });
        } catch (e) {
            console.error(e);
        }
    };


    const addFriendList = document.getElementById('addFriendList')
    const searchBar = document.querySelector('#searchBar')
    let userList = [state.users]

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredCharacters = userList.filter((user) => {
            return (
                user.email.toLowerCase().includes(searchString) ||
                user.name.toLowerCase().includes(searchString)
            )
        });
        displayUsers(filteredCharacters)
    })

    const displayUsers = (users) => {
        const userMap = users
            .map((user) => {
                return `
                    <li class="user">
                        <h2>${user.firstName} ${user.lastName}</h2>
                        <p>${user.email}</p>
                    </li>
                    `;
            })
            .join('');
        addFriendList.innerHTML = userMap;
    }


    return (
        <div>
            <div>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="Search for friend via Email"
                />
                <button onClick={handleNewFriend}>➡️</button>
            </div>
            <ul id="addFriendList"></ul>
        </div>
    )
}

export default AddFriend