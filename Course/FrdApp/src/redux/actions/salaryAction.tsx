import { GET_SALARY } from '../types';


function performGet(payload: any) {
	return {
		type: GET_SALARY,
        payload
	}
}

export function getSalaryRange() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/salary/salary")
		let json = await response.json()

		dispatch(performGet(json));
	}
}