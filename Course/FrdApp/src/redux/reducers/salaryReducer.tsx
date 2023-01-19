import { GET_SALARY } from '../types';

const initialState = {
    salary_range: []
};

type Action = {
    type: string
    payload?: any
}

export const salaryReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_SALARY:
            return {
                ...state,
                salary_range: action.payload
            };
        default:
            return state;
    }
}