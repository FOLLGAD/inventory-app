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
		if (testingMode) {
			res({ name: 'Emil' });
			return;
		}

		axiosInstance.get('/auth', {
			headers: {
				Authorization: toBasicAuth(email, password),
				timeout: 5000,
			}
		}).then(response => {
			res(response.data.token);
		}).catch(err => {
			console.log(err)
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
let containers = {
	"cont1": {

	},
	"cont2": {

	},
}

let items = {
	"item1": {
		"container": "cont1",
		"name": "Skruvar",
		"properties": [
			{
				id: "101",
				type: "Status",
				value: 1,
			},
		],
	},
	"item2": {
		"container": "cont1",
		"name": "Hammare",
		"properties": [
			{
				id: "100",
				type: "Antal",
				value: 5,
			},
		],
	},
	"osc": {
		"container": "cont2",
		"name": "Oscilloskåp",
		"properties": [
			{
				id: "124",
				type: "Senast kalibreringsdatum",
				value: (new Date()).toISOString(),
			},
			{
				id: "121",
				type: "Programvara version",
				value: "21.0.3",
			},
		],
	},
}

export function lookupItem(itemId) {
	return new Promise((res, rej) => {
		itemId in items ? res(items[itemId]) : rej("Item not found")
	});
}

export function lookupContainer(containerId) {
	return new Promise((res, rej) => {
		containerId in containers ? res(containers[containerId]) : rej("Container not found")
	})
}