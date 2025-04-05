import { HeroImage } from '@/components/HeroImage';
import { Services } from '@/components/Services';

export default function Home() {
	return (
		<div className='w-full h-full flex flex-col mt-17 items-center justify-center'>
			<HeroImage
				src='/images/hero-jaguar.jpg'
				className='w-full'
				alt='A beautiful landscape with mountains and a river'
				overlayText={{
					title: 'Cymbiosys',
					subtitle: 'Creating next-gen conservation technology',
					alignment: 'left',
				}}
			/>
			<Services />
		</div>
	);
}
