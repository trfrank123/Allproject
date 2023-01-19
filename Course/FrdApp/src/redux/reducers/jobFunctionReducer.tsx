import { GET_JOBFUNCTIONS } from '../types';

const initialState = {
    job_type: []
};

type Action = {
    type: string
    payload?: any
}

export const jobFunctionReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_JOBFUNCTIONS:
            return {
                ...state,
                job_type: action.payload
            };
        default:
            return state;
    }
}