'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
	AlertTriangle,
	ChevronRight,
	Play,
	Pause,
	RotateCcw,
	SkipBack,
	SkipForward,
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), {
	ssr: false,
	loading: () => (
		<div className='h-full bg-muted rounded-md flex items-center justify-center'>
			Loading map...
		</div>
	),
});

// Sensor network in Parque Nacional Bernardo O'Higgins - realistic poacher path through forest
const sensorData = [
	// Pre-incident: Normal forest monitoring sensors
	{
		timestamp: '2025/06/22/10:40:00',
		mainCategory: 'Animal sound',
		subcategory: 'Normal bird activity',
		moduleId: '401',
		radialDistance: 8,
		angle: 75,
		pValue: 0.05,
		sValue: 0.72,
		gpsCoordinates: '-49.7890, -74.4850',
		lat: -49.789,
		lng: -74.485,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:42:00',
		mainCategory: 'Animal sound',
		subcategory: 'Wind through trees',
		moduleId: '402',
		radialDistance: 5,
		angle: 80,
		pValue: 0.06,
		sValue: 0.68,
		gpsCoordinates: '-49.7880, -74.4840',
		lat: -49.788,
		lng: -74.484,
		status: 'active',
	},
	// Entry point - suspicious activity begins
	{
		timestamp: '2025/06/22/10:44:30',
		mainCategory: 'Human movement',
		subcategory: 'Footsteps on trail',
		moduleId: '501',
		radialDistance: 12,
		angle: 45,
		pValue: 0.03,
		sValue: 0.82,
		gpsCoordinates: '-49.7860, -74.4820',
		lat: -49.786,
		lng: -74.482,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:44:45',
		mainCategory: 'Human voice',
		subcategory: 'Low conversation',
		moduleId: '502',
		radialDistance: 15,
		angle: 50,
		pValue: 0.02,
		sValue: 0.85,
		gpsCoordinates: '-49.7850, -74.4810',
		lat: -49.785,
		lng: -74.481,
		status: 'active',
	},
	// Moving deeper into forest - curved path through vegetation
	{
		timestamp: '2025/06/22/10:45:00',
		mainCategory: 'Human movement',
		subcategory: 'Breaking branches',
		moduleId: '503',
		radialDistance: 18,
		angle: 40,
		pValue: 0.02,
		sValue: 0.87,
		gpsCoordinates: '-49.7835, -74.4795',
		lat: -49.7835,
		lng: -74.4795,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:45:15',
		mainCategory: 'Human activity',
		subcategory: 'Metal tool sounds',
		moduleId: '504',
		radialDistance: 22,
		angle: 35,
		pValue: 0.01,
		sValue: 0.9,
		gpsCoordinates: '-49.7820, -74.4785',
		lat: -49.782,
		lng: -74.4785,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:45:30',
		mainCategory: 'Animal sound',
		subcategory: 'Bird alarm calls',
		moduleId: '505',
		radialDistance: 25,
		angle: 30,
		pValue: 0.01,
		sValue: 0.93,
		gpsCoordinates: '-49.7810, -74.4775',
		lat: -49.781,
		lng: -74.4775,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:45:40',
		mainCategory: 'Human movement',
		subcategory: 'Careful footsteps',
		moduleId: '506',
		radialDistance: 16,
		angle: 28,
		pValue: 0.02,
		sValue: 0.88,
		gpsCoordinates: '-49.7805, -74.4772',
		lat: -49.7805,
		lng: -74.4772,
		status: 'active',
	},
	// Critical incident area - where poaching occurs
	{
		timestamp: '2025/06/22/10:45:45',
		mainCategory: 'Human voice',
		subcategory: 'Urgent whispers',
		moduleId: '507',
		radialDistance: 20,
		angle: 25,
		pValue: 0.01,
		sValue: 0.91,
		gpsCoordinates: '-49.7800, -74.4770',
		lat: -49.78,
		lng: -74.477,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:46:00',
		mainCategory: 'Explosive sound',
		subcategory: 'Rifle shot',
		moduleId: '508',
		radialDistance: 30,
		angle: 20,
		pValue: 0.01,
		sValue: 0.96,
		gpsCoordinates: '-49.7795, -74.4765',
		lat: -49.7795,
		lng: -74.4765,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:46:15',
		mainCategory: 'Animal distress',
		subcategory: 'Huemul distress call',
		moduleId: '509',
		radialDistance: 28,
		angle: 15,
		pValue: 0.01,
		sValue: 0.94,
		gpsCoordinates: '-49.7790, -74.4760',
		lat: -49.779,
		lng: -74.476,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:46:30',
		mainCategory: 'Animal silence',
		subcategory: 'Sudden forest silence',
		moduleId: '510',
		radialDistance: 35,
		angle: 10,
		pValue: 0.01,
		sValue: 0.91,
		gpsCoordinates: '-49.7785, -74.4755',
		lat: -49.7785,
		lng: -74.4755,
		status: 'active',
	},
	// Post-incident activity and escape route
	{
		timestamp: '2025/06/22/10:46:45',
		mainCategory: 'Human movement',
		subcategory: 'Heavy dragging sound',
		moduleId: '511',
		radialDistance: 32,
		angle: 5,
		pValue: 0.01,
		sValue: 0.95,
		gpsCoordinates: '-49.7780, -74.4750',
		lat: -49.778,
		lng: -74.475,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:47:00',
		mainCategory: 'Human voice',
		subcategory: 'Urgent conversation',
		moduleId: '512',
		radialDistance: 25,
		angle: 0,
		pValue: 0.01,
		sValue: 0.93,
		gpsCoordinates: '-49.7775, -74.4748',
		lat: -49.7775,
		lng: -74.4748,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:47:15',
		mainCategory: 'Human movement',
		subcategory: 'Running footsteps',
		moduleId: '513',
		radialDistance: 28,
		angle: -5,
		pValue: 0.02,
		sValue: 0.88,
		gpsCoordinates: '-49.7770, -74.4745',
		lat: -49.777,
		lng: -74.4745,
		status: 'active',
	},
	// Vehicle pickup and escape
	{
		timestamp: '2025/06/22/10:47:30',
		mainCategory: 'Vehicle',
		subcategory: 'ATV engine starting',
		moduleId: '514',
		radialDistance: 40,
		angle: -10,
		pValue: 0.02,
		sValue: 0.89,
		gpsCoordinates: '-49.7765, -74.4740',
		lat: -49.7765,
		lng: -74.474,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:47:45',
		mainCategory: 'Vehicle',
		subcategory: 'Rapid acceleration',
		moduleId: '515',
		radialDistance: 45,
		angle: -15,
		pValue: 0.01,
		sValue: 0.87,
		gpsCoordinates: '-49.7760, -74.4735',
		lat: -49.776,
		lng: -74.4735,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:48:00',
		mainCategory: 'Vehicle',
		subcategory: 'Moving through forest',
		moduleId: '516',
		radialDistance: 50,
		angle: -20,
		pValue: 0.01,
		sValue: 0.85,
		gpsCoordinates: '-49.7755, -74.4730',
		lat: -49.7755,
		lng: -74.473,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:48:15',
		mainCategory: 'Vehicle',
		subcategory: 'Engine fading away',
		moduleId: '517',
		radialDistance: 55,
		angle: -25,
		pValue: 0.02,
		sValue: 0.83,
		gpsCoordinates: '-49.7750, -74.4725',
		lat: -49.775,
		lng: -74.4725,
		status: 'active',
	},
	// Additional monitoring sensors (active) spread throughout area
	{
		timestamp: '2025/06/22/10:44:00',
		mainCategory: 'Animal sound',
		subcategory: 'Normal forest sounds',
		moduleId: '601',
		radialDistance: 10,
		angle: 60,
		pValue: 0.05,
		sValue: 0.75,
		gpsCoordinates: '-49.7870, -74.4830',
		lat: -49.787,
		lng: -74.483,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:45:20',
		mainCategory: 'Animal sound',
		subcategory: 'Bird activity change',
		moduleId: '602',
		radialDistance: 12,
		angle: 65,
		pValue: 0.03,
		sValue: 0.8,
		gpsCoordinates: '-49.7825, -74.4800',
		lat: -49.7825,
		lng: -74.48,
		status: 'active',
	},
	{
		timestamp: '2025/06/22/10:46:50',
		mainCategory: 'Animal sound',
		subcategory: 'Animals returning',
		moduleId: '603',
		radialDistance: 15,
		angle: 55,
		pValue: 0.04,
		sValue: 0.77,
		gpsCoordinates: '-49.7810, -74.4800',
		lat: -49.781,
		lng: -74.48,
		status: 'active',
	},
	// Inactive sensors scattered throughout the forest
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '301',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7820, -74.4750',
		lat: -49.782,
		lng: -74.475,
		status: 'inactive',
	},
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '302',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7750, -74.4820',
		lat: -49.775,
		lng: -74.482,
		status: 'inactive',
	},
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '303',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7900, -74.4750',
		lat: -49.79,
		lng: -74.475,
		status: 'inactive',
	},
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '304',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7850, -74.4900',
		lat: -49.785,
		lng: -74.49,
		status: 'inactive',
	},
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '305',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7700, -74.4780',
		lat: -49.77,
		lng: -74.478,
		status: 'inactive',
	},
	{
		timestamp: null,
		mainCategory: null,
		subcategory: null,
		moduleId: '306',
		radialDistance: null,
		angle: null,
		pValue: null,
		sValue: null,
		gpsCoordinates: '-49.7920, -74.4820',
		lat: -49.792,
		lng: -74.482,
		status: 'inactive',
	},
];

