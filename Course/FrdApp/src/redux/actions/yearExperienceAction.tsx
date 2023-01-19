import { GET_YEAREXPERIENCE } from '../types';


function performGet(payload: any) {
	return {
		type: GET_YEAREXPERIENCE,
        payload
	}
}

export function getWorkExperience() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/yearExperience/yearExperience")
		let json = await response.json()

		dispatch(performGet(json));
	}
}