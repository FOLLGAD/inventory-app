import { getContainers, getItems, getItemTypes } from './api';
import { setContainers, setItems, setItemTypes } from './actions';

import store from './store';
const dispatch = store.dispatch;

export async function fetchItemTypes() {
	let data = await getItemTypes()
	dispatch(setItemTypes(data))

	return data
}
export async function fetchItems() {
	let data = (await getItems()).filter(d => d)
	dispatch(setItems(data))

	return data
}
export async function fetchContainers() {
	let data = await getContainers()
	dispatch(setContainers(data))

	return data
}