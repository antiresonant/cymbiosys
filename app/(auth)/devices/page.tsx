'use client';

import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	MapPin,
	RefreshCw,
	Search,
	ChevronDown,
	Filter,
	PlusCircle,
	MoreHorizontal,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

// Simplified device data with just the essential fields
const devices = [
	{
		id: 'CWNP-D001',
		name: 'Tracker #1',
		status: 'active',
		location: {
			lat: 27.5124,
			lng: 84.3341,
			area: 'Chitwan National Park',
		},
	},
	{
		id: 'CWNP-D002',
		name: 'Tracker #2',
		status: 'active',
		location: {
			lat: 27.5291,
			lng: 84.3542,
			area: 'Chitwan National Park',
		},
	},
	{
		id: 'BRDP-D003',
		name: 'Tracker #3',
		status: 'inactive',
		location: {
			lat: 28.855,
			lng: 80.2627,
			area: 'Bardiya National Park',
		},
	},
	{
		id: 'CWNP-D004',
		name: 'Tracker #4',
		status: 'inactive',
		location: {
			lat: 27.4775,
			lng: 84.4612,
			area: 'Chitwan National Park',
		},
	},
	{
		id: 'SGMP-D005',
		name: 'Tracker #5',
		status: 'active',
		location: {
			lat: 27.6965,
			lng: 86.7314,
			area: 'Sagarmatha National Park',
		},
	},
];

