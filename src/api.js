let testing = true;

let apiUrl = 'https://abb.sharepoint.com/sites/CombiX/LabInventory/_api'

export function authorize(email, password) {
	return new Promise((res, rej) => {
		if (testing) {
			// setTimeout(() => res({ name: 'Emil' }), 1000);
			res({ name: 'Emil' })
		}

		// fetch(apiUrl, {
		// })
		// .then(res => res.json())
		// .then(res);
	})
}

export function getAllLists() {
	return new Promise((res, rej) => {
		if (testing) {
			setTimeout(() => res(
				[
					{ name: 'Artiklar', items: [{ name: 'Screwdriver' }] },
				]
			), 1000);
			return;
		}
	})
}

export function getList(name) {
	return new Promise((res, rej) => {
		if (testing) {
			setTimeout(() => res({ name: 'Artiklar', items: [{ name: 'Screwdriver' }] }), 1000);
			return;
		}
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