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
					if (!authState) {
						return data?.accessToken ?? null;
					}

					const result = await fetch('http://localhost:3000/refresh', {
						method: 'POST',
						credentials: 'include'
					});

					const json = await result.json();

					console.log('REFRESHED: ' + json.access_token);

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
