import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { TOGGLE_FRIENDS, GET_FRIENDS } from '../../utils/actions';
import { QUERY_USERS } from '../../utils/queries';

function AddFriend() {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_USERS)

    useEffect(() => {
        if(data) {
            dispatch({
                type: GET_FRIENDS,
                friends: data.friends
            });
            data.friends.forEach((friend) => {
                idbPromise('firneds', 'put', friend);
            })
        }     else if(!loading) {
            idbPromise('channels', 'get').then((friends) => {
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

export default AddFriend