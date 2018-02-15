import axios from 'axios';
import store from './store';
import { toBasicAuth } from './utils';
import { apiUrl, testingMode } from './config';

let axiosInstance = axios.create({
	baseURL: apiUrl,
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
		axios.get(apiUrl + 'auth', {
			headers: {
				Authorization: toBasicAuth(email, password),
			},
			timeout: 2000,
		}).then(response => {
			console.log(response)
			res(response.data.token);
		}).catch(err => {
			rej(err);
		});
	})
}

export function getAllItems() {
	return new Promise((res, rej) => {
		axiosInstance.get('/items')
			.then(response => {

			})
	})
}

export function getList(name) {
	return new Promise((res, rej) => {
	})
}

export function getItem(itemId) {
	return new Promise((res, rej) => {
		itemId in items ? res(items[itemId]) : rej("Item not found")
	});
}

export function getContainer(containerId) {
	return new Promise((res, rej) => {
		containerId in containers ? res(containers[containerId]) : rej("Container not found")
	})
}