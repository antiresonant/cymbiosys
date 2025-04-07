'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contact Us', href: '/contact' },
	{ name: 'About Us', href: '/about' },
];

export function MainNav() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className='w-full fixed top-0 z-50 bg-background/70 backdrop-blur-md shadow-sm'>
			<div className='container mx-auto flex items-center justify-between py-4'>
				{/* Logo */}
				{/* Logo */}
				<Link href='/' className='font-bold text-xl flex items-center gap-2'>
					<div>
						<Image
							src='/images/logo-1.png'
							alt='Cymbiosys Logo'
							width={40}
							height={40}
							priority
						/>
					</div>
					Cymbiosys
				</Link>

				{/* Desktop Navigation */}
				<div className='hidden md:flex md:items-center md:gap-8'>
					<NavigationMenu>
						<NavigationMenuList>
							{navItems.map((item) => (
								<NavigationMenuItem key={item.href}>
									<Link href={item.href} legacyBehavior passHref>
										<NavigationMenuLink
											className={cn(
												'px-4 py-2 rounded-md text-sm font-medium transition-colors',
												pathname === item.href
													? 'bg-primary/10 text-primary'
													: 'hover:text-primary'
											)}
										>
											{item.name}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					{/* Auth Buttons */}
					<div className='flex items-center gap-2'>
						<Button variant='outline' size='sm' asChild>
							<Link href='/login'>Log In</Link>
						</Button>
						<Button size='sm' asChild>
							<Link href='/signup'>Sign Up</Link>
						</Button>
					</div>
				</div>

				{/* Mobile Navigation Trigger */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild className='md:hidden'>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle menu</span>
						</Button>
					</SheetTrigger>

					{/* Mobile Navigation Menu */}
					<SheetContent side='right' className='w-[280px] sm:w-[350px] px-6'>
						<SheetHeader className='border-b pb-4 mb-4'>
							<SheetTitle className='flex items-center justify-between'>
								<Link
									href='/'
									onClick={() => setIsOpen(false)}
									className='font-bold flex items-center gap-2'
								>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='text-primary'
									>
										<path
											d='M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6Z'
											stroke='currentColor'
											strokeWidth='2'
										/>
										<path
											d='M12 8L16 12L12 16L8 12L12 8Z'
											fill='currentColor'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinejoin='round'
										/>
									</svg>
									Cymbiosys
								</Link>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setIsOpen(false)}
								>
									<X className='h-5 w-5' />
								</Button>
							</SheetTitle>
						</SheetHeader>

						<nav className='flex flex-col gap-1'>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={cn(
										'flex items-center text-sm font-medium rounded-md px-4 py-3 transition-colors',
										pathname === item.href
											? 'bg-primary/10 text-primary'
											: 'hover:bg-muted text-foreground/70 hover:text-foreground'
									)}
								>
									{item.name}
								</Link>
							))}
						</nav>

						<div className='flex flex-col gap-2 mt-8 pt-6 border-t'>
							<Button
								variant='outline'
								asChild
								className='w-full justify-center'
							>
								<Link href='/login' onClick={() => setIsOpen(false)}>
									Log In
								</Link>
							</Button>
							<Button asChild className='w-full justify-center'>
								<Link href='/signup' onClick={() => setIsOpen(false)}>
									Sign Up
								</Link>
							</Button>
						</div>

						<div className='mt-auto pt-6 text-center text-xs text-muted-foreground'>
							<p>© {new Date().getFullYear()} Cymbiosys</p>
							<p className='mt-1'>Protecting wildlife through technology</p>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
