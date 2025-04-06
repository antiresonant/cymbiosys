'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { AreaChart, BarChart, DonutChart, LineChart } from '@tremor/react';
import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	Calendar,
	Factory,
	FileText,
	Flame,
	Crosshair,
	Landmark,
	Leaf,
	MapPin,
	PawPrint,
	Shield,
	Thermometer,
	Trees,
	TrendingDown,
	TrendingUp,
	Truck,
} from 'lucide-react';

// Sample data for dashboard
const recentIncidentsData = [
	{
		id: 1,
		type: 'Gunshot',
		location: 'Sector A-12',
		coordinates: '1.2345°N, 103.8765°E',
		time: '10:23 AM',
		date: 'Apr 05, 2025',
		confidence: 0.92,
		status: 'Investigated',
	},
	{
		id: 2,
		type: 'Chainsaw',
		location: 'Sector C-5',
		coordinates: '1.3087°N, 103.7823°E',
		time: '02:41 PM',
		date: 'Apr 04, 2025',
		confidence: 0.89,
		status: 'Confirmed',
	},
	{
		id: 3,
		type: 'Vehicle',
		location: 'Sector B-8',
		coordinates: '1.2876°N, 103.8156°E',
		time: '11:52 PM',
		date: 'Apr 04, 2025',
		confidence: 0.78,
		status: 'Pending',
	},
	{
		id: 4,
		type: 'Gunshot',
		location: 'Sector D-3',
		coordinates: '1.3211°N, 103.8032°E',
		time: '05:17 AM',
		date: 'Apr 03, 2025',
		confidence: 0.95,
		status: 'Confirmed',
	},
	{
		id: 5,
		type: 'Animal',
		location: 'Sector A-9',
		coordinates: '1.2511°N, 103.8345°E',
		time: '09:30 AM',
		date: 'Apr 03, 2025',
		confidence: 0.87,
		status: 'Identified',
	},
];

// Monthly incident data for charts
const monthlyData = [
	{ month: 'Jan', Gunshots: 12, Chainsaws: 8, Vehicles: 15, Animals: 122 },
	{ month: 'Feb', Gunshots: 15, Chainsaws: 10, Vehicles: 17, Animals: 138 },
	{ month: 'Mar', Gunshots: 7, Chainsaws: 14, Vehicles: 11, Animals: 156 },
	{ month: 'Apr', Gunshots: 9, Chainsaws: 6, Vehicles: 12, Animals: 142 },
	{ month: 'May', Gunshots: 14, Chainsaws: 12, Vehicles: 14, Animals: 131 },
	{ month: 'Jun', Gunshots: 18, Chainsaws: 16, Vehicles: 13, Animals: 127 },
	{ month: 'Jul', Gunshots: 21, Chainsaws: 19, Vehicles: 17, Animals: 133 },
	{ month: 'Aug', Gunshots: 16, Chainsaws: 11, Vehicles: 15, Animals: 145 },
	{ month: 'Sep', Gunshots: 12, Chainsaws: 8, Vehicles: 11, Animals: 152 },
	{ month: 'Oct', Gunshots: 8, Chainsaws: 7, Vehicles: 9, Animals: 147 },
	{ month: 'Nov', Gunshots: 11, Chainsaws: 13, Vehicles: 12, Animals: 139 },
	{ month: 'Dec', Gunshots: 13, Chainsaws: 15, Vehicles: 14, Animals: 128 },
];

// Animal detection data
const animalData = [
	{ species: 'Tigers', count: 23, change: 12, status: 'Endangered' },
	{ species: 'Elephants', count: 48, change: -5, status: 'Vulnerable' },
	{
		species: 'Orangutans',
		count: 31,
		change: 8,
		status: 'Critically Endangered',
	},
	{ species: 'Hornbills', count: 106, change: 22, status: 'Near Threatened' },
	{ species: 'Deer', count: 219, change: 15, status: 'Least Concern' },
];

// Conservation data for donut chart
const conservationData = [
	{ area: 'Protected', value: 68 },
	{ area: 'Buffer Zone', value: 17 },
	{ area: 'Restoration', value: 10 },
	{ area: 'Unprotected', value: 5 },
];

// Success rate metrics
const successMetrics = [
	{ metric: 'Poaching Prevented', value: 87, change: 12, icon: Shield },
	{ metric: 'Illegal Logging Stopped', value: 73, change: 8, icon: Trees },
	{ metric: 'Wildlife Protected', value: 92, change: 5, icon: PawPrint },
	{
		metric: 'Response Time',
		value: '8.3 min',
		change: -14,
		icon: Flame,
		format: 'time',
	},
];

