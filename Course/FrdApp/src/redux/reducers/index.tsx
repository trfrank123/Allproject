
import { combineReducers } from 'redux';
import { educationReducer } from './educationReducer';
import { locationReducer } from './locationReducer';
import { userInfoReducer } from './userInfoReducer';
import { ageReducer} from './ageReducer';
import { budgetForCourseReducer} from './budgetForCourseReducer';
import { identityReducer} from './identityReducer';
import { jobFunctionReducer} from './jobFunctionReducer';
import { yearExperienceReducer} from './yearExperienceReducer';
import { salaryReducer} from './salaryReducer';



export const rootReducer = combineReducers({
  educations: educationReducer,
  locations: locationReducer,
  userInfo: userInfoReducer,
  age: ageReducer,
  budget_for_courses: budgetForCourseReducer,
  identity: identityReducer,
  job_type: jobFunctionReducer,
  year_experiences: yearExperienceReducer,
  salary: salaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;