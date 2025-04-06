import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define product interface
interface ProductFeature {
	text: string;
}

interface Product {
	id: string;
	category: string;
	title: string;
	description: string;
	features: ProductFeature[];
	image: {
		src: string;
		alt: string;
	};
	badge: {
		text: string;
		position: 'left' | 'right';
	};
	learnMoreUrl: string;
}

// Product data
const products: Product[] = [
	{
		id: 'iot-device',
		category: 'IoT Device',
		title: 'Wildlife Monitoring System',
		description:
			'Our rugged IoT monitoring system is designed to withstand harsh environments while providing continuous surveillance and detection of wildlife activities and potential threats.',
		features: [
			{ text: 'Advanced acoustic sensors for sound pattern recognition' },
			{ text: 'Solar-powered with backup battery for continuous operation' },
			{ text: 'Satellite and mesh network connectivity for remote areas' },
			{ text: 'AI-powered event detection with ultra-low power consumption' },
		],
		image: {
			src: '/images/iot-device.jpg',
			alt: 'Cymbiosys IoT wildlife monitoring device in forest setting',
		},
		badge: {
			text: 'Field-tested',
			position: 'left',
		},
		learnMoreUrl: '/products/iot-device',
	},
	{
		id: 'analytics-platform',
		category: 'Analytics Platform',
		title: 'Conservation Intelligence Suite',
		description:
			'Our powerful analytics platform transforms raw sensor data into actionable insights, helping conservation teams make informed decisions and respond rapidly to threats.',
		features: [
			{ text: 'Real-time alerts and notifications for immediate response' },
			{
				text: 'Advanced machine learning models for behavior pattern recognition',
			},
			{ text: 'Custom dashboards and reports for conservation metrics' },
			{ text: 'Secure API integration with existing conservation systems' },
		],
		image: {
			src: '/images/analytics-platform.png',
			alt: 'Cymbiosys analytics platform dashboard showing wildlife data',
		},
		badge: {
			text: 'Cloud-based',
			position: 'right',
		},
		learnMoreUrl: '/products/analytics-platform',
	},
];

// Feature component
function ProductFeature({ text }: { text: string }) {
	return (
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
			<span>{text}</span>
		</li>
	);
}

// Product card component
function ProductCard({ product, index }: { product: Product; index: number }) {
	const isEven = index % 2 === 0;

	return (
		<div
			className={cn(
				'grid md:grid-cols-2 gap-8 items-center',
				index < products.length - 1 && 'mb-24'
			)}
		>
			{/* Image section - order changes based on even/odd */}
			<div className={isEven ? 'order-1 md:order-2' : 'order-1'}>
				<div className='relative rounded-lg overflow-hidden shadow-xl aspect-[4/3]'>
					<Image
						src={product.image.src}
						alt={product.image.alt}
						fill
						className='object-cover'
					/>
					<div
						className={cn(
							'absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent',
							!isEven && 'bg-gradient-to-tl'
						)}
					/>
					<div
						className={cn(
							'absolute bottom-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full',
							product.badge.position === 'left' ? 'left-4' : 'right-4'
						)}
					>
						{product.badge.text}
					</div>
				</div>
			</div>

			{/* Content section - order changes based on even/odd */}
			<div className={isEven ? 'order-2 md:order-1' : 'order-2'}>
				<div className='space-y-6'>
					<div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary'>
						{product.category}
					</div>
					<h3 className='text-2xl md:text-3xl font-bold'>{product.title}</h3>
					<p className='text-muted-foreground'>{product.description}</p>
					<ul className='space-y-2'>
						{product.features.map((feature, i) => (
							<ProductFeature key={i} text={feature.text} />
						))}
					</ul>
					<div className='pt-4'>
						<Button asChild>
							<a href={product.learnMoreUrl}>Learn More</a>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Main Products component
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

				{/* Render products using map */}
				{products.map((product, index) => (
					<ProductCard key={product.id} product={product} index={index} />
				))}
			</div>
		</section>
	);
}
