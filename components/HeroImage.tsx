import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroImageProps {
	src: string;
	alt: string;
	className?: string;
	priority?: boolean;
	objectPosition?: string;
	overlayText?: {
		title?: string;
		subtitle?: string;
		alignment?: 'left' | 'center' | 'right';
	};
}

export function HeroImage({
	src,
	alt,
	className,
	priority = true,
	objectPosition = 'center',
	overlayText,
}: HeroImageProps) {
	const textAlignment = overlayText?.alignment || 'center';

	const alignmentClasses = {
		left: 'items-start text-left pl-8 md:pl-16',
		center: 'items-center text-center',
		right: 'items-end text-right pr-8 md:pr-16',
	};

	return (
		<div
			className={cn(
				'relative w-full h-[400px] md:h-[600px] overflow-hidden',
				className
			)}
		>
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				className={`object-cover`}
				style={{ objectPosition: objectPosition }}
			/>

			{/* Gradient overlay using primary color */}
			<div
				className='absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent'
				aria-hidden='true'
			/>

			{/* Optional text overlay */}
			{overlayText && (
				<div
					className={cn(
						'absolute inset-0 flex flex-col justify-center text-white z-10',
						alignmentClasses[textAlignment]
					)}
				>
					{overlayText.title && (
						<h1 className='text-3xl md:text-5xl font-bold mb-4'>
							{overlayText.title}
						</h1>
					)}
					{overlayText.subtitle && (
						<p className='text-lg md:text-xl max-w-xl'>
							{overlayText.subtitle}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
