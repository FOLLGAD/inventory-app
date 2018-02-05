const initialState = {
	loginCookie: undefined,
	isDev: true,
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, { loginCookie: 'Authed' });
		default:
			return state;
	}
}