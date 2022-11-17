<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	async function setCookie() {
		await fetch('http://example.com:9090/api', {
			method: 'POST',
			credentials: 'include'
		});
	}
</script>

{data.message}

<button on:click={setCookie}>Set cookie</button>
