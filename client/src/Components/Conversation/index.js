import React, { useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { useStoreContext } from '../../utils/GlobalState';

function Conversation() {
    return (
        <div>
            <div>
                <p>
                    Hey, what's up?
                </p>
                <p>
                    Playing some P5R, just about to fight the last boss. Gonna platinum this game!
                </p>
            </div>
            <div>
                <div className="flex object-none object-bottom">
                    <input className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-black rounded-md" />
                    <button>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Conversation;