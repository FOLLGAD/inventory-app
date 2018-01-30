const spAuth = require('node-sp-auth');

import { BASE_URL } from './config';

export function d(email, password) {
	return {
		type: 'LOGIN',
		email,
		password,
	}
}

export function login(email, password) {

	return function (dispatch) {

		let creds = {
			username: email,
			password: passsword,
		}

		return spAuth
			.getAuth(baseUrl, creds)
			.then(data => {
				console.log(data.headers);
				console.log("SUCCESS!");
			})
	}
}