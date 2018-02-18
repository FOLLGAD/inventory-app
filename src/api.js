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
		axios.get(apiUrl + 'auth', {
			auth: {
				username: email,
				password: password,
			},
			timeout: 5000,
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
				res(response);
			})
	})
}

export function getList(name) {
	return new Promise((res, rej) => {
	})
}

export function getItem(itemId) {
	return new Promise((res, rej) => {
		axiosInstance
			.get(`/items/${itemId}`)
			.then(res)
			.catch(rej);
	});
}

export function getContainer(containerId) {
	return new Promise((res, rej) => {
		rej()
	})
}