export default function DashboardPage() {
	const [timeRange, setTimeRange] = useState('30d');

	return (
		<div className='w-full space-y-6'>
			{/* Dashboard Header */}
			<div className='flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>
						Conservation Dashboard
					</h2>
					<p className='text-muted-foreground'>
						Real-time monitoring for wildlife and habitat protection
					</p>
				</div>
				<div className='flex items-center gap-2'>
					<Select defaultValue={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className='w-[160px]'>
							<SelectValue placeholder='Select time range' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='7d'>Last 7 days</SelectItem>
							<SelectItem value='30d'>Last 30 days</SelectItem>
							<SelectItem value='90d'>Last 90 days</SelectItem>
							<SelectItem value='1y'>Last year</SelectItem>
						</SelectContent>
					</Select>

					<Button className='flex items-center gap-2'>
						<FileText className='h-4 w-4' />
						<span>Export Report</span>
					</Button>
				</div>
			</div>

			{/* Status Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{successMetrics.map((metric, i) => (
					<Card key={i}>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>
										{metric.metric}
									</p>
									<div className='flex items-center gap-2'>
										<p className='text-2xl font-bold'>
											{metric.value}
											{metric.format === 'percent' ? '%' : ''}
										</p>
										<Badge
											variant={metric.change > 0 ? 'default' : 'destructive'}
											className='flex items-center h-6 px-2'
										>
											{metric.change > 0 ? (
												<ArrowUp className='mr-1 h-3 w-3' />
											) : (
												<ArrowDown className='mr-1 h-3 w-3' />
											)}
											{Math.abs(metric.change)}%
										</Badge>
									</div>
								</div>
								<div className='rounded-full p-2 bg-primary/10'>
									<metric.icon className='h-5 w-5 text-primary' />
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Tabs for different data views */}
			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='incidents'>Incidents</TabsTrigger>
					<TabsTrigger value='animals'>Wildlife</TabsTrigger>
					<TabsTrigger value='conservation'>Conservation</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value='overview' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2'>
						{/* Monthly Incidents Chart */}
						<Card className='col-span-2'>
							<CardHeader>
								<CardTitle>Threats Detected (Last 12 Months)</CardTitle>
								<CardDescription>
									Monthly detection of potential poaching and illegal logging
									activities
								</CardDescription>
							</CardHeader>
							<CardContent>
								<LineChart
									className='h-80'
									data={monthlyData}
									index='month'
									categories={['Gunshots', 'Chainsaws', 'Vehicles']}
									colors={['rose', 'amber', 'indigo']}
									valueFormatter={(value) => `${value}`}
									yAxisWidth={40}
									showAnimation={true}
									showLegend={true}
									showGridLines={true}
									curveType='natural'
									enableLegendSlider={true}
								/>
							</CardContent>
						</Card>

						{/* Recent Incidents */}
						<Card className='col-span-2 md:col-span-1'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<div className='space-y-1'>
									<CardTitle>Recent Incident Alerts</CardTitle>
									<CardDescription>
										Latest detected potential threats
									</CardDescription>
								</div>
								<Button variant='outline' size='sm'>
									View All
								</Button>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{recentIncidentsData.slice(0, 3).map((incident) => (
										<div
											key={incident.id}
											className='flex items-start space-x-4'
										>
											<div className='rounded-full p-2 bg-primary/10'>
												{incident.type === 'Gunshot' && (
													<Crosshair className='h-4 w-4 text-primary' />
												)}
												{incident.type === 'Chainsaw' && (
													<Trees className='h-4 w-4 text-primary' />
												)}
												{incident.type === 'Vehicle' && (
													<Truck className='h-4 w-4 text-primary' />
												)}
												{incident.type === 'Animal' && (
													<PawPrint className='h-4 w-4 text-primary' />
												)}
											</div>
											<div className='flex-1 space-y-1'>
												<div className='flex items-center justify-between'>
													<p className='text-sm font-medium'>
														{incident.type} Detected
													</p>
													<Badge
														variant={
															incident.status === 'Confirmed'
																? 'destructive'
																: incident.status === 'Investigated'
																? 'outline'
																: 'secondary'
														}
													>
														{incident.status}
													</Badge>
												</div>
												<div className='flex items-center text-xs text-muted-foreground'>
													<MapPin className='mr-1 h-3 w-3' />
													<span>{incident.location}</span>
													<span className='mx-2'>•</span>
													<Calendar className='mr-1 h-3 w-3' />
													<span>
														{incident.date}, {incident.time}
													</span>
												</div>
												<div className='text-xs'>
													<span className='text-muted-foreground'>
														Confidence:{' '}
													</span>
													<span className='font-medium'>
														{Math.round(incident.confidence * 100)}%
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Wildlife Detection */}
						<Card className='col-span-2 md:col-span-1'>
							<CardHeader className='pb-2'>
								<CardTitle>Wildlife Activity</CardTitle>
								<CardDescription>
									Monthly animal sightings by sensors
								</CardDescription>
							</CardHeader>
							<CardContent>
								<AreaChart
									className='h-64'
									data={monthlyData}
									categories={['Animals']}
									index='month'
									colors={['emerald']}
									yAxisWidth={40}
									showAnimation
									showGradient
									curveType='natural'
									showLegend={false}
								/>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Incidents Tab */}
				<TabsContent value='incidents' className='space-y-4'>
					<div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
						<Card className='col-span-1 md:col-span-2 lg:col-span-3'>
							<CardHeader>
								<CardTitle>Threat Detection Analysis</CardTitle>
								<CardDescription>
									Monthly breakdown of detected potential threats
								</CardDescription>
							</CardHeader>
							<CardContent>
								<BarChart
									className='h-80'
									data={monthlyData}
									index='month'
									categories={['Gunshots', 'Chainsaws', 'Vehicles']}
									colors={['rose', 'amber', 'indigo']}
									yAxisWidth={40}
									showAnimation
									showLegend
									stack
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Gunshot Detections</CardTitle>
								<CardDescription className='flex items-center gap-2'>
									<span className='inline-flex items-center'>
										<TrendingDown className='h-4 w-4 text-green-500 mr-1' />
										12% decrease
									</span>
									<span>from previous period</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold'>156</div>
								<p className='text-muted-foreground mt-2'>
									Total gunshots detected in the last year, with 87%
									successfully investigated
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Illegal Logging</CardTitle>
								<CardDescription className='flex items-center gap-2'>
									<span className='inline-flex items-center'>
										<TrendingDown className='h-4 w-4 text-green-500 mr-1' />
										8% decrease
									</span>
									<span>from previous period</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold'>134</div>
								<p className='text-muted-foreground mt-2'>
									Total chainsaw and logging incidents detected, with 18 active
									cases
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Unauthorized Vehicles</CardTitle>
								<CardDescription className='flex items-center gap-2'>
									<span className='inline-flex items-center'>
										<TrendingUp className='h-4 w-4 text-red-500 mr-1' />
										5% increase
									</span>
									<span>from previous period</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold'>211</div>
								<p className='text-muted-foreground mt-2'>
									Unauthorized vehicle detections in restricted areas, 42 linked
									to other incidents
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Animals Tab */}
				<TabsContent value='animals' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<Card className='col-span-1 md:col-span-2 lg:col-span-3'>
							<CardHeader>
								<CardTitle>Wildlife Monitoring</CardTitle>
								<CardDescription>
									Population trends for key species in the conservation area
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4 md:grid-cols-2'>
									<div className='space-y-4'>
										{animalData.map((animal, i) => (
											<div
												key={i}
												className='flex items-center justify-between p-4 border rounded-lg'
											>
												<div>
													<p className='font-medium'>{animal.species}</p>
													<p className='text-xs text-muted-foreground'>
														{animal.status}
													</p>
												</div>
												<div className='flex items-center gap-2'>
													<div className='text-2xl font-bold'>
														{animal.count}
													</div>
													<Badge
														variant={
															animal.change > 0 ? 'default' : 'destructive'
														}
														className='flex items-center h-6 px-2'
													>
														{animal.change > 0 ? (
															<ArrowUp className='mr-1 h-3 w-3' />
														) : (
															<ArrowDown className='mr-1 h-3 w-3' />
														)}
														{Math.abs(animal.change)}%
													</Badge>
												</div>
											</div>
										))}
									</div>

									<Card className='bg-card/50 border-0'>
										<CardHeader className='pb-2'>
											<CardTitle className='text-base'>
												Wildlife Detection Trends
											</CardTitle>
										</CardHeader>
										<CardContent>
											<DonutChart
												className='h-52'
												data={animalData.map((animal) => ({
													name: animal.species,
													value: animal.count,
												}))}
												category='value'
												index='name'
												colors={['emerald', 'amber', 'rose', 'blue', 'indigo']}
												showAnimation
												showTooltip
												showLabel
											/>
										</CardContent>
									</Card>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Biodiversity Index</CardTitle>
								<CardDescription>Ecosystem health indicator</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-2'>
									<div className='text-4xl font-bold'>78.3</div>
									<Badge variant='default' className='h-6'>
										<ArrowUp className='mr-1 h-3 w-3' />
										3.2%
									</Badge>
								</div>
								<p className='text-muted-foreground mt-2'>
									The biodiversity index has shown steady improvement in the
									last quarter
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Endangered Species</CardTitle>
								<CardDescription>Critical protection status</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-2'>
									<div className='text-4xl font-bold'>12</div>
									<Badge variant='outline' className='h-6'>
										Stable
									</Badge>
								</div>
								<p className='text-muted-foreground mt-2'>
									Currently monitoring 12 endangered species with stable
									populations
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Migration Patterns</CardTitle>
								<CardDescription>Seasonal wildlife movement</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-2'>
									<div className='text-4xl font-bold'>92%</div>
									<Badge variant='default' className='h-6'>
										<ArrowUp className='mr-1 h-3 w-3' />
										5%
									</Badge>
								</div>
								<p className='text-muted-foreground mt-2'>
									Normal migration routes maintained with reduced human
									interference
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Conservation Tab */}
				<TabsContent value='conservation' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card className='col-span-1 md:col-span-2 lg:col-span-4'>
							<CardHeader>
								<CardTitle>Conservation Status</CardTitle>
								<CardDescription>
									Land protection and habitat monitoring
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid gap-8 md:grid-cols-2'>
									<div>
										<DonutChart
											className='h-60'
											data={conservationData}
											category='value'
											index='area'
											colors={['emerald', 'amber', 'blue', 'rose']}
											showAnimation
											showTooltip
											showLabel
											valueFormatter={(value) => `${value}%`}
										/>
									</div>

									<div className='space-y-4'>
										<div className='grid grid-cols-2 gap-4'>
											<Card className='bg-card/50 border-0'>
												<CardContent className='p-4'>
													<div className='flex flex-col items-center justify-center h-full text-center'>
														<Trees className='h-10 w-10 text-primary mb-2' />
														<div className='text-2xl font-bold'>24,328</div>
														<p className='text-sm text-muted-foreground'>
															Hectares protected
														</p>
													</div>
												</CardContent>
											</Card>

											<Card className='bg-card/50 border-0'>
												<CardContent className='p-4'>
													<div className='flex flex-col items-center justify-center h-full text-center'>
														<Leaf className='h-10 w-10 text-primary mb-2' />
														<div className='text-2xl font-bold'>12,564</div>
														<p className='text-sm text-muted-foreground'>
															Trees planted
														</p>
													</div>
												</CardContent>
											</Card>

											<Card className='bg-card/50 border-0'>
												<CardContent className='p-4'>
													<div className='flex flex-col items-center justify-center h-full text-center'>
														<Landmark className='h-10 w-10 text-primary mb-2' />
														<div className='text-2xl font-bold'>36</div>
														<p className='text-sm text-muted-foreground'>
															Conservation zones
														</p>
													</div>
												</CardContent>
											</Card>

											<Card className='bg-card/50 border-0'>
												<CardContent className='p-4'>
													<div className='flex flex-col items-center justify-center h-full text-center'>
														<Factory className='h-10 w-10 text-primary mb-2' />
														<div className='text-2xl font-bold'>-32%</div>
														<p className='text-sm text-muted-foreground'>
															Carbon footprint
														</p>
													</div>
												</CardContent>
											</Card>
										</div>

										<Card className='bg-card/50 border-0'>
											<CardHeader className='p-4 pb-2'>
												<CardTitle className='text-base'>
													Environmental Health
												</CardTitle>
											</CardHeader>
											<CardContent className='p-4'>
												<div className='space-y-2'>
													<div className='flex items-center justify-between'>
														<div className='flex items-center'>
															<Thermometer className='h-4 w-4 mr-2 text-primary' />
															<span>Air Quality Index</span>
														</div>
														<div>
															<Badge variant='default'>Good (42)</Badge>
														</div>
													</div>

													<div className='flex items-center justify-between'>
														<div className='flex items-center'>
															<AlertTriangle className='h-4 w-4 mr-2 text-primary' />
															<span>Deforestation Risk</span>
														</div>
														<div>
															<Badge variant='secondary'>Low</Badge>
														</div>
													</div>

													<div className='flex items-center justify-between'>
														<div className='flex items-center'>
															<AlertTriangle className='h-4 w-4 mr-2 text-primary' />
															<span>Poaching Risk</span>
														</div>
														<div>
															<Badge variant='secondary'>Moderate</Badge>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
