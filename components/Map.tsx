'use client';

import React, { useEffect } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	Circle,
} from 'react-leaflet';
import L from 'leaflet';
import {
	AlertTriangle,
	Volume2,
	User,
	Activity,
	Zap,
	Ear,
	Car,
	MinusCircle,
} from 'lucide-react';

// Define sensor data interface
interface SensorData {
	timestamp: string | null;
	mainCategory: string | null;
	subcategory: string | null;
	moduleId: string;
	radialDistance: number | null;
	angle: number | null;
	pValue: number | null;
	sValue: number | null;
	gpsCoordinates: string;
	lat: number;
	lng: number;
	status?: string;
}

// Define props interface
interface MapComponentProps {
	sensors: SensorData[];
	selectedSensor: string | null;
	setSelectedSensor: (id: string | null) => void;
}

// Alert severity based on category
const getAlertSeverity = (category: string, pValue: number) => {
	const criticalCategories = ['Explosive sound', 'Animal distress'];
	const warningCategories = [
		'Human voice',
		'Human movement',
		'Human activity',
		'Vehicle',
	];
	const infoCategories = ['Animal sound', 'Animal silence', 'Silence'];

	if (criticalCategories.includes(category) || pValue <= 0.01)
		return 'critical';
	if (warningCategories.includes(category) || pValue <= 0.02) return 'warning';
	return 'info';
};

// Get alert icon and color based on category
const getAlertIcon = (category: string, severity: string) => {
	const iconSize = 24;
	const getColor = () => {
		switch (severity) {
			case 'critical':
				return '#ef4444'; // red-500
			case 'warning':
				return '#f59e0b'; // amber-500
			default:
				return '#3b82f6'; // blue-500
		}
	};

	const iconMap: Record<string, React.ReactNode> = {
		'Human voice': <User size={iconSize} color={getColor()} />,
		'Human movement': <Activity size={iconSize} color={getColor()} />,
		'Human activity': <Activity size={iconSize} color={getColor()} />,
		'Animal sound': <Volume2 size={iconSize} color={getColor()} />,
		'Explosive sound': <Zap size={iconSize} color={getColor()} />,
		'Animal distress': <AlertTriangle size={iconSize} color={getColor()} />,
		'Animal silence': <Ear size={iconSize} color={getColor()} />,
		Vehicle: <Car size={iconSize} color={getColor()} />,
		Silence: <MinusCircle size={iconSize} color={getColor()} />,
	};

	return (
		iconMap[category] || <AlertTriangle size={iconSize} color={getColor()} />
	);
};

// Create custom alert markers
const createAlertMarker = (category: string, severity: string) => {
	const icon = getAlertIcon(category, severity);

	return L.divIcon({
		html: `<div class="alert-marker alert-${severity}" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: white; border: 3px solid ${
			severity === 'critical'
				? '#ef4444'
				: severity === 'warning'
				? '#f59e0b'
				: '#3b82f6'
		}; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            ${
							category === 'Human voice'
								? '👤'
								: category === 'Human movement'
								? '🚶'
								: category === 'Human activity'
								? '🔧'
								: category === 'Animal sound'
								? '🔊'
								: category === 'Explosive sound'
								? '💥'
								: category === 'Animal distress'
								? '⚠️'
								: category === 'Animal silence'
								? '🔇'
								: category === 'Vehicle'
								? '🚗'
								: '📍'
						}
        </div>`,
		className: '',
		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -20],
	});
};

// Convert polar coordinates to lat/lng offset
const polarToOffset = (
	distance: number,
	angle: number,
	baseLat: number,
	baseLng: number
) => {
	// Convert angle to radians (angle is from North, clockwise)
	const radians = (angle * Math.PI) / 180;

	// Convert distance in meters to approximate lat/lng offset
	const latOffset = (distance * Math.cos(radians)) / 111000; // ~111km per degree
	const lngOffset =
		(distance * Math.sin(radians)) /
		(111000 * Math.cos((baseLat * Math.PI) / 180));

	return {
		lat: baseLat + latOffset,
		lng: baseLng + lngOffset,
	};
};

