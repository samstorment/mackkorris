export function respond(user, error, status=401) {

    if (error) {
		return { 
			status, 
			body: {
				error
			} 
		};
	}

	const value = Buffer
		.from(JSON.stringify(user))
		.toString('base64');

	return {
		headers: {
			'set-cookie': `user=${value}; Path=/; HttpOnly`
		},
		body: {
			user,
			error
		}
	};
}