import { useReducer } from 'react';
import {
    UPDATE_CHANNEL,
    GET_FRIENDS
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

        default:
            return state;
    }
};

export function useChatReducer(initialState) {
    return useReducer(reducer, initialState);
}