import { GET_IDENTITY } from '../types';

const initialState = {
    identity: []
};

type Action = {
    type: string
    payload?: any
}

export const identityReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_IDENTITY:
            return {
                ...state,
                identity: action.payload
            };
        default:
            return state;
    }
}