export default function MapPage() {
	const [selectedDate, setSelectedDate] = useState('last-7-days');
	const [alertFilters, setAlertFilters] = useState({
		poaching: true,
		fire: true,
		flooding: true,
		humanActivity: true,
		animalDistress: true,
	});
	const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

	// Video playback controller state
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);

	// Get unique timestamps and sort them
	const timestamps = Array.from(
		new Set(
			sensorData
				.filter((sensor) => sensor.timestamp)
				.map((sensor) => sensor.timestamp!)
		)
	).sort();

	// Filter sensors based on current time
	const getVisibleSensors = (timeIndex: number) => {
		const currentTimestamp = timestamps[timeIndex];
		if (!currentTimestamp) return sensorData;

		return sensorData.filter((sensor) => {
			if (!sensor.timestamp) return true; // Always show inactive sensors
			return sensor.timestamp <= currentTimestamp;
		});
	};

	// Auto-play functionality
	React.useEffect(() => {
		if (!isPlaying) return;

		const interval = setInterval(() => {
			setCurrentTime((prevTime) => {
				if (prevTime >= timestamps.length - 1) {
					setIsPlaying(false);
					return prevTime;
				}
				return prevTime + 1;
			});
		}, 1000 / playbackSpeed);

		return () => clearInterval(interval);
	}, [isPlaying, playbackSpeed, timestamps.length]);

	const alerts = [
		{
			type: 'CRITICAL: Rifle Shot Detected',
			time: '10:46 AM',
			severity: 'critical',
			moduleId: '508',
			location: 'Deep Forest - Sector Alpha',
		},
		{
			type: 'CRITICAL: Huemul in Distress',
			time: '10:46 AM',
			severity: 'critical',
			moduleId: '509',
			location: 'Critical Zone - Animal Impact',
		},
		{
			type: 'HIGH: Unauthorized Vehicle Access',
			time: '10:47 AM',
			severity: 'critical',
			moduleId: '514',
			location: 'Forest Exit Point',
		},
		{
			type: 'HIGH: Coordinated Human Activity',
			time: '10:44-10:45 AM',
			severity: 'warning',
			moduleId: '501-507',
			location: 'Entry Trail to Deep Forest',
		},
		{
			type: 'MEDIUM: Rapid Escape Pattern',
			time: '10:47-10:48 AM',
			severity: 'warning',
			moduleId: '514-517',
			location: 'Vehicle Escape Route',
		},
		{
			type: 'LOW: Forest Disturbance Pattern',
			time: '10:45 AM',
			severity: 'info',
			moduleId: '505',
			location: 'Wildlife Alert Zone',
		},
		{
			type: 'RESOLVED: Normal Activity Resumed',
			time: '10:49 AM',
			severity: 'info',
			moduleId: '603',
			location: 'Recovery Zone',
		},
	];

	return (
		<div className='h-full w-full'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold tracking-tight'>Conservation Map</h1>
				<div className='text-sm text-muted-foreground'>
					Last updated: {new Date().toLocaleTimeString()}
				</div>
			</div>

			{/* Main Grid Layout - Map Left, Controls Right */}
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]'>
				{/* Map Area - Left Side */}
				<div className='lg:col-span-3 flex flex-col'>
					<div className='flex-1'>
						<MapComponent
							sensors={getVisibleSensors(currentTime)}
							selectedSensor={selectedSensor}
							setSelectedSensor={setSelectedSensor}
						/>
					</div>

					{/* Video Controller */}
					<Card className='mt-4'>
						<CardContent className='p-4'>
							<div className='space-y-4'>
								{/* Timeline Slider */}
								<div className='space-y-2'>
									<div className='flex justify-between text-sm text-muted-foreground'>
										<span>Incident Timeline</span>
										<span>
											{timestamps[currentTime]
												? new Date(timestamps[currentTime]).toLocaleTimeString()
												: '--:--:--'}
										</span>
									</div>
									<Slider
										value={[currentTime]}
										onValueChange={([value]) => setCurrentTime(value)}
										max={timestamps.length - 1}
										step={1}
										className='w-full'
									/>
									<div className='flex justify-between text-xs text-muted-foreground'>
										<span>
											{timestamps[0]
												? new Date(timestamps[0]).toLocaleTimeString()
												: ''}
										</span>
										<span>
											{timestamps[timestamps.length - 1]
												? new Date(
														timestamps[timestamps.length - 1]
												  ).toLocaleTimeString()
												: ''}
										</span>
									</div>
								</div>

								{/* Playback Controls */}
								<div className='flex items-center justify-center space-x-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => setCurrentTime(0)}
										disabled={currentTime === 0}
									>
										<SkipBack className='h-4 w-4' />
									</Button>

									<Button
										variant='outline'
										size='sm'
										onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
										disabled={currentTime === 0}
									>
										<RotateCcw className='h-4 w-4' />
									</Button>

									<Button
										onClick={() => setIsPlaying(!isPlaying)}
										disabled={currentTime >= timestamps.length - 1}
									>
										{isPlaying ? (
											<Pause className='h-4 w-4 mr-2' />
										) : (
											<Play className='h-4 w-4 mr-2' />
										)}
										{isPlaying ? 'Pause' : 'Play'}
									</Button>

									<Button
										variant='outline'
										size='sm'
										onClick={() =>
											setCurrentTime(
												Math.min(timestamps.length - 1, currentTime + 1)
											)
										}
										disabled={currentTime >= timestamps.length - 1}
									>
										<SkipForward className='h-4 w-4' />
									</Button>

									<Button
										variant='outline'
										size='sm'
										onClick={() => setCurrentTime(timestamps.length - 1)}
										disabled={currentTime >= timestamps.length - 1}
									>
										<SkipForward className='h-4 w-4' />
										<SkipForward className='h-4 w-4' />
									</Button>
								</div>

								{/* Playback Speed */}
								<div className='flex items-center justify-center space-x-2 text-sm'>
									<span className='text-muted-foreground'>Speed:</span>
									<Button
										variant={playbackSpeed === 0.5 ? 'default' : 'outline'}
										size='sm'
										onClick={() => setPlaybackSpeed(0.5)}
									>
										0.5x
									</Button>
									<Button
										variant={playbackSpeed === 1 ? 'default' : 'outline'}
										size='sm'
										onClick={() => setPlaybackSpeed(1)}
									>
										1x
									</Button>
									<Button
										variant={playbackSpeed === 2 ? 'default' : 'outline'}
										size='sm'
										onClick={() => setPlaybackSpeed(2)}
									>
										2x
									</Button>
								</div>

								{/* Current Event Info */}
								{timestamps[currentTime] && (
									<div className='bg-muted/50 rounded-lg p-3'>
										<div className='text-sm font-medium'>Current Event</div>
										<div className='text-xs text-muted-foreground mt-1'>
											Time:{' '}
											{new Date(timestamps[currentTime]).toLocaleTimeString()}
											<br />
											Events showing:{' '}
											{
												getVisibleSensors(currentTime).filter(
													(s) => s.timestamp
												).length
											}{' '}
											detections
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Sidebar Controls */}
				<div className='lg:col-span-1 space-y-4 overflow-y-auto'>
					{/* Date Filter */}
					<Card>
						<CardHeader className='pb-3'>
							<CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>
								Date Range
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Select value={selectedDate} onValueChange={setSelectedDate}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='last-7-days'>Last 7 days</SelectItem>
									<SelectItem value='last-30-days'>Last 30 days</SelectItem>
									<SelectItem value='last-90-days'>Last 90 days</SelectItem>
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

					{/* Alert Filters */}
					<Card>
						<CardHeader className='pb-3'>
							<CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>
								Alert Filters
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='poaching'
									checked={alertFilters.poaching}
									onCheckedChange={(checked) =>
										setAlertFilters({ ...alertFilters, poaching: !!checked })
									}
								/>
								<label htmlFor='poaching' className='text-sm font-medium'>
									Poaching
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='humanActivity'
									checked={alertFilters.humanActivity}
									onCheckedChange={(checked) =>
										setAlertFilters({
											...alertFilters,
											humanActivity: !!checked,
										})
									}
								/>
								<label htmlFor='humanActivity' className='text-sm font-medium'>
									Human Activity
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='animalDistress'
									checked={alertFilters.animalDistress}
									onCheckedChange={(checked) =>
										setAlertFilters({
											...alertFilters,
											animalDistress: !!checked,
										})
									}
								/>
								<label htmlFor='animalDistress' className='text-sm font-medium'>
									Animal Distress
								</label>
							</div>
						</CardContent>
					</Card>

					{/* Recent Alerts */}
					<Card>
						<CardHeader className='pb-3'>
							<CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>
								Recent Alerts
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							{alerts.map((alert, index) => (
								<div
									key={index}
									className='flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer group'
								>
									<div className='flex items-center space-x-2'>
										<AlertTriangle
											className={`h-4 w-4 ${
												alert.severity === 'critical'
													? 'text-red-500'
													: 'text-orange-500'
											}`}
										/>
										<div>
											<p className='text-sm font-medium'>{alert.type}</p>
											<p className='text-xs text-muted-foreground'>
												{alert.time} • Sensor {alert.moduleId}
											</p>
										</div>
									</div>
									<ChevronRight className='h-4 w-4 text-muted-foreground group-hover:text-foreground' />
								</div>
							))}
						</CardContent>
					</Card>

					{/* Detection Confidence */}
					<Card>
						<CardHeader className='pb-3'>
							<CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>
								Detection Confidence
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='text-center'>
									<div className='text-2xl font-bold'>96%</div>
									<Progress value={96} className='mt-2' />
								</div>
								<div className='flex justify-center'>
									<div className='w-16 h-16 bg-muted rounded-md flex items-center justify-center'>
										<div className='text-2xl'>🎯</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
