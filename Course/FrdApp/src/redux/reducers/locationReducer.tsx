import { GET_LOCATION, SET_LOCATION } from '../types';

const initialState = {
    location: [],
    selectedLocation: ''
};

type Action = {
    type: string,
    payload?: any
}

export const locationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_LOCATION:
            return {
                ...state,
                location: action.payload
            };
        case SET_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload
            };
        default:
            return state;
    }
}
