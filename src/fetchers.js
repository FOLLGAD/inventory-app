import { getContainers, getItems, getItemTypes, getMe } from './api';
import { setContainers, setItems, setItemTypes, setMe } from './actions';

import store from './store';
const dispatch = store.dispatch;

export async function fetchItemTypes() {
	let itemTypes = await getItemTypes()

	let items = store.getState().items;
	let populatedItemType = itemTypes.map(itemType => {
		itemType.n_items = items.filter(item => item.itemType && item.itemType._id == itemType._id).length
		return itemType
	})
	dispatch(setItemTypes(itemTypes))

	return populatedItemType
}
export async function fetchItems() {
	let data = (await getItems()).filter(d => d)
	dispatch(setItems(data))

	return data
}
export async function fetchContainers() {
	let containers = await getContainers();

	let items = store.getState().items;
	let populatedContainers = containers.map(container => {
		// Set container prop "n_items" to the number of items that are in said container
		container.n_items = items.filter(item => item.container && item.container._id == container._id).length
		return container
	})
	dispatch(setContainers(populatedContainers))

	return populatedContainers
}
export async function fetchMe() {
	let data = await getMe()
	dispatch(setMe(data))

	return data
}