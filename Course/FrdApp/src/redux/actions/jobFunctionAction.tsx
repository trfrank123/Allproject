import { GET_JOBFUNCTIONS } from '../types';


function performGet(payload: any) {
	return {
		type: GET_JOBFUNCTIONS,
        payload
	}
}

export function getJobFunctions() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/jobFunctions/jobFunctions")
		let json = await response.json()

		dispatch(performGet(json));
	}
}