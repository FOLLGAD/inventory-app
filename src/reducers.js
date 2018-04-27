import { apiUrl } from './config';

const initialState = {
	isDev: true,
	login: {},
	items: [],
	itemTypes: [],
	containers: [],
	apiUrl,
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, { login: { token: action.token, email: action.email, name: action.name, phone: action.phone } });
		case 'SET_API_URL':
			return Object.assign({}, state, { apiUrl: action.apiUrl });
		case 'SET_ME':
			return Object.assign({}, state, { login: { token: state.login.token, email: action.email, name: action.name, phone: action.phone } });
		case 'SET_ITEMS':
			return Object.assign({}, state, { items: action.items });
		case 'SET_ITEM_TYPES':
			return Object.assign({}, state, { itemTypes: action.itemTypes });
		case 'SET_CONTAINERS':
			return Object.assign({}, state, { containers: action.containers });
		default:
			return state;
	}
}