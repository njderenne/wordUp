import { useReducer } from 'react';
import {
    UPDATE_CHANNEL
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CHANNEL:
            return {
                ...state,
                channels: [...action.channels]
            };

        default:
            return state;
    }
};

export function useChatReducer(initialState) {
    return useReducer(reducer, initialState);
}