import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import {
	cacheExchange,
	createClient,
	dedupExchange,
	errorExchange,
	fetchExchange,
	ssrExchange
} from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ fetch, data }) => {
	const client = createClient({
		url: 'http://localhost:3000/graphql',
		exchanges: [
			dedupExchange,
			cacheExchange,
			ssrExchange({
				initialState: browser ? window.__URQL__ : undefined,
				isClient: browser
			}),
			errorExchange({
				onError: (err) => {
					console.error(err);
				}
			}),
			authExchange({
				async getAuth({ authState }) {
					console.log('CALLED');
					if (!authState) {
						return data?.accessToken ?? null;
					}
					console.log('YES');
					const result = await fetch('http://localhost:3000/refresh', {
						method: 'POST',
						credentials: 'include'
					});

					console.log('REFRESH: ' + result);

					const json = await result.json();

					if (json?.access_token) {
						return json.access_token;
					}

					if (browser) {
						await goto('/');
					}

					return null;
				},
				addAuthToOperation({ operation }) {
					return operation; // Do nothing, as it is managed in cookies
				},
				didAuthError({ error }) {
					console.log(error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED'));
					return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
				}
			}),
			fetchExchange
		],
		fetch,
		fetchOptions: {
			credentials: 'include'
		}
	});

	return { client };
};
