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
	{ label: 'Artists & Music', href: '/artists' },
	{ label: 'News & Updates', href: '/news' },
	{ label: 'Contact', href: '/contact' }
];

export const intro =
	'Slesh Music Worldwide (SMW) is a Nigerian-based record label and entertainment company shaping sounds, discovering talent and taking African music beyond borders. Inspired by contemporary African sounds, we are driven by a passion for creativity, originality and artistic expression. We seek to bridge the gap between African artistry and international audiences. Through music and strategic partnerships, we are building a platform where talent flourishes, creativity thrives and African sounds gain wider recognition.';

export const mission =
	'To discover, develop and promote exceptional musical talent while creating quality music and meaningful cultural experiences that inspire audiences and connect people across the world.';

export const vision =
	'To become a leading African entertainment company with global influence, recognised for developing outstanding talent, shaping contemporary music culture and taking African creativity to the world.';

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
	'Music Licensing',
	'Others'
];
