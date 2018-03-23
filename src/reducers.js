const initialState = {
	loginToken: undefined,
	isDev: true,
	items: [],
	itemTypes: [],
	containers: [],
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, { loginToken: action.token });
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