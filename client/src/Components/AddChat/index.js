import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';


function AddChat() {
    const [state, dispatch] = useStoreContext();
    
    return (
        <div>
            <p>Give your chat a name!</p>
            <input></input>
            <button> ➡️ </button>
            
        </div>
    )
}

export default AddChat