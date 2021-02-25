import React, { createContext, useContext } from 'react';
import { useChatReducer } from './reducers';
const StoreContext = createContext();
const { Provider } = StoreContext;


const ChannelProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useChatReducer({
        channels: [],
        messages: [],
        friends: [],
        participants: [],
        users: [],
        loggedUser: '',
        currentChat: '',
        firstName: '',
        lastName: '',
        friendsListOpen: false,
        newChatOpen: false,
        newFriendOpen: false,
        participantsListOpen: false
        })
    //console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
    
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { ChannelProvider, useStoreContext };
