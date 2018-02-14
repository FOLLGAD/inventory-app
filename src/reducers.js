const initialState = {
	loginToken: undefined,
	isDev: true,
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, { loginToken: action.token });
		default:
			return state;
	}
}