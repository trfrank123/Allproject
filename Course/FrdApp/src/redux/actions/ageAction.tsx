import { GET_AGE } from '../types';


function performGet(payload: any) {
	return {
		type: GET_AGE,
        payload
	}
}

export function getAgeRange() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/ageRange/ageRange")
		let json = await response.json()

		dispatch(performGet(json));
	}
}