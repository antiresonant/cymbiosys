import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Products() {
	return (
		<section className='py-16 bg-background'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
						Our Conservation Technologies
					</h2>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
						Cutting-edge solutions designed to protect wildlife and preserve
						natural habitats through advanced monitoring and data intelligence.
					</p>
				</div>

				{/* IoT Device Product Section */}
				<div className='grid md:grid-cols-2 gap-8 items-center mb-24'>
					<div className='order-2 md:order-1'>
						<div className='space-y-6'>
							<div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary'>
								IoT Device
							</div>
							<h3 className='text-2xl md:text-3xl font-bold'>
								Wildlife Monitoring System
							</h3>
							<p className='text-muted-foreground'>
								Our rugged IoT monitoring system is designed to withstand harsh
								environments while providing continuous surveillance and
								detection of wildlife activities and potential threats.
							</p>
							<ul className='space-y-2'>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Advanced acoustic sensors for sound pattern recognition
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Solar-powered with backup battery for continuous operation
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Satellite and mesh network connectivity for remote areas
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										AI-powered event detection with ultra-low power consumption
									</span>
								</li>
							</ul>
							<div className='pt-4'>
								<Button asChild>
									<a href='/products/iot-device'>Learn More</a>
								</Button>
							</div>
						</div>
					</div>
					<div className='order-1 md:order-2'>
						<div className='relative rounded-lg overflow-hidden shadow-xl aspect-[4/3]'>
							<Image
								src='/images/iot-device.jpg'
								alt='Cymbiosys IoT wildlife monitoring device in forest setting'
								fill
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent' />
							<div className='absolute bottom-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full'>
								Field-tested
							</div>
						</div>
					</div>
				</div>

				{/* Analytics Platform Product Section */}
				<div className='grid md:grid-cols-2 gap-8 items-center'>
					<div className='order-1'>
						<div className='relative rounded-lg overflow-hidden shadow-xl aspect-[4/3]'>
							<Image
								src='/images/analytics-platform.png'
								alt='Cymbiosys analytics platform dashboard showing wildlife data'
								fill
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-tl from-black/60 to-transparent' />
							<div className='absolute bottom-4 right-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full'>
								Cloud-based
							</div>
						</div>
					</div>
					<div className='order-2'>
						<div className='space-y-6'>
							<div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary'>
								Analytics Platform
							</div>
							<h3 className='text-2xl md:text-3xl font-bold'>
								Conservation Intelligence Suite
							</h3>
							<p className='text-muted-foreground'>
								Our powerful analytics platform transforms raw sensor data into
								actionable insights, helping conservation teams make informed
								decisions and respond rapidly to threats.
							</p>
							<ul className='space-y-2'>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Real-time alerts and notifications for immediate response
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Advanced machine learning models for behavior pattern
										recognition
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Custom dashboards and reports for conservation metrics
									</span>
								</li>
								<li className='flex items-start'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-primary mt-0.5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
											clipRule='evenodd'
										/>
									</svg>
									<span>
										Secure API integration with existing conservation systems
									</span>
								</li>
							</ul>
							<div className='pt-4'>
								<Button asChild>
									<a href='/products/analytics-platform'>Learn More</a>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
