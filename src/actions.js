export function login(token) {
	return {
		type: 'LOGIN',
		token,
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