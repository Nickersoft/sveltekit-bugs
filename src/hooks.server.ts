import type { HandleFetch } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import scp from 'set-cookie-parser';

export const handleFetch: HandleFetch = async ({ fetch, request, event }) => {
	const res = await fetch(request);
	const setCookie = res.headers.get('set-cookie');

	event.cookies.set('dummy', 'test');

	if (setCookie) {
		const parsed = scp.parse(setCookie);

		parsed.forEach((cookie) => {
			event.cookies.set(cookie.name, cookie.value, {
				...cookie,
				sameSite: cookie.sameSite as CookieSerializeOptions['sameSite']
			});
		});
	}

	console.log(event.cookies.get('access_token'));
	console.log(event.cookies.get('dummy'));

	return res;
};
