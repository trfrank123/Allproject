import { GET_BUDGETFORCOURSE } from '../types';


function performGet(payload: any) {
	return {
		type: GET_BUDGETFORCOURSE,
		payload
	}
}

export function getBudgetForCourse() {
	return async (dispatch) => {

		// get data from db
		let response = await fetch("https://www.forcourse.me/budgetForCourse/budgetForCourse")
		let json = await response.json()

		dispatch(performGet(json));
	}
}