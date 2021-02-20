import { useReducer } from 'react';
import {
    UPDATE_CHANNEL,
    GET_FRIENDS,
    GET_USER,
    TOGGLE_FRIENDS,
    TOGGLE_CHAT
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CHANNEL:
            return {
                ...state,
                channels: [...action.channels]
            };
        case GET_FRIENDS:
            return {
                ...state,
                friends: [...action.friends]
            }
        case GET_USER:
            return {
                ...state,
                firstName: action.firstName, 
                lastName: action.lastName
            }
        case TOGGLE_FRIENDS:
            return {
                ...state,
                friendsListOpen: !state.friendsListOpen
            }
        case TOGGLE_CHAT:
            return {
                ...state,
                currentChat:  action.currentChat
            }

        default:
            return state;
    }
};

export function useChatReducer(initialState) {
    return useReducer(reducer, initialState);
}