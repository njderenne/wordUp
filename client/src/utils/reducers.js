import { useReducer } from 'react';
import {
    SELECT_CHANNEL
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_CHANNEL:
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