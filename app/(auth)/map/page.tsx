'use client';

import React, { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

// Sample animal data in Nepal, coordinates are real locations in Nepal
const animals = [
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

// Create custom emoji markers for different animal types
const createEmojiMarker = (emoji: string) => {
	return L.divIcon({
		html: `<div class="emoji-marker">${emoji}</div>`,
		className: '',
		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -20],
	});
};

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

export default function AnimalTrackingMap() {
	const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);

	// Fix default icon issue in NextJS
	useEffect(() => {
		// Only run on client side
		if (typeof window !== 'undefined') {
			// @ts-ignore
			delete L.Icon.Default.prototype._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl:
					'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
				iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
				shadowUrl:
					'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
			});
		}
	}, []);

	return (
		<div>
			<h1 className='text-3xl font-bold mb-4'>Conservation Map</h1>

			<MapContainer
				center={[28.3949, 84.124]} // Centered on Nepal
				zoom={7} // Zoomed out to show all of Nepal
				className='h-[600px] w-full rounded-xl shadow-md z-0'
				zoomControl={false} // We'll add zoom control in a better position
			>
				<ZoomControl position='bottomright' />

				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{/* Terrain/Topographic layer option */}
				{/* <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        /> */}

				{animals.map((animal) => (
					<Marker
						key={animal.id}
						position={[animal.lat, animal.lng]}
						icon={createEmojiMarker(
							animalEmojis[animal.type] || animalEmojis.default
						)}
						eventHandlers={{
							click: () => {
								setSelectedAnimal(animal.id);
							},
						}}
					>
						<Popup>
							<div className='text-center'>
								<div className='text-3xl mb-1'>
									{animalEmojis[animal.type] || animalEmojis.default}
								</div>
								<strong>{animal.name}</strong>
								<br />
								<span className='text-sm text-gray-600'>
									Location: {animal.location}
									<br />
									Latitude: {animal.lat.toFixed(4)}
									<br />
									Longitude: {animal.lng.toFixed(4)}
								</span>
								<div className='mt-2'>
									<button
										className='bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded'
										onClick={() => console.log(`Tracking animal: ${animal.id}`)}
									>
										Start Tracking
									</button>
								</div>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>

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
