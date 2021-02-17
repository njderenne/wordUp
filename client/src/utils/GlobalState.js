import React, { createContext, useContext } from 'react';
import { useChatReducer } from './reducers';
const ChatContext = createContext();
const { Provider } = ChatContext;


const ChannelProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useChatReducer({

    })
    console.log(state);
    
};

