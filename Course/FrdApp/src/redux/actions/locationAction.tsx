import { GET_LOCATION, SET_LOCATION } from '../types';


function performGet(payload: any) {
	return {
		type: GET_LOCATION,
        payload
	}
}

function performSet(payload: any) {
	return {
		type: SET_LOCATION,
        payload
	}
}
export function getLocation() {
	return async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/location/location")
		let data = await response.json()
		
		dispatch(performGet(data));
	}
}

export function selectLocation(location) {
	return (dispatch) => {
		dispatch(performSet(location))
	}
}