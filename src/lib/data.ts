import type { IconName } from './icons.ts';

export const site = {
	name: 'Slesh Music Worldwide',
	short: 'SMW',
	phones: ['+234 801 2345 678', '+27 801 2345 678'],
	address: 'Lorem ipsum dolor sit amet consectetur.',
	socials: [
		{ name: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
		{ name: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
		{ name: 'X', icon: 'x', href: 'https://x.com' },
		{ name: 'Facebook', icon: 'facebook', href: 'https://facebook.com' }
	] satisfies { name: string; icon: IconName; href: string }[]
};

export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Artists', href: '/artists' },
	{ label: 'Contact', href: '/contact' }
];

export const intro =
	'Slesh Music Worldwide (SMW) is a Nigerian-based record label and entertainment company shaping sounds, discovering talent and taking African music beyond borders. Inspired by contemporary African sounds, we are driven by a passion for creativity, originality and artistic expression. We seek to bridge the gap between African artistry and international audiences. Through music and strategic partnerships, we are building a platform where talent flourishes, creativity thrives and African sounds gain wider recognition.';

export const mission =
	'To discover, develop and promote exceptional musical talent while creating quality music and meaningful cultural experiences that inspire audiences and connect people across the world.';

export const vision =
	'To become a leading African entertainment company with global influence, recognised for developing outstanding talent, shaping contemporary music culture and taking African creativity to the world.';

export type Release = { title: string; artists: string; cover: string };

export const releases: Release[] = [
	{ title: 'Don’t go home', artists: 'Big Slesh ft. Kiiwii', cover: '/images/cover-dont-go-home.webp' },
	{ title: 'True Love', artists: 'Big Slesh ft. Soundsfromwest & Arosino', cover: '/images/cover-true-love.webp' },
	{ title: 'Tempted', artists: 'Big Slesh', cover: '/images/cover-tempted.webp' },
	{ title: 'JO', artists: 'Big Slesh ft. Kiiwii', cover: '/images/cover-jo.webp' },
	{ title: 'Anaconda', artists: 'Big Slesh ft. Savage', cover: '/images/cover-anaconda.webp' },
	{ title: 'Body', artists: 'Big Slesh ft. Soundsfromwest', cover: '/images/cover-body.webp' },
	{ title: 'Love Word', artists: 'Big Slesh', cover: '/images/cover-love-word.webp' }
];

export const videos = Array.from({ length: 6 }, () => ({
	title: 'Don’t go home',
	artists: 'Big Slesh ft. Kiiwii'
}));

export const news = [
	{
		title: 'Love World EP: Coming Soon!',
		body: 'We are excited to announce the release of Big Slesh’s EP this December',
		image: '/images/news-love-world-ep.webp'
	},
	{
		title: 'ASCEND x Big Slesh',
		body: 'Ascend Magazine features Big Slesh on its first cover story.',
		image: '/images/news-ascend.webp'
	},
	{
		title: 'Love Word: 3 million+ milestone',
		body: 'Big Slesh’s debut single “Love Word” surpasses 3,000,000 streams',
		image: '/images/logo.webp'
	}
];

export type Service = {
	slug: string;
	title: string;
	icon: IconName;
	description: string;
	cta: string;
	subject: string;
	image: string;
};

export const services: Service[] = [
	{
		slug: 'brand-partnerships',
		title: 'Brand Partnerships & Promotion',
		icon: 'svc-brand',
		description:
			'We collaborate with brands to create impactful partnerships and music-led promotional campaigns that boost brand visibility, connect businesses with target audiences and drive meaningful engagement through artists and entertainment.',
		cta: 'Start collaborating',
		subject: 'Brand Partnership',
		image: '/images/service-brand.webp'
	},
	{
		slug: 'shows-and-performances',
		title: 'Shows & Performances',
		icon: 'svc-shows',
		description:
			'Discover opportunities for artist bookings, live performances, concerts and music events that create memorable entertainment experiences.',
		cta: 'Book now',
		subject: 'Show and Performance',
		image: '/images/service-shows.webp'
	},
	{
		slug: 'music-licensing',
		title: 'Music Licensing',
		icon: 'svc-licensing',
		description:
			'Use our sounds for commercial and creative purposes across advertising, film, television, digital media and other audio-visual productions through music licensing opportunities.',
		cta: 'Use our music',
		subject: 'Music Licensing',
		image: '/images/service-licensing.webp'
	}
];

export const subjects = [
	'Collaboration',
	'Brand Partnership',
	'Show and Performance',
	'Appearance',
	'Music Licensing'
];

export const team = {
	founder: { name: 'Name Surname', role: 'Founder/CEO', image: '/images/big-slesh.webp' },
	members: [1, 2, 3, 4].map((n) => ({ name: 'Name', role: 'Position', image: `/images/team-${n}.webp` }))
};

export const artist = {
	name: 'Big Slesh',
	portrait: '/images/artist-portrait.webp',
	socials: [
		{ name: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
		{ name: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
		{ name: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
		{ name: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com' },
		{ name: 'X', icon: 'x', href: 'https://x.com' }
	] satisfies { name: string; icon: IconName; href: string }[],
	bio: [
		'Lorem ipsum dolor sit amet consectetur. Consequat tincidunt commodo platea massa iaculis rhoncus id. Sed vel etiam amet sit in quam rhoncus. Tristique eget arcu lectus porttitor tincidunt tellus. Lorem bibendum id neque vestibulum.',
		'Blandit commodo sit mauris turpis nisi id. Massa augue consectetur pellentesque mauris non felis amet. Rhoncus at viverra rutrum dolor. Sed est amet ornare tortor. Volutpat vitae ac augue scelerisque amet rhoncus tellus sapien tortor. Odio morbi odio vitae dui id leo faucibus sit. Ipsum dolor volutpat nibh a aliquet non nunc leo egestas. Ligula nibh a viverra dui mattis.',
		'Integer sem commodo pellentesque quis tortor viverra ac. Lorem posuere velit aenean laoreet tellus orci lacinia nibh sit. Id praesent odio elit diam et id. Vel eu vel facilisis et pellentesque nisi sollicitudin nulla etiam. Egestas leo aliquam a ac integer amet. Porta tellus mi ultricies lectus nunc fringilla enim. Tempus aliquam egestas sed ut nec amet blandit tellus eget.'
	]
};