export default function DevicesPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState<string[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Filter devices based on search term and status filter
	const filteredDevices = devices.filter((device) => {
		// Search filter
		const matchesSearch =
			searchTerm === '' ||
			device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			device.location.area.toLowerCase().includes(searchTerm.toLowerCase());

		// Status filter
		const matchesStatus =
			filterStatus.length === 0 || filterStatus.includes(device.status);

		return matchesSearch && matchesStatus;
	});

	// Handler for refreshing the data
	const handleRefresh = () => {
		setIsRefreshing(true);
		// Simulate an API call
		setTimeout(() => {
			setIsRefreshing(false);
		}, 1500);
	};

	// Get unique status types for filter dropdown
	const statusTypes = Array.from(
		new Set(devices.map((device) => device.status))
	);

	// Render status badge
	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'active':
				return (
					<Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
				);
			case 'inactive':
				return <Badge variant='secondary'>Inactive</Badge>;
			default:
				return <Badge variant='outline'>Unknown</Badge>;
		}
	};

	return (
		<div>
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6'>
				<div>
					<h1 className='text-xl md:text-2xl font-bold'>Device Tracking</h1>
					<p className='mt-1 text-sm md:text-base text-gray-600'>
						Monitor and manage wildlife tracking devices deployed in the field.
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={handleRefresh}
						disabled={isRefreshing}
						className='whitespace-nowrap'
					>
						<RefreshCw
							className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
						/>
						{isRefreshing ? 'Refreshing...' : 'Refresh'}
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button size='sm' className='whitespace-nowrap'>
								<PlusCircle className='h-4 w-4 mr-2' />
								<span className='hidden sm:inline'>Add Device</span>
								<span className='sm:hidden'>Add</span>
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Add New Device</DialogTitle>
								<DialogDescription>
									Register a new tracking device to the system
								</DialogDescription>
							</DialogHeader>

							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<label htmlFor='deviceId' className='text-right text-sm'>
										Device ID
									</label>
									<Input
										id='deviceId'
										placeholder='e.g. CWNP-D008'
										className='col-span-3'
									/>
								</div>

								<div className='grid grid-cols-4 items-center gap-4'>
									<label htmlFor='deviceName' className='text-right text-sm'>
										Device Name
									</label>
									<Input
										id='deviceName'
										placeholder='e.g. GPS Collar #8'
										className='col-span-3'
									/>
								</div>

								<div className='grid grid-cols-4 items-center gap-4'>
									<label htmlFor='latitude' className='text-right text-sm'>
										Latitude
									</label>
									<Input
										id='latitude'
										placeholder='e.g. 27.5124'
										className='col-span-3'
										type='number'
										step='0.0001'
									/>
								</div>

								<div className='grid grid-cols-4 items-center gap-4'>
									<label htmlFor='longitude' className='text-right text-sm'>
										Longitude
									</label>
									<Input
										id='longitude'
										placeholder='e.g. 84.3341'
										className='col-span-3'
										type='number'
										step='0.0001'
									/>
								</div>

								<div className='grid grid-cols-4 items-center gap-4'>
									<label htmlFor='area' className='text-right text-sm'>
										Area
									</label>
									<Select>
										<SelectTrigger className='col-span-3'>
											<SelectValue placeholder='Select area' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='chitwan'>
												Chitwan National Park
											</SelectItem>
											<SelectItem value='bardiya'>
												Bardiya National Park
											</SelectItem>
											<SelectItem value='sagarmatha'>
												Sagarmatha National Park
											</SelectItem>
											<SelectItem value='annapurna'>
												Annapurna Conservation Area
											</SelectItem>
											<SelectItem value='langtang'>
												Langtang National Park
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<DialogFooter>
								<Button type='submit'>Register Device</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<Card>
				<CardHeader className='pb-2'>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col sm:flex-row sm:items-center gap-4 justify-between'>
							<CardTitle>Tracking Devices</CardTitle>

							<div className='flex flex-col sm:flex-row items-center gap-2'>
								<div className='relative w-full sm:w-auto'>
									<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
									<Input
										placeholder='Search devices...'
										className='w-full sm:w-[200px] md:w-[250px] pl-8'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant='outline'
											size='sm'
											className='ml-auto whitespace-nowrap'
										>
											<Filter className='h-4 w-4 mr-2' />
											Filter
											<ChevronDown className='h-4 w-4 ml-1' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end' className='w-[200px]'>
										<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
										{statusTypes.map((status) => (
											<DropdownMenuCheckboxItem
												key={status}
												checked={filterStatus.includes(status)}
												onCheckedChange={(checked) => {
													checked
														? setFilterStatus([...filterStatus, status])
														: setFilterStatus(
																filterStatus.filter((s) => s !== status)
														  );
												}}
											>
												<span className='capitalize'>{status}</span>
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						<CardDescription>
							{filteredDevices.length} devices found •{' '}
							{devices.filter((d) => d.status === 'active').length} active
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					{/* Responsive Table */}
					<div className='rounded-md border overflow-hidden'>
						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Device ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Coordinates</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className='text-right'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredDevices.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={5}
												className='text-center h-24 text-gray-500'
											>
												No devices found matching your criteria.
											</TableCell>
										</TableRow>
									) : (
										filteredDevices.map((device) => (
											<TableRow key={device.id}>
												<TableCell className='font-medium'>
													{device.id}
												</TableCell>
												<TableCell>{device.name}</TableCell>
												<TableCell>
													<div className='flex flex-col'>
														<div className='flex items-center'>
															<span className='text-gray-500 mr-1'>Lat:</span>
															<span>{device.location.lat.toFixed(4)}</span>
														</div>
														<div className='flex items-center'>
															<span className='text-gray-500 mr-1'>Lng:</span>
															<span>{device.location.lng.toFixed(4)}</span>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{renderStatusBadge(device.status)}
												</TableCell>
												<TableCell className='text-right'>
													<div className='hidden sm:flex justify-end gap-2'>
														<Button variant='outline' size='sm'>
															<MapPin className='h-4 w-4 mr-1' />
															View on Map
														</Button>
													</div>
													<div className='sm:hidden'>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant='ghost' size='sm'>
																	<MoreHorizontal className='h-4 w-4' />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align='end'>
																<DropdownMenuItem>
																	<MapPin className='h-4 w-4 mr-2' />
																	View on Map
																</DropdownMenuItem>
																<DropdownMenuItem>Edit Device</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</div>
				</CardContent>

				<CardFooter className='flex justify-between pt-2'>
					<div className='text-xs text-gray-500'>
						Data refreshed: {new Date().toLocaleTimeString()}
					</div>

					<Button variant='link' size='sm'>
						Export Data
					</Button>
				</CardFooter>
			</Card>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
				<Card>
					<CardHeader>
						<CardTitle>Device Status Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex justify-between items-center'>
								<span className='flex items-center gap-2'>
									<Badge className='bg-green-500'>Active</Badge>
									<span>Active Devices</span>
								</span>
								<span className='font-medium'>
									{devices.filter((d) => d.status === 'active').length}
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='flex items-center gap-2'>
									<Badge variant='secondary'>Inactive</Badge>
									<span>Inactive Devices</span>
								</span>
								<span className='font-medium'>
									{devices.filter((d) => d.status === 'inactive').length}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Device Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							{Array.from(
								new Set(devices.map((device) => device.location.area))
							).map((area) => {
								const count = devices.filter(
									(d) => d.location.area === area
								).length;
								const activeCount = devices.filter(
									(d) => d.location.area === area && d.status === 'active'
								).length;
								return (
									<div key={area} className='space-y-1'>
										<div className='flex justify-between items-center'>
											<span className='font-medium'>{area}</span>
											<span>{count} devices</span>
										</div>
										<div className='flex items-center'>
											<div className='flex-1 bg-gray-200 rounded-full h-2 mr-2'>
												<div
													className='bg-green-500 h-2 rounded-full'
													style={{ width: `${(activeCount / count) * 100}%` }}
												></div>
											</div>
											<span className='text-xs text-gray-500'>
												{activeCount} active
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
