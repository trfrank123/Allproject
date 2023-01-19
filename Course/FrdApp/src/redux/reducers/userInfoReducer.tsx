import { GET_USERINFO, CREATE_USERINFO, SET_USERINFO, UPLOAD_USERINFO } from '../types';

const initialState = {
    userInfo: {
        username: '',
        password: '',
        confirm_password:'',
        created_at: '',
        updated_at: '',
        email: '',
        work_experience: {
            id: 1,
            year_range: '0 - 1 年'
        },
        education: {
            id: 1,
            education_level: ''
        },
        age: {
            id:1,
            age_range: ''
        },
        job_function: {
            id:8,
            job_type: '進出口貿易、批發及零售業'
        },
        budget_for_course: {
            id:1,
            budget_range: ''
        },
        gender: '',
        phone: '',
        identity: {
            id:1,
            identity: ''
        },
        ideal_work_location: {
            id:1,
            district: ''
        },
        icon: '',
        ideal_career1: null,
        ideal_career2: null,
        ideal_career3: null,
        expect_salary: {
            id: 1,
            salary_range: ''
        }
    }
};

type Action = {
    type: string
    payload?: any
}

export const userInfoReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_USERINFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case CREATE_USERINFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case SET_USERINFO:
            return {
                ...state,
                // userInfo: { ...state.userInfo,...action.payload}
                userInfo: Object.assign(state.userInfo,action.payload)
            };
        case UPLOAD_USERINFO:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
}

