'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	BarChart2,
	Bell,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Cog,
	Home,
	LogOut,
	Map,
	PieChart,
	Settings,
	Sliders,
	UserCircle,
	Users,
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
		href: '/dashboard/map',
		icon: <Map className='h-5 w-5' />,
	},
	{
		title: 'Device Management',
		href: '/dashboard/devices',
		icon: <Sliders className='h-5 w-5' />,
	},
	{
		title: 'Analytics',
		href: '/dashboard/analytics',
		icon: <BarChart2 className='h-5 w-5' />,
	},
	{
		title: 'Reports',
		href: '/dashboard/reports',
		icon: <PieChart className='h-5 w-5' />,
	},
	{
		title: 'Team',
		href: '/dashboard/team',
		icon: <Users className='h-5 w-5' />,
	},
	{
		title: 'Calendar',
		href: '/dashboard/calendar',
		icon: <Calendar className='h-5 w-5' />,
	},
	{
		title: 'Settings',
		href: '/dashboard/settings',
		icon: <Settings className='h-5 w-5' />,
	},
];

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<html lang='en'>
			<body>
				<div className='min-h-screen bg-muted/30'>
					{/* Top Navigation */}
					<header className='sticky top-0 z-40 border-b bg-background'>
						<div className='flex h-16 items-center justify-between px-4 sm:px-6'>
							<div className='flex items-center gap-2'>
								<Link
									href='/'
									className='flex items-center gap-2 font-bold text-xl'
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
									{!collapsed && <span>Cymbiosys</span>}
								</Link>
							</div>

							<div className='flex items-center gap-4'>
								<Button variant='outline' size='icon' className='relative'>
									<Bell className='h-5 w-5' />
									<span className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center'>
										3
									</span>
								</Button>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant='ghost'
											className='relative h-8 w-8 rounded-full'
										>
											<Avatar className='h-8 w-8'>
												<AvatarImage
													src='/images/avatar.png'
													alt='User avatar'
												/>
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end' className='w-56'>
										<div className='flex items-center justify-start gap-2 p-2'>
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
							</div>
						</div>
					</header>

					<div className='flex'>
						{/* Sidebar */}
						<aside
							className={cn(
								'h-[calc(100vh-4rem)] fixed left-0 top-16 z-30 flex flex-col border-r bg-background transition-all duration-300',
								collapsed ? 'w-16' : 'w-64'
							)}
						>
							<div className='flex flex-col gap-2 p-2'>
								{sidebarItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
											pathname === item.href
												? 'bg-primary/10 text-primary'
												: 'hover:bg-muted text-muted-foreground hover:text-foreground'
										)}
									>
										{item.icon}
										<span
											className={cn(
												'transition-opacity',
												collapsed
													? 'opacity-0 w-0 overflow-hidden'
													: 'opacity-100'
											)}
										>
											{item.title}
										</span>
									</Link>
								))}
							</div>

							<div className='mt-auto p-2'>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setCollapsed(!collapsed)}
									className='w-full flex justify-center'
								>
									{collapsed ? (
										<ChevronRight className='h-5 w-5' />
									) : (
										<ChevronLeft className='h-5 w-5' />
									)}
								</Button>
							</div>
						</aside>

						{/* Main Content */}
						<main
							className={cn(
								'flex-1 transition-all duration-300 p-4 sm:p-6',
								collapsed ? 'ml-16' : 'ml-64'
							)}
						>
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
