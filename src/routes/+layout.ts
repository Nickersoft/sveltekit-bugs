import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('http://localhost:9090/api', {
		method: 'POST',
		credentials: 'include'
	});

	return { message: response.text() };
};
