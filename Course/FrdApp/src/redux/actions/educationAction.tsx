import { GET_EDUCATION } from '../types';


function performGet(payload: any) {
	return {
		type: GET_EDUCATION,
        payload
	}
}

export function getEducation() {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch("https://www.forcourse.me/education/education")
		let json = await response.json()
		
        // let data = ["初中及以下", "高中", "高級文憑、副學士", "學士", "碩士、深造文憑", "博士"]

		dispatch(performGet(json));
	}
}