import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	MonitorIcon,
	BarChart3Icon,
	TreePine,
	ShieldAlert,
	Waves,
} from 'lucide-react';

export function Services() {
	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<Badge variant='outline' className='mb-4'>
						Our Solutions
					</Badge>
					<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
						Conservation Technology Ecosystem
					</h2>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
						Our integrated platform combines advanced IoT sensors with powerful
						analytics to protect wildlife and combat illegal activities in
						protected areas.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{/* IoT Monitoring Box */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<MonitorIcon className='h-6 w-6 text-primary' />
							</div>
							<div>
								<CardTitle>Wildlife Monitoring Box</CardTitle>
								<CardDescription>
									Advanced IoT sensor technology
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our ruggedized IoT devices deploy seamlessly in remote areas,
								providing 24/7 monitoring with long battery life and satellite
								connectivity.
							</p>
						</CardContent>
					</Card>

					{/* Acoustic Monitoring */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<Waves className='h-6 w-6 text-primary' />
							</div>
							<div>
								<CardTitle>Acoustic Intelligence</CardTitle>
								<CardDescription>Sound-based threat detection</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our advanced acoustic sensors detect and classify sounds from
								wildlife, illegal logging equipment, and potential poaching
								activities in real-time.
							</p>
						</CardContent>
					</Card>

					{/* Anti-Poaching */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<ShieldAlert className='h-6 w-6 text-primary' />
							</div>
							<div>
								<CardTitle>Anti-Poaching System</CardTitle>
								<CardDescription>Proactive wildlife protection</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our system detects suspicious activities and triggers immediate
								alerts to rangers, with precise location data and threat
								classification.
							</p>
						</CardContent>
					</Card>

					{/* Forest Protection */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<TreePine className='h-6 w-6 text-primary' />
							</div>
							<div>
								<CardTitle>Illegal Logging Detection</CardTitle>
								<CardDescription>
									Forest preservation technology
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our sensors can detect chainsaw sounds, vehicle movements, and
								other logging activities, helping protect vulnerable forest
								ecosystems.
							</p>
						</CardContent>
					</Card>

					{/* Data Analytics */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<BarChart3Icon className='h-6 w-6 text-primary' />
							</div>
							<div>
								<CardTitle>Data Analytics Platform</CardTitle>
								<CardDescription>Insights for conservation</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our cloud platform transforms raw sensor data into actionable
								insights, with custom dashboards for wildlife movement patterns
								and threat analysis.
							</p>
						</CardContent>
					</Card>

					{/* Integrated Network */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<div className='bg-primary/10 p-3 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='text-primary'
								>
									<path d='M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2'></path>
									<path d='M18 14h-8'></path>
									<path d='M15 18h-5'></path>
									<path d='M10 6h8v4h-8z'></path>
								</svg>
							</div>
							<div>
								<CardTitle>Comprehensive Ecosystem</CardTitle>
								<CardDescription>End-to-end solution</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								Our complete ecosystem connects field technology with data
								analysis, reporting tools, and alerting systems for
								comprehensive conservation management.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
