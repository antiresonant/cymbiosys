'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	MapPin,
	Clock,
	Search,
	Volume2,
	Radio,
	AlertTriangle,
	RefreshCw,
	Bell,
	Eye,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';

interface Alert {
	id: string;
	type: 'gunshot' | 'vehicle' | 'distress' | 'intrusion' | string;
	message: string;
	location: Location;
	sensor: string;
	timestamp: string;
	read: boolean;
}

interface AlertIconProps {
	type: Alert['type'];
	className?: string;
}

interface Location {
	lat: number;
	lng: number;
	area: string;
}

// Simple alert data for notifications
const alerts = [
	{
		id: 'A001',
		type: 'gunshot',
		message: 'Gunshots heard in North-East sector',
		location: {
			lat: 27.5124,
			lng: 84.3341,
			area: 'Chitwan National Park',
		},
		sensor: 'Acoustic Sensor #34',
		timestamp: '2025-04-06T14:23:10Z',
		read: false,
	},
	{
		id: 'A002',
		type: 'gunshot',
		message: 'Multiple gunshots detected near river crossing',
		location: {
			lat: 27.5291,
			lng: 84.3542,
			area: 'Chitwan National Park',
		},
		sensor: 'Acoustic Sensor #42',
		timestamp: '2025-04-06T11:17:22Z',
		read: false,
	},
	{
		id: 'A003',
		type: 'vehicle',
		message: 'Unauthorized vehicle detected on access road',
		location: {
			lat: 27.4975,
			lng: 84.3612,
			area: 'Chitwan National Park',
		},
		sensor: 'Seismic Sensor #16',
		timestamp: '2025-04-05T18:45:11Z',
		read: true,
	},
	{
		id: 'A004',
		type: 'distress',
		message: 'Wildlife distress calls detected',
		location: {
			lat: 27.5435,
			lng: 84.3789,
			area: 'Chitwan National Park',
		},
		sensor: 'Acoustic Sensor #28',
		timestamp: '2025-04-05T22:10:44Z',
		read: true,
	},
	{
		id: 'A005',
		type: 'gunshot',
		message: 'Single gunshot detected in western boundary',
		location: {
			lat: 27.5012,
			lng: 84.2841,
			area: 'Chitwan National Park',
		},
		sensor: 'Acoustic Sensor #19',
		timestamp: '2025-04-07T02:11:33Z',
		read: false,
	},
	{
		id: 'A006',
		type: 'intrusion',
		message: 'Human movement detected in restricted area',
		location: {
			lat: 27.5312,
			lng: 84.3692,
			area: 'Chitwan National Park',
		},
		sensor: 'Motion Sensor #51',
		timestamp: '2025-04-06T23:47:18Z',
		read: false,
	},
];

// Function to format relative time
function formatRelativeTime(timestamp: any) {
	const date: Date = new Date(timestamp);
	const now: Date = new Date();
	const diffInMs = now.getTime() - date.getTime();

	// If less than a minute ago
	if (diffInMs < 60000) {
		return 'Just now';
	}

	// If less than an hour ago
	if (diffInMs < 3600000) {
		const minutes = Math.floor(diffInMs / 60000);
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	}

	// If less than a day ago
	if (diffInMs < 86400000) {
		const hours = Math.floor(diffInMs / 3600000);
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	}

	// If less than a week ago
	if (diffInMs < 604800000) {
		const days = Math.floor(diffInMs / 86400000);
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	}

	// Otherwise show date
	return date.toLocaleDateString();
}

// Alert icon component
function AlertIcon({ type }: any) {
	switch (type) {
		case 'gunshot':
			return <Volume2 className='h-5 w-5 text-red-500' />;
		case 'vehicle':
			return <AlertTriangle className='h-5 w-5 text-orange-500' />;
		case 'distress':
			return <Radio className='h-5 w-5 text-yellow-500' />;
		case 'intrusion':
			return <AlertTriangle className='h-5 w-5 text-red-500' />;
		default:
			return <Bell className='h-5 w-5 text-blue-500' />;
	}
}

