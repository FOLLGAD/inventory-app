import axios from 'axios';
import store from './store';
import { apiUrl } from './config';

let axiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		token: store.getState().loginToken,
	},
});

store.subscribe(() => {
	let state = store.getState();
	axiosInstance = axios.create({
		baseURL: apiUrl,
		headers: {
			token: state.loginToken,
		},
	});
});

export function authorize(email, password) {
	return new Promise((res, rej) => {
		axiosInstance.get('auth', {
			auth: {
				username: email,
				password: password,
			},
			timeout: 5000,
		}).then(response => {
			res(response.data.token);
		}).catch(err => {
			console.log(err)
			rej(err);
		});
	})
}

export function getItems() {
	return new Promise((res, rej) => {
		axiosInstance.get('/items', {
			params: {
				populate: true,
			},
		})
			.then(({ data }) => {
				res(data);
			})
	})
}

export function getItemTypes() {
	return new Promise((res, rej) => {
		axiosInstance.get('/item-types', {
			params: {
				populate: true,
			},
		})
			.then(({ data }) => {
				res(data);
			})
	})
}

export function deleteItemType(itemTypeId) {
	return new Promise((res, rej) => {
		axiosInstance.delete(`/item-types/${itemTypeId}`)
			.then(({ data }) => res(data))
			.catch(rej)
	})
}

export function getContainers() {
	return new Promise((res, rej) => {
		axiosInstance.get('/containers', {
			params: {
				populate: true,
			},
		})
			.then(({ data }) => {
				res(data);
			})
	})
}

export function deleteContainer(containerId) {
	return new Promise((res, rej) => {
		axiosInstance
			.delete(`/containers/${containerId}`)
			.then(({ data }) => res(data))
			.catch(rej);
	});
}

export function getItem(itemId) {
	return new Promise((res, rej) => {
		axiosInstance
			.get(`/items/${itemId}`, {
				params: {
					populate: true,
				},
			})
			.then(({ data }) => res(data))
			.catch(rej);
	});
}

export function deleteItem(itemId) {
	return new Promise((res, rej) => {
		axiosInstance
			.delete(`/items/${itemId}`)
			.then(({ data }) => res(data))
			.catch(rej);
	});
}

export function getContainer(containerId) {
	return new Promise((res, rej) => {
		axiosInstance
			.get(`/containers/${containerId}`, {
				params: {
					populate: true,
				},
			})
			.then(({ data }) => res(data))
			.catch(rej);
	});
}

export function createContainer({ name }) {
	return new Promise((res, rej) => {
		axiosInstance
			.post(`/containers`, {
				name,
			})
			.then(({ data }) => res(data))
			.catch(rej)
	})
}

export function borrowItem({ itemId, to }) {
	return new Promise((res, rej) => {
		axiosInstance
			.post(`/items/${itemId}/borrow`, {
				to,
			})
			.then(({ data }) => res(data))
			.catch(rej)
	})
}

export function createItemType({ name, propertyTypes }) {
	console.assert(propertyTypes.every(pt => typeof pt.name == "string" && typeof pt.type == "string"))
	console.assert(typeof name == "string")

	return new Promise((res, rej) => {
		axiosInstance
			.post(`/item-types`, {
				name,
				propertyTypes,
			})
			.then(({ data }) => res(data))
			.catch(rej)
	})
}

export function createItem({ properties, itemType, container }) {
	return new Promise((res, rej) => {
		axiosInstance
			.post(`/items`, {
				properties,
				itemType,
				container,
			})
			.then(({ data }) => res(data))
			.catch(rej)
	})
}