'use client';

import React, { useEffect } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';

// Define props interface
interface MapComponentProps {
	animals: Array<{
		id: number;
		name: string;
		type: string;
		lat: number;
		lng: number;
		location: string;
	}>;
	animalEmojis: Record<string, string>;
	selectedAnimal: number | null;
	setSelectedAnimal: (id: number | null) => void;
}

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

const MapComponent: React.FC<MapComponentProps> = ({
	animals,
	animalEmojis,
	selectedAnimal,
	setSelectedAnimal,
}) => {
	// Fix default icon issue in NextJS
	useEffect(() => {
		// Delete default marker icon settings
		// @ts-ignore
		delete L.Icon.Default.prototype?._getIconUrl;

		// Set up the default icon URLs
		L.Icon.Default.mergeOptions({
			iconRetinaUrl:
				'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
			iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
			shadowUrl:
				'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
		});
	}, []);

	return (
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
	);
};

export default MapComponent;
