<script lang="ts">
	import { loadAllLocales } from '../i18n/i18n-util.sync';
	import { LL, setLocale } from '../i18n/i18n-svelte';

	loadAllLocales();
	setLocale('en');
</script>

<p>{$LL.HI({ name: 'Ivan' })}</p>
