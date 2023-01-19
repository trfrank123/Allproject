import { GET_AGE } from '../types';

const initialState = {
    age_range: []
};

type Action = {
    type: string
    payload?: any
}

export const ageReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_AGE:
            return {
                ...state,
                age_range: action.payload
            };
        default:
            return state;
    }
}