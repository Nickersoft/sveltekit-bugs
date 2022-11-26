import scp from 'set-cookie-parser';

import type { Handle, HandleFetch } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		// Ensure the content-type header is passed through for server-side URQL requests
		filterSerializedResponseHeaders: (header) => ['content-type'].includes(header.toLowerCase())
	});
};

export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	if (request.url.includes('graphql')) {
		request.headers.set('cookie', event.request.headers.get('cookie') ?? '');
	}

	const res = await fetch(request);

	const setCookie = res.headers.get('set-cookie');

	if (setCookie) {
		const parsed = scp.parse(setCookie);

		parsed.forEach((cookie) => {
			event.cookies.set(cookie.name, cookie.value, {
				...cookie,
				secure: false, // This some bullshit https://github.com/sveltejs/kit/issues/7467#issuecomment-1319033326
				sameSite: cookie.sameSite as CookieSerializeOptions['sameSite']
			});
		});
	}

	return res;
};
