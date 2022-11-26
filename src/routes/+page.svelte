<script lang="ts">
	import { goto } from '$app/navigation';

	async function login(page: string) {
		await fetch('http://localhost:3000/login', {
			method: 'POST',
			body: JSON.stringify({
				username: 'john',
				password: 'changeme'
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		await goto(page);
	}
</script>

You're logged out!

<button on:click={() => login('/ssr')}>Sign in (SSR)</button>
<button on:click={() => login('/csr')}>Sign in (CSR)</button>
