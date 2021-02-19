import { useReducer } from 'react';
import {
    UPDATE_CHANNEL,
    GET_FRIENDS,
    GET_USER
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

        default:
            return state;
    }
};

export function useChatReducer(initialState) {
    return useReducer(reducer, initialState);
}