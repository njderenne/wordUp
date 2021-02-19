import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState'
import { TOGGLE_FRIENDS, GET_FRIENDS } from '../../utils/actions';
import { QUERY_USER } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers'

function AddFriend() {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_USER)

    useEffect(() => {
        if(data) {
            dispatch({
                type: GET_FRIENDS,
                friends: data.user.friends
            });
            console.log(`AddFriend Component ${JSON.stringify(data.user)}`)
            data.user.friends.forEach((friend) => {
                idbPromise('friends', 'put', friend);
            })
        }     else if(!loading) {
            idbPromise('friends', 'get').then((friends) => {
                dispatch({
                    type: GET_FRIENDS,
                    friends: friends
                });
            });
        }
    }, [data, loading, dispatch]);


    return(
        <div>
            <div>
            {state.friends.map(friend => (
                <p>{friend.firstName} {friend.lastName}</p>
                 ))}
            </div>
        </div>
    )
}

export default AddFriend;