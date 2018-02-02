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
			setTimeout(() => res({ name: 'Artiklar', items: [{ name: 'Screwdriver' }]}), 1000);
			return;
		}
	})
}