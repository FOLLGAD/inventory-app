export function login(token) {
	return {
		type: 'LOGIN',
		token,
	}
}