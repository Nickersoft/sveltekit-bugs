<script lang="ts">
	import { getContextClient, gql, queryStore } from '@urql/svelte';

	const client = getContextClient();

	const result = queryStore({
		client,
		query: gql`
			query {
				whoAmI {
					username
				}
			}
		`,
		variables: {}
	});
</script>

Welcome {$result.data?.whoAmI.username}!
