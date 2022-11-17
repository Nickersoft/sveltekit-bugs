import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('http://example.com:9090/api', {
		method: 'POST',
		credentials: 'include'
	});

	return { message: response.text() };
};
