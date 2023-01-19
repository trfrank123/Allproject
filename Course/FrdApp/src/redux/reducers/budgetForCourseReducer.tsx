import { GET_BUDGETFORCOURSE } from '../types';

const initialState = {
    budget_range: []
};

type Action = {
    type: string
    payload?: any
}

export const budgetForCourseReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_BUDGETFORCOURSE:
            return {
                ...state,
                budget_range: action.payload
            };
        default:
            return state;
    }
}