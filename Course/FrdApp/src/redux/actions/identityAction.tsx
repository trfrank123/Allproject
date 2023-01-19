import { GET_IDENTITY } from '../types';


function performGet(payload: any) {
	return {
		type: GET_IDENTITY,
        payload
	}
}

export function getIdentity() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/identity/identity")
		let json = await response.json()

		dispatch(performGet(json));
	}
}