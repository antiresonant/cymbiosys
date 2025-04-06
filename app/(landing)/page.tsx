import { Contact } from '@/components/Contact';
import { HeroImage } from '@/components/HeroImage';
import { Products } from '@/components/Products';
import { Services } from '@/components/Services';

export default function Home() {
	return (
		<div className='w-full h-full flex flex-col mt-17 items-center justify-center'>
			<section className='w-full h-full'>
				<HeroImage
					src='/images/hero-jaguar.jpg'
					className='w-full'
					objectPosition='top right'
					alt='A beautiful landscape with mountains and a river'
					overlayText={{
						title: 'Cymbiosys',
						subtitle: 'Creating next-gen conservation technology',
						alignment: 'left',
					}}
				/>
			</section>
			<section className='w-full h-full'>
				<Services />
			</section>
			<section className='w-full h-full'>
				<Products />
			</section>
			<section className='w-full h-full'>
				<Contact />
			</section>
		</div>
	);
}
