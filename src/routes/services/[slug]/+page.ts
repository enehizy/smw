import { error } from '@sveltejs/kit';
import { services } from '#lib/data.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const service = services.find((s) => s.slug === params.slug);
	if (!service) error(404, 'Service not found');
	return { service };
};

export const entries: EntryGenerator = () => services.map((s) => ({ slug: s.slug }));
