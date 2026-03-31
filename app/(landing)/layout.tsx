import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Cymbiosys',
	description: 'Cymbiosys - A next-gen conservation technology.',
	verification: {
		google: 'O72TkkztiF9LKYM-3ZXh6jdQWRbh5neIt84Kj0nsCho',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainNav />
				{children}
				<Footer />
			</body>
		</html>
	);
}
