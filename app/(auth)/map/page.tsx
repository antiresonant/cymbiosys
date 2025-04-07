'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Define the animal data interface
interface Animal {
	id: number;
	name: string;
	type: string;
	lat: number;
	lng: number;
	location: string;
}

// Sample animal data in Nepal, coordinates are real locations in Nepal
const animals: Animal[] = [
	{
		id: 1,
		name: 'Elephant 001',
		type: 'elephant',
		lat: 27.5291,
		lng: 84.3542,
		location: 'Chitwan National Park',
	},
	{
		id: 2,
		name: 'Rhino 002',
		type: 'rhino',
		lat: 27.4775,
		lng: 84.4612,
		location: 'Chitwan National Park',
	},
	{
		id: 3,
		name: 'Tiger 003',
		type: 'tiger',
		lat: 28.855,
		lng: 80.2627,
		location: 'Bardiya National Park',
	},
	{
		id: 4,
		name: 'Red Panda 004',
		type: 'panda',
		lat: 27.6965,
		lng: 86.7314,
		location: 'Sagarmatha National Park',
	},
	{
		id: 5,
		name: 'Snow Leopard 005',
		type: 'leopard',
		lat: 28.5343,
		lng: 83.8751,
		location: 'Annapurna Conservation Area',
	},
];

// Map animal types to corresponding emojis
const animalEmojis: Record<string, string> = {
	elephant: '🐘',
	rhino: '🦏',
	tiger: '🐅',
	panda: '🐼',
	leopard: '🐆',
	// Add more animal emojis as needed
	default: '🐾',
};

// Dynamically import the Map component to prevent SSR
const MapComponent = dynamic(() => import('@/components/Map'), {
	ssr: false,
	loading: () => (
		<div className='h-[600px] w-full rounded-xl shadow-md flex items-center justify-center bg-gray-100'>
			<div className='text-gray-500'>Loading map...</div>
		</div>
	),
});

export default function AnimalTrackingMap() {
	const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);

	return (
		<div>
			<h1 className='text-3xl font-bold mb-4'>Conservation Map</h1>

			{/* Pass the required props to the dynamic component */}
			<MapComponent
				animals={animals}
				animalEmojis={animalEmojis}
				selectedAnimal={selectedAnimal}
				setSelectedAnimal={setSelectedAnimal}
			/>

			{/* Additional information section */}
			<div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-bold mb-2'>Legend</h2>
					<ul className='space-y-2'>
						{Object.entries(animalEmojis)
							.filter(([key]) => key !== 'default')
							.map(([type, emoji]) => (
								<li key={type} className='flex items-center'>
									<span className='mr-2 text-xl'>{emoji}</span>
									<span className='capitalize'>{type}</span>
								</li>
							))}
					</ul>
				</div>

				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-bold mb-2'>Conservation Areas</h2>
					<ul className='space-y-1 text-sm'>
						<li>• Chitwan National Park</li>
						<li>• Bardiya National Park</li>
						<li>• Sagarmatha National Park</li>
						<li>• Annapurna Conservation Area</li>
						<li>• Langtang National Park</li>
					</ul>
				</div>

				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-bold mb-2'>Latest Updates</h2>
					<div className='space-y-2 text-sm'>
						<p className='text-gray-700'>
							<span className='font-medium'>Today:</span> Two new rhinos spotted
							in eastern Chitwan
						</p>
						<p className='text-gray-700'>
							<span className='font-medium'>Yesterday:</span> Snow leopard
							migration tracked in Annapurna
						</p>
						<p className='text-gray-700'>
							<span className='font-medium'>Last week:</span> New tiger cubs
							documented in Bardiya
						</p>
					</div>
				</div>
			</div>

			{/* Add some CSS for the emoji markers */}
			<style jsx global>{`
				.emoji-marker {
					font-size: 2rem;
					width: 40px;
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: rgba(255, 255, 255, 0.7);
					border-radius: 50%;
					border: 2px solid white;
					box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
					text-align: center;
					transition: all 0.3s;
				}
				.emoji-marker:hover {
					transform: scale(1.2);
					cursor: pointer;
				}
			`}</style>
		</div>
	);
}
