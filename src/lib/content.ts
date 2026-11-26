// Editable content (managed in Sveltia CMS at /admin) lives as one JSON file per item
// under src/content/. Files are bundled at build time; a CMS commit triggers a rebuild.
import { marked } from 'marked';

export type StreamingPlatform = 'spotify' | 'apple' | 'audiomack' | 'boomplay' | 'youtube';

export const platforms: { key: StreamingPlatform; label: string }[] = [
	{ key: 'spotify', label: 'Spotify' },
	{ key: 'apple', label: 'Apple Music' },
	{ key: 'audiomack', label: 'Audiomack' },
	{ key: 'boomplay', label: 'Boomplay' },
	{ key: 'youtube', label: 'YouTube Music' }
];

export type Release = {
	slug: string;
	title: string;
	artists: string;
	cover: string;
	date: string;
	/** One link for all platforms (smart link such as lnk.to / vyd.co, or a YouTube link). */
	link: string;
	links: Partial<Record<StreamingPlatform, string>>;
};

export type Video = {
	slug: string;
	title: string;
	artists: string;
	youtube: string;
	youtubeId: string | null;
	date: string;
};

export type NewsItem = {
	slug: string;
	title: string;
	summary: string;
	date: string;
	image: string;
	/** Article body rendered from Markdown. Authored by trusted CMS editors only. */
	html: string;
};

type Raw = Record<string, unknown>;

function load(files: Record<string, unknown>) {
	return Object.entries(files).map(([path, data]) => ({
		slug: path.split('/').pop()!.replace(/\.json$/, ''),
		data: (data ?? {}) as Raw
	}));
}

const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const TRACKING_PARAMS = /^(utm_\w+|fbclid|gclid|igshid|si)$/;

/** Strips social-media tracking parameters (utm_*, fbclid, si…) that come with copied links. */
export function cleanUrl(value: unknown): string {
	const raw = text(value);
	if (!raw) return '';
	try {
		const u = new URL(raw);
		for (const key of [...u.searchParams.keys()]) {
			if (TRACKING_PARAMS.test(key)) u.searchParams.delete(key);
		}
		return u.toString();
	} catch {
		return '';
	}
}
const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);

/** Accepts youtu.be, youtube.com/watch?v=, /shorts/, /embed/ and /live/ links, or a bare 11-character ID. */
export function youtubeId(url: string): string | null {
	const s = url.trim();
	if (/^[\w-]{11}$/.test(s)) return s;
	try {
		const u = new URL(s);
		if (u.hostname === 'youtu.be') return u.pathname.slice(1, 12) || null;
		const v = u.searchParams.get('v');
		if (v) return v.slice(0, 11);
		const m = u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
		return m ? m[1] : null;
	} catch {
		return null;
	}
}

export const releases: Release[] = load(
	import.meta.glob('/src/content/releases/*.json', { eager: true, import: 'default' })
)
	.map(({ slug, data }) => {
		const rawLinks = (data.links ?? {}) as Raw;
		const links: Release['links'] = {};
		for (const { key } of platforms) {
			const url = cleanUrl(rawLinks[key]);
			if (url) links[key] = url;
		}
		return {
			slug,
			title: text(data.title),
			artists: text(data.artists),
			cover: text(data.cover),
			date: text(data.date),
			link: cleanUrl(data.link),
			links
		};
	})
	.filter((r) => r.title && r.cover)
	.sort(byDateDesc);

export const videos: Video[] = load(
	import.meta.glob('/src/content/videos/*.json', { eager: true, import: 'default' })
)
	.map(({ slug, data }) => {
		const youtube = text(data.youtube);
		return {
			slug,
			title: text(data.title),
			artists: text(data.artists),
			youtube,
			youtubeId: youtubeId(youtube),
			date: text(data.date)
		};
	})
	.filter((v) => v.title && v.youtubeId)
	.sort(byDateDesc);

export const news: NewsItem[] = load(
	import.meta.glob('/src/content/news/*.json', { eager: true, import: 'default' })
)
	.map(({ slug, data }) => ({
		slug,
		title: text(data.title),
		summary: text(data.summary),
		date: text(data.date),
		image: text(data.image) || '/images/logo.webp',
		html: marked.parse(text(data.body), { async: false })
	}))
	.filter((n) => n.title && n.date)
	.sort(byDateDesc);

export function formatDate(iso: string) {
	const d = new Date(iso.slice(0, 10) + 'T00:00:00');
	if (Number.isNaN(d.getTime())) return '';
	return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
