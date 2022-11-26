<script lang="ts">
	import { setContextClient } from '@urql/svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setContextClient(data.client);
</script>

<slot />
