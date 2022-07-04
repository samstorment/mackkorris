export async function get(endpoint: string) {
	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include'
	}).then((r) => r.json());
}

export async function post(endpoint: string, data: unknown = {}) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export async function put(endpoint: string, data: unknown = {}) {
	return fetch(endpoint, {
		method: 'PUT',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export async function del(endpoint: string, data: unknown = {}) {
	return fetch(endpoint, {
		method: 'DELETE',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export function date(dateString: string): string {
	return new Date(dateString).toLocaleDateString();
}

export function time(dateString: string): string {
	return new Date(dateString).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}

export function dateTime(dateString: string): string {
	return new Date(dateString).toLocaleDateString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}