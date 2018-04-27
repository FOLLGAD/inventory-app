export function login({ token, name, phone, email }) {
	return {
		type: 'LOGIN',
		token,
		name,
		phone,
		email,
	}
}
export function setApiUrl(apiUrl) {
	return {
		type: 'SET_API_URL',
		apiUrl,
	}
}
export function setMe({ name, phone, email }) {
	return {
		type: 'SET_ME',
		name,
		phone,
		email,
	}
}
export function setItems(items) {
	return {
		type: 'SET_ITEMS',
		items,
	}
}
export function setItemTypes(itemTypes) {
	return {
		type: 'SET_ITEM_TYPES',
		itemTypes,
	}
}
export function setContainers(containers) {
	return {
		type: 'SET_CONTAINERS',
		containers,
	}
}