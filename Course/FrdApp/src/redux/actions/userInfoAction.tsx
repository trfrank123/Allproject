import { GET_USERINFO, CREATE_USERINFO, SET_USERINFO, UPLOAD_USERINFO } from '../types';


function performGet(payload: any) {
	return {
		type: GET_USERINFO,
        payload
	}
}

function performCreate(payload: any) {
	return {
		type: CREATE_USERINFO,
        payload
	}
}

function performUpdate(payload: any) {
	return {
		type: SET_USERINFO,
        payload
	}
}

function performUpload(payload: any) {
	return {
		type: UPLOAD_USERINFO,
        payload
	}
}

export function getUserInfo(id) {
	return  async (dispatch) => {

        // get data from db
        let response = await fetch(`https://www.forcourse.me/user/userInfo/${id}`)
		let json = await response.json()
		
		let payload = {
			age: {
				id: json.age_id, 
				age_range: json.age_range
			}, 
			budget_for_course: {
				id: json.budget_for_course_id, 
				budget_range: json.budget_range, 
			},
			ideal_work_location: {
				id: json.location_id,
				district: json.district
			},
			education: {
				id: json.education_id,
				education_level: json.education_level
			},
			email: json.email, 
			gender: json.gender, 
			icon: json.icon, 
			identity: {
				id: json.identity_id,
				identity: json.identity
			},
			job_function: {
				id:json.job_function_id,
				job_type: json.job_type
			},
			username: json.username, 
			expect_salary: {
				id: json.salary_id,
				salary_range: json.salary_range
			},
			work_experience: {
				id: json.year_experience_id,
				year_range: json.year_range
			},
			
		}

        // let data = ["初中及以下", "高中", "高級文憑、副學士", "學士", "碩士、深造文憑", "博士"]

		dispatch(performGet(payload));
	}
}

export function createUser(payload) {
	return  async (dispatch) => {
		const { username, password, email, gender, phone, ideal_career1, ideal_career2, ideal_career3} = payload;

			let res = await fetch("https://www.forcourse.me/user/signup",{
			  method:'POST',
			  body: 
				JSON.stringify({
					username,
					password,
					email,
					work_experience: payload.work_experience.id,
					education: payload.education.id,
					age: payload.age.id == 0 ? null : payload.age.id,
					job_function: payload.job_function.id,
					budget_for_course: payload.budget_for_course.id == 0 ? null : payload.budget_for_course.id ,
					gender,
					phone,
					identity: payload.identity.id,
					ideal_work_location: payload.ideal_work_location.id,
					ideal_career1,
					ideal_career2,
					ideal_career3,
					expect_salary: payload.expect_salary.id == 0 ? null : payload.expect_salary.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			  })
			  
			dispatch(performCreate(payload));
		}
}

export function updateUserInfo(payload) {
	return  async (dispatch) => {

		// console.log('updateUserInfo', payload)

		dispatch(performUpdate(payload));
	}
}

export function uploadUserInfo(id, payload) {
	return  async (dispatch) => {
	const { username, password, email, gender, phone, ideal_career1, ideal_career2, ideal_career3} = payload;
		console.log(id)
		console.log('payload ', payload);
		let res = await fetch("https://www.forcourse.me/user/updateUserInfo",{
          method:'PATCH',
          body: 
			JSON.stringify({
				id,
				username,
				password,
				email,
				work_experience: payload.work_experience.id,
				education: payload.education.id,
				age: payload.age.id,
				job_function: payload.job_function.id,
				budget_for_course: payload.budget_for_course.id,
				gender,
				phone,
				identity: payload.identity.id,
				ideal_work_location: payload.ideal_work_location.id,
				ideal_career1,
				ideal_career2,
				ideal_career3,
				expect_salary: payload.expect_salary.id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
          })
		  
     


		dispatch(performUpload(payload));
	}
}