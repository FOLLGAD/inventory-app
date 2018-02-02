import { BASE_URL } from './config';

export function login() {
	console.log("ACTION LOGIN()")
	return {
		type: 'LOGIN',
	}
}