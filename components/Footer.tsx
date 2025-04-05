import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterProps {
	className?: string;
}

export function Footer({ className }: FooterProps) {
	return (
		<footer className={cn('bg-muted py-12 border-t', className)}>
			<div className='container mx-auto px-4'>
				<div className='grid gap-8 md:gap-12 lg:grid-cols-4 md:grid-cols-2'>
					{/* Company Info */}
					<div className='space-y-4'>
						<h3 className='text-lg font-bold'>Cymbiosys</h3>
						<p className='text-sm text-muted-foreground'>
							Innovative solutions for complex problems, building the technology
							of tomorrow.
						</p>
						<div className='flex space-x-4'>
							<Link
								href='https://twitter.com'
								className='text-muted-foreground hover:text-primary'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-twitter'
								>
									<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
								</svg>
								<span className='sr-only'>Twitter</span>
							</Link>
							<Link
								href='https://linkedin.com'
								className='text-muted-foreground hover:text-primary'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-linkedin'
								>
									<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
									<rect width='4' height='12' x='2' y='9' />
									<circle cx='4' cy='4' r='2' />
								</svg>
								<span className='sr-only'>LinkedIn</span>
							</Link>
							<Link
								href='https://github.com'
								className='text-muted-foreground hover:text-primary'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-github'
								>
									<path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
									<path d='M9 18c-4.51 2-5-2-7-2' />
								</svg>
								<span className='sr-only'>GitHub</span>
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h3 className='text-lg font-bold'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/blog'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className='space-y-4'>
						<h3 className='text-lg font-bold'>Resources</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/resources'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href='/faq'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href='/support'
									className='text-sm text-muted-foreground hover:text-primary'
								>
									Support
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className='space-y-4'>
						<h3 className='text-lg font-bold'>Contact</h3>
						<address className='not-italic text-sm text-muted-foreground'>
							<p>123 Innovation Street</p>
							<p>Tech City, TC 10101</p>
						</address>
						<p className='text-sm text-muted-foreground'>
							Email:{' '}
							<a
								href='mailto:info@cymbiosys.com'
								className='hover:text-primary'
							>
								info@cymbiosys.com
							</a>
						</p>
						<p className='text-sm text-muted-foreground'>
							Phone:{' '}
							<a href='tel:+15551234567' className='hover:text-primary'>
								(555) 123-4567
							</a>
						</p>
					</div>
				</div>

				<div className='mt-8 pt-8 border-t border-muted-foreground/20'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<p className='text-sm text-muted-foreground'>
							© {new Date().getFullYear()} Cymbiosys. All rights reserved.
						</p>
						<div className='flex gap-6'>
							<Link
								href='/privacy'
								className='text-sm text-muted-foreground hover:text-primary'
							>
								Privacy Policy
							</Link>
							<Link
								href='/terms'
								className='text-sm text-muted-foreground hover:text-primary'
							>
								Terms of Service
							</Link>
							<Link
								href='/cookies'
								className='text-sm text-muted-foreground hover:text-primary'
							>
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
