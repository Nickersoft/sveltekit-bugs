import type { Locales } from '../i18n/i18n-types';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	await loadLocaleAsync('en');
	return { locale: 'en' as Locales };
};
