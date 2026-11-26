import { error } from '@sveltejs/kit';
import { news } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = news.find((n) => n.slug === params.slug);
	if (!article) error(404, 'Article not found');
	return { article };
};

export const entries: EntryGenerator = () => news.map((n) => ({ slug: n.slug }));
