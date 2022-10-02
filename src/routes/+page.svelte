<script lang="ts">
	import LL from '../i18n/i18n-svelte';
	import type { Translation } from '../i18n/i18n-types';

	const tests: (keyof Translation)[] = ['test1', 'test2', 'test3'];
</script>

<ul>
	{#each tests as test}
		<li>{$LL[test]?.()}</li>
	{/each}
</ul>