const MapComponent: React.FC<MapComponentProps> = ({
	sensors,
	selectedSensor,
	setSelectedSensor,
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
			center={[-49.7974965, -74.4849485]} // Centered on Parque Nacional Bernardo O'Higgins, Chile
			zoom={13}
			className='h-full w-full rounded-xl border-2 border-gray-300 z-0'
			zoomControl={false}
		>
			<ZoomControl position='bottomright' />
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{sensors.map((sensor) => {
				// Skip detection markers for inactive sensors
				if (
					!sensor.mainCategory ||
					!sensor.timestamp ||
					!sensor.radialDistance ||
					!sensor.angle
				) {
					return (
						<React.Fragment key={sensor.moduleId}>
							{/* Inactive sensor - gray dot */}
							<Marker
								position={[sensor.lat, sensor.lng]}
								icon={L.divIcon({
									html: `<div style="width: 10px; height: 10px; border-radius: 50%; background: #6b7280; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
									className: '',
									iconSize: [10, 10],
									iconAnchor: [5, 5],
								})}
							>
								<Popup>
									<div className='text-center'>
										<strong>Sensor {sensor.moduleId}</strong>
										<br />
										<span className='text-sm text-gray-600'>
											Status: Inactive
											<br />
											No recent detections
										</span>
									</div>
								</Popup>
							</Marker>
						</React.Fragment>
					);
				}

				const severity = getAlertSeverity(sensor.mainCategory, sensor.pValue!);

				// Calculate actual position from base coordinates and polar offset
				const detectionPosition = polarToOffset(
					sensor.radialDistance,
					sensor.angle,
					sensor.lat,
					sensor.lng
				);

				return (
					<React.Fragment key={`${sensor.moduleId}-${sensor.timestamp}`}>
						{/* Base sensor location - Simple green dot */}
						<Marker
							position={[sensor.lat, sensor.lng]}
							icon={L.divIcon({
								html: `<div class="sensor-pulse" style="width: 12px; height: 12px; border-radius: 50%; background: #10b981; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
								className: '',
								iconSize: [12, 12],
								iconAnchor: [6, 6],
							})}
						/>

						{/* Detection location */}
						<Marker
							position={[detectionPosition.lat, detectionPosition.lng]}
							icon={createAlertMarker(sensor.mainCategory, severity)}
							eventHandlers={{
								click: () => {
									setSelectedSensor(`${sensor.moduleId}-${sensor.timestamp}`);
								},
							}}
						>
							<Popup>
								<div className='text-center min-w-[200px]'>
									<div className='text-2xl mb-2'>
										{getAlertIcon(sensor.mainCategory, severity)}
									</div>
									<div
										className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
											severity === 'critical'
												? 'bg-red-100 text-red-800'
												: severity === 'warning'
												? 'bg-amber-100 text-amber-800'
												: 'bg-blue-100 text-blue-800'
										}`}
									>
										{severity.toUpperCase()}
									</div>
									<br />
									<strong>{sensor.mainCategory}</strong>
									<br />
									<span className='text-sm'>{sensor.subcategory}</span>
									<br />
									<span className='text-xs text-gray-600'>
										Sensor: {sensor.moduleId}
										<br />
										Time: {new Date(sensor.timestamp).toLocaleTimeString()}
										<br />
										Distance: {sensor.radialDistance}m
										<br />
										Angle: {sensor.angle}° from North
										<br />
										Confidence: {(sensor.sValue * 100).toFixed(1)}%
									</span>
									<div className='mt-2'>
										<button
											className={`text-white text-xs py-1 px-2 rounded ${
												severity === 'critical'
													? 'bg-red-500 hover:bg-red-600'
													: severity === 'warning'
													? 'bg-amber-500 hover:bg-amber-600'
													: 'bg-blue-500 hover:bg-blue-600'
											}`}
											onClick={() =>
												console.log(`Investigating alert: ${sensor.moduleId}`)
											}
										>
											Investigate
										</button>
									</div>
								</div>
							</Popup>
						</Marker>

						{/* Detection radius circle */}
						<Circle
							center={[sensor.lat, sensor.lng]}
							radius={sensor.radialDistance}
							pathOptions={{
								color:
									severity === 'critical'
										? '#ef4444'
										: severity === 'warning'
										? '#f59e0b'
										: '#3b82f6',
								fillColor:
									severity === 'critical'
										? '#ef4444'
										: severity === 'warning'
										? '#f59e0b'
										: '#3b82f6',
								fillOpacity: 0.1,
								weight: 1,
								opacity: 0.3,
							}}
						/>
					</React.Fragment>
				);
			})}
		</MapContainer>
	);
};

export default MapComponent;
