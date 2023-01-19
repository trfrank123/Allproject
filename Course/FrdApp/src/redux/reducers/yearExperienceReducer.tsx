import { GET_YEAREXPERIENCE } from '../types';

const initialState = {
    year_range:[]
};

type Action = {
    type: string
    payload?: any
}

export const yearExperienceReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_YEAREXPERIENCE:
            return {
                ...state,
                year_range: action.payload
            };
        default:
            return state;
        }
    }