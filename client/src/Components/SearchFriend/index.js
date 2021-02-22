import React from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_FRIEND } from '../../utils/mutations';

function AddFriend() {

    return (
        <div>
            <input />
            <button>➡️</button>
        </div>
    )
}

export default AddFriend