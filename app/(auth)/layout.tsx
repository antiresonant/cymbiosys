'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import '@/app/globals.css';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<html lang='en'>
			<body>
				<div className='flex min-h-screen bg-muted/30'>
					{/* Sidebar */}
					<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />

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
