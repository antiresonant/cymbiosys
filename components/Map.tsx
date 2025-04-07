'use client';

import { useEffect } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polygon,
	useMap,
	ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
	// This code fixes the missing Leaflet marker icons in Next.js
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
};

// Map controller component to handle changes from outside the MapContainer
function MapController({
	mapType,
	center,
	zoom,
	onViewStateChange,
}: {
	mapType: string;
	center: [number, number];
	zoom: number;
	onViewStateChange?: (center: [number, number], zoom: number) => void;
}) {
	const map = useMap();

	// Update tile layer when map type changes
	useEffect(() => {
		// Set appropriate tile layer based on mapType
		const currentTileLayer = map.eachLayer((layer) => {
			if (layer instanceof L.TileLayer) {
				map.removeLayer(layer);
			}
		});

		let tileUrl;
		switch (mapType) {
			case 'satellite':
				tileUrl =
					'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
				break;
			case 'terrain':
				tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
				break;
			case 'hybrid':
				tileUrl =
					'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
				break;
			case 'roadmap':
			default:
				tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				break;
		}

		L.tileLayer(tileUrl, {
			attribution:
				mapType === 'satellite'
					? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					: mapType === 'terrain'
					? 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
					: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 19,
		}).addTo(map);

		// Listen for map movements to update parent state
		const onMoveEnd = () => {
			const center = map.getCenter();
			const zoom = map.getZoom();
			if (onViewStateChange) {
				onViewStateChange([center.lat, center.lng], zoom);
			}
		};

		map.on('moveend', onMoveEnd);

		return () => {
			map.off('moveend', onMoveEnd);
		};
	}, [map, mapType, onViewStateChange]);

	// Update center and zoom when props change
	useEffect(() => {
		map.setView(center, zoom);
	}, [map, center, zoom]);

	return null;
}

interface MapComponentProps {
	viewState: {
		center: [number, number];
		zoom: number;
	};
	setViewState: (viewState: { center: [number, number]; zoom: number }) => void;
	mapType: string;
	visibleLayers: {
		tigers: boolean;
		elephants: boolean;
		zones: boolean;
		incidents: boolean;
	};
	animalSightings: any[];
	conservationZones: any[];
	incidents: any[];
	onAnimalSelect: (animal: any) => void;
}

