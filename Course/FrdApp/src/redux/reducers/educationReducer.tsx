import { GET_EDUCATION } from '../types';

const initialState = {
    education: []
};

type Action = {
    type: string,
    payload?: any
}

export const educationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_EDUCATION:
            return {
                ...state,
                education: action.payload
            };
        default:
            return state;
    }
}

