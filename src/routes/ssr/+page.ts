import { redirect } from '@sveltejs/kit';
import { gql } from '@urql/core';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { client } = await parent();

	const result = await client
		.query(
			gql`
				query {
					whoAmI {
						username
					}
				}
			`,
			{}
		)
		.toPromise();

	if (!result.data) {
		throw redirect(302, '/');
	}

	return result.data;
};