export default function AlertsPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [alertDetails, setAlertDetails] = useState<Alert | null>(null);
	const [readAlerts, setReadAlerts] = useState(
		alerts.filter((alert) => alert.read).map((alert) => alert.id)
	);

	// Mark an alert as read
	const markAsRead = (alertId: any) => {
		if (!readAlerts.includes(alertId)) {
			setReadAlerts([...readAlerts, alertId]);
		}
	};

	// Filter alerts based on search
	const filteredAlerts = alerts
		.filter(
			(alert) =>
				searchTerm === '' ||
				alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
				alert.location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
				alert.sensor.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		);

	// View alert details and mark as read
	const viewAlertDetails = (alert: any) => {
		setAlertDetails(alert);
		markAsRead(alert.id);
	};

	// Refresh alerts
	const handleRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => {
			setIsRefreshing(false);
		}, 1000);
	};

	// Count unread alerts
	const unreadCount = alerts.filter(
		(alert) => !readAlerts.includes(alert.id)
	).length;

	return (
		<div>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-2'>
					<h1 className='text-xl font-bold'>Alerts</h1>
					{unreadCount > 0 && (
						<Badge className='bg-red-500'>{unreadCount} new</Badge>
					)}
				</div>

				<Button
					variant='outline'
					size='sm'
					onClick={handleRefresh}
					disabled={isRefreshing}
				>
					<RefreshCw
						className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
					/>
					Refresh
				</Button>
			</div>

			<div className='mb-4'>
				<div className='relative'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
					<Input
						placeholder='Search alerts...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{filteredAlerts.length === 0 ? (
				<div className='text-center py-12'>
					<Bell className='h-12 w-12 text-gray-300 mx-auto mb-3' />
					<h3 className='text-lg font-medium text-gray-700'>No alerts found</h3>
					<p className='text-gray-500 mt-1'>
						Check back later or try a different search term.
					</p>
				</div>
			) : (
				<Card>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<ul className='divide-y'>
							{filteredAlerts.map((alert) => (
								<li
									key={alert.id}
									className={`p-4 hover:bg-gray-50 cursor-pointer ${
										!readAlerts.includes(alert.id) ? 'bg-blue-50' : ''
									}`}
									onClick={() => viewAlertDetails(alert)}
								>
									<div className='flex gap-3'>
										<div className='flex-shrink-0 mt-1'>
											<AlertIcon type={alert.type} />
										</div>
										<div className='flex-1 min-w-0'>
											<p
												className={`text-sm font-medium ${
													!readAlerts.includes(alert.id)
														? 'text-black'
														: 'text-gray-700'
												}`}
											>
												{alert.message}
											</p>
											<div className='mt-1 flex items-center text-xs text-gray-500 gap-4'>
												<div className='flex items-center'>
													<MapPin className='h-3 w-3 mr-1' />
													<span>
														{alert.location.lat.toFixed(4)},{' '}
														{alert.location.lng.toFixed(4)} (
														{alert.location.area})
													</span>
												</div>
												<div className='flex items-center'>
													<Clock className='h-3 w-3 mr-1' />
													<span>{formatRelativeTime(alert.timestamp)}</span>
												</div>
											</div>
											<p className='mt-1 text-xs text-gray-500'>
												Detected by: {alert.sensor}
											</p>
										</div>
										<div className='flex-shrink-0 self-center'>
											<Button
												variant='ghost'
												size='icon'
												onClick={(e) => {
													e.stopPropagation();
													viewAlertDetails(alert);
												}}
											>
												<Eye className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{/* Alert Detail Dialog */}
			<Dialog
				open={alertDetails !== null}
				onOpenChange={(open) => !open && setAlertDetails(null)}
			>
				<DialogContent className='sm:max-w-[425px]'>
					{alertDetails && (
						<>
							<DialogHeader>
								<div className='flex items-center gap-2'>
									<AlertIcon type={alertDetails.type} />
									<DialogTitle>
										{alertDetails.type === 'gunshot'
											? 'Gunshot Alert'
											: alertDetails.type.charAt(0).toUpperCase() +
											  alertDetails.type.slice(1) +
											  ' Alert'}
									</DialogTitle>
								</div>
							</DialogHeader>

							<div className='py-4 space-y-3'>
								<p className='text-sm'>{alertDetails.message}</p>

								<div className='rounded-md bg-gray-50 p-3 text-sm'>
									<div className='mb-2'>
										<span className='font-medium'>Location:</span>
										<div className='mt-1 flex items-center'>
											<MapPin className='h-4 w-4 mr-1 text-gray-500' />
											<span>
												{alertDetails.location.lat.toFixed(6)},{' '}
												{alertDetails.location.lng.toFixed(6)}
											</span>
										</div>
										<div className='mt-1'>
											<span className='text-gray-500'>
												{alertDetails.location.area}
											</span>
										</div>
									</div>

									<div className='mb-2'>
										<span className='font-medium'>Time:</span>
										<div className='mt-1 flex items-center'>
											<Clock className='h-4 w-4 mr-1 text-gray-500' />
											<span>
												{new Date(alertDetails.timestamp).toLocaleString()}
											</span>
										</div>
										<div className='mt-1 text-gray-500'>
											{formatRelativeTime(alertDetails.timestamp)}
										</div>
									</div>

									<div>
										<span className='font-medium'>Detected by:</span>
										<div className='mt-1'>{alertDetails.sensor}</div>
									</div>
								</div>
							</div>

							<DialogFooter>
								<Button onClick={() => setAlertDetails(null)}>Close</Button>
								{alertDetails.type === 'gunshot' && (
									<Button variant='destructive'>Report Incident</Button>
								)}
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
