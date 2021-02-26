import { useReducer } from 'react';
import {
    UPDATE_CHANNEL,
    GET_FRIENDS,
    GET_USER,
    TOGGLE_FRIENDS,
    TOGGLE_CHAT,
    UPDATE_MESSAGES,
    TOGGLE_NEWCHAT,
    GET_USERS,
    TOGGLE_NEWFRIEND,
    TOGGLE_PARTICIPANTS,
    GET_PARTICIPANTS
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CHANNEL:
            return {
                ...state,
                channels: [...action.channels]
            }
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
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
        case TOGGLE_NEWCHAT:
            return {
                ...state,
                newChatOpen: !state.newChatOpen
            }
        case TOGGLE_NEWFRIEND:
            return {
                ...state,
                newFriendOpen: !state.newFriendOpen
            }
        case GET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case TOGGLE_PARTICIPANTS:
            return {
                ...state,
                participantsListOpen: !state.participantsListOpen
            }
        case GET_PARTICIPANTS:
            return {
                ...state,
                participants: [...action.participants]
            }

        default:
            return state;
    }
};

export function useChatReducer(initialState) {
    return useReducer(reducer, initialState);
}