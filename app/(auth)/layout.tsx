'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Cog,
	Home,
	LogOut,
	Map,
	Siren,
	Sliders,
	UserCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import '@/app/globals.css';

const sidebarItems = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: <Home className='h-5 w-5' />,
	},
	{
		title: 'Conservation Map',
		href: '/map',
		icon: <Map className='h-5 w-5' />,
	},
	{
		title: 'Device Management',
		href: '/devices',
		icon: <Sliders className='h-5 w-5' />,
	},
	{
		title: 'Alerts',
		href: '/alerts',
		icon: <Siren className='h-5 w-5' />,
	},
];

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);
	const [notificationCount, setNotificationCount] = useState(3);

	return (
		<html lang='en'>
			<body>
				<div className='flex min-h-screen bg-muted/30'>
					{/* Sidebar */}
					<aside
						className={cn(
							'h-screen fixed left-0 top-0 z-30 flex flex-col border-r bg-background transition-all duration-300',
							collapsed ? 'w-20' : 'w-64'
						)}
					>
						{/* Logo at the top */}
						<div className='py-6 px-4 border-b flex items-center justify-center relative'>
							<Link
								href='/'
								className='flex items-center justify-center gap-2 font-bold text-xl'
							>
								<svg
									width='28'
									height='28'
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
								{!collapsed && <span>Cymbiosys</span>}
							</Link>

							{/* Collapse toggle button - absolute positioned at the edge */}
							<Button
								variant='ghost'
								size='icon'
								className={cn(
									'absolute rounded-full p-1.5 border border-border/50 bg-background shadow-sm',
									collapsed
										? 'right-0 translate-x-1/2'
										: 'right-0 translate-x-1/2'
								)}
								onClick={() => setCollapsed(!collapsed)}
							>
								{collapsed ? (
									<ChevronRight className='h-4 w-4' />
								) : (
									<ChevronLeft className='h-4 w-4' />
								)}
							</Button>
						</div>

						{/* Navigation items */}
						<div className='flex-1 overflow-y-auto py-6 px-3'>
							<div className='flex flex-col gap-1'>
								{sidebarItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
											pathname === item.href
												? 'bg-primary/10 text-primary'
												: 'hover:bg-muted text-muted-foreground hover:text-foreground',
											collapsed && 'justify-center px-0'
										)}
									>
										{item.icon}
										{!collapsed && <span>{item.title}</span>}
									</Link>
								))}
							</div>
						</div>

						{/* Bottom controls */}
						<div className='border-t py-4 px-3'>
							{/* User profile and Notifications in one row */}
							<div
								className={cn(
									'flex justify-between items-center',
									collapsed && 'flex-col gap-3'
								)}
							>
								{/* User profile */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant='ghost'
											className={cn(
												'flex items-center gap-3',
												collapsed ? 'w-full justify-center px-0' : 'px-2'
											)}
										>
											<Avatar className='h-8 w-8'>
												<AvatarImage
													src='/images/avatar.png'
													alt='User avatar'
												/>
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
											{!collapsed && (
												<div className='flex flex-col items-start text-sm'>
													<span className='font-medium'>Jane Doe</span>
													<span className='text-xs text-muted-foreground'>
														Administrator
													</span>
												</div>
											)}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end' className='w-56'>
										<div className='flex items-center gap-2 p-2'>
											<Avatar className='h-8 w-8'>
												<AvatarImage
													src='/images/avatar.png'
													alt='User avatar'
												/>
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
											<div className='flex flex-col space-y-1 leading-none'>
												<p className='font-medium'>Jane Doe</p>
												<p className='text-sm text-muted-foreground'>
													jane@cymbiosys.com
												</p>
											</div>
										</div>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link
												href='/dashboard/profile'
												className='cursor-pointer flex w-full items-center'
											>
												<UserCircle className='mr-2 h-4 w-4' />
												<span>Profile</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href='/dashboard/settings'
												className='cursor-pointer flex w-full items-center'
											>
												<Cog className='mr-2 h-4 w-4' />
												<span>Settings</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link
												href='/login'
												className='cursor-pointer flex w-full items-center text-destructive'
											>
												<LogOut className='mr-2 h-4 w-4' />
												<span>Log out</span>
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

								{/* Notifications */}
								<Button variant='ghost' size='icon' className='relative'>
									<Bell className='h-5 w-5' />
									{notificationCount > 0 && (
										<span className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center'>
											{notificationCount}
										</span>
									)}
								</Button>
							</div>
						</div>
					</aside>

					{/* Main Content */}
					<main
						className={cn(
							'flex-1 transition-all duration-300 p-4 sm:p-6',
							collapsed ? 'ml-20' : 'ml-64'
						)}
					>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
