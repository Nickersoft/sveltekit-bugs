import type { HandleFetch } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import scp from 'set-cookie-parser';

export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	const res = await fetch(request);
	const setCookie = res.headers.get('set-cookie');

	if (setCookie) {
		const parsed = scp.parse(setCookie);

		parsed.forEach((cookie) => {
			event.cookies.set(cookie.name, cookie.value, {
				...cookie,
				domain: 'localhost',
				sameSite: cookie.sameSite as CookieSerializeOptions['sameSite']
			});
		});
	}

	return res;
};