const MapComponent = ({
	viewState,
	setViewState,
	mapType,
	visibleLayers,
	animalSightings,
	conservationZones,
	incidents,
	onAnimalSelect,
}: MapComponentProps) => {
	// Initialize Leaflet icon fix
	useEffect(() => {
		fixLeafletIcons();
	}, []);

	return (
		<MapContainer
			center={viewState.center}
			zoom={viewState.zoom}
			style={{ height: '100%', width: '100%' }}
			zoomControl={false}
			attributionControl={false}
		>
			{/* Map Controller to handle map type changes */}
			<MapController
				mapType={mapType}
				center={viewState.center}
				zoom={viewState.zoom}
				onViewStateChange={(center, zoom) => setViewState({ center, zoom })}
			/>

			{/* Attribution control */}
			<div
				className='leaflet-control-attribution leaflet-control'
				style={{
					position: 'absolute',
					bottom: '0',
					right: '0',
					zIndex: 1000,
					background: 'rgba(255,255,255,0.7)',
					padding: '0 5px',
					fontSize: '11px',
				}}
			>
				© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>{' '}
				contributors
			</div>

			{/* Zoom Control */}
			<ZoomControl position='bottomright' />

			{/* Conservation Zones */}
			{visibleLayers.zones &&
				conservationZones.map((zone) => (
					<Polygon
						key={zone.id}
						positions={zone.coordinates}
						pathOptions={{
							fillColor: zone.color,
							fillOpacity: 0.3,
							weight: 2,
							color: zone.color,
						}}
					>
						<Popup>
							<div>
								<h3 className='font-bold'>{zone.name}</h3>
								<p className='text-sm'>Type: {zone.type}</p>
							</div>
						</Popup>
					</Polygon>
				))}

			{/* Tiger Markers */}
			{visibleLayers.tigers &&
				animalSightings
					.filter((animal) => animal.type === 'tiger')
					.map((tiger) => {
						// Creating a custom div icon for tiger
						const tigerIcon = L.divIcon({
							className: 'custom-div-icon',
							html: `
                <div style="background-color: #f97316; color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9c0 1.8-4 3-10 3S2 10.8 2 9s4-3 10-3 10 1.2 10 3Z"/><path d="M17.2 13.5c-.5.7-2.8 1.3-5.2 1.3s-4.7-.6-5.2-1.3"/><path d="M22 9v9c0 1.8-4 3-10 3s-10-1.2-10-3V9"/><path d="M19 9v12"/><path d="M5 9v12"/></svg>
                </div>
              `,
							iconSize: [36, 36],
							iconAnchor: [18, 18],
							popupAnchor: [0, -18],
						});

						return (
							<Marker
								key={tiger.id}
								position={[tiger.location.lat, tiger.location.lng]}
								icon={tigerIcon}
								eventHandlers={{
									click: () => {
										onAnimalSelect(tiger);
									},
								}}
							>
								<Popup>
									<div className='p-2'>
										<h3 className='font-bold'>{tiger.name}</h3>
										<p className='text-sm'>{tiger.area}</p>
										<button
											className='mt-2 text-xs text-blue-600 hover:underline'
											onClick={() => onAnimalSelect(tiger)}
										>
											View Details
										</button>
									</div>
								</Popup>
							</Marker>
						);
					})}

			{/* Elephant Markers */}
			{visibleLayers.elephants &&
				animalSightings
					.filter((animal) => animal.type === 'elephant')
					.map((elephant) => {
						// Creating a custom div icon for elephant
						const elephantIcon = L.divIcon({
							className: 'custom-div-icon',
							html: `
                <div style="background-color: #4b5563; color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9c0 0 0.5 0.5 0.5 2c0 1.5-0.5 2-0.5 2"/><path d="M9 9c0 0-0.5 0.5-0.5 2c0 1.5 0.5 2 0.5 2"/><path d="M12 7v10"/></svg>
                </div>
              `,
							iconSize: [36, 36],
							iconAnchor: [18, 18],
							popupAnchor: [0, -18],
						});

						return (
							<Marker
								key={elephant.id}
								position={[elephant.location.lat, elephant.location.lng]}
								icon={elephantIcon}
								eventHandlers={{
									click: () => {
										onAnimalSelect(elephant);
									},
								}}
							>
								<Popup>
									<div className='p-2'>
										<h3 className='font-bold'>{elephant.name}</h3>
										<p className='text-sm'>{elephant.area}</p>
										<button
											className='mt-2 text-xs text-blue-600 hover:underline'
											onClick={() => onAnimalSelect(elephant)}
										>
											View Details
										</button>
									</div>
								</Popup>
							</Marker>
						);
					})}

			{/* Incident Markers */}
			{visibleLayers.incidents &&
				incidents.map((incident) => {
					// Creating a custom div icon for incidents
					const incidentColor =
						incident.status === 'Active' ? '#ef4444' : '#eab308';
					const incidentIcon = L.divIcon({
						className: 'custom-div-icon',
						html: `
              <div style="background-color: ${incidentColor}; color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              ${
								incident.status === 'Active'
									? '<div class="ping-animation"></div>'
									: ''
							}
            `,
						iconSize: [36, 36],
						iconAnchor: [18, 18],
						popupAnchor: [0, -18],
					});

					return (
						<Marker
							key={incident.id}
							position={[incident.location.lat, incident.location.lng]}
							icon={incidentIcon}
						>
							<Popup>
								<div className='p-2'>
									<h3 className='font-bold'>
										{incident.type.charAt(0).toUpperCase() +
											incident.type.slice(1)}{' '}
										Incident
									</h3>
									<p className='text-sm'>
										<span className='font-semibold'>Status:</span>{' '}
										{incident.status}
									</p>
									<p className='text-sm'>
										<span className='font-semibold'>When:</span>{' '}
										{new Date(incident.timestamp).toLocaleString()}
									</p>
									<p className='text-sm'>
										<span className='font-semibold'>Details:</span>{' '}
										{incident.description}
									</p>
								</div>
							</Popup>
						</Marker>
					);
				})}
		</MapContainer>
	);
};

export default MapComponent;
