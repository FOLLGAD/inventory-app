const initialState = {
	loginCookie: undefined,
}

export default function app(state = initialState, action) {
	console.log(state, action)
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, { loginCookie: 'Authed' });
		default:
			return state;
	}
}