import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/Map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdvbWV6MSIsImEiOiJjbWE0bjJiaG4wOXFsMmlxNXBwNWc0ZTN3In0.Tg7Z_jnFxx3eqR31R1g8UA';

const Map: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current) return;

		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [-74.5, 40],
			zoom: 5,
			pitch: 30,
			bearing: -30,
			antialias: true,
		});

		mapRef.current.addControl(new mapboxgl.NavigationControl());

		mapRef.current.on('load', () => {
			mapRef.current?.resize(); // ✅ fuerza redimensionamiento

			mapRef.current?.addLayer({
				id: '3d-buildings',
				source: 'composite',
				'source-layer': 'building',
				filter: ['==', 'extrude', 'true'],
				type: 'fill-extrusion',
				minzoom: 15,
				paint: {
					'fill-extrusion-color': '#aaa',
					'fill-extrusion-height': ['get', 'height'],
					'fill-extrusion-base': ['get', 'min_height'],
					'fill-extrusion-opacity': 0.6,
				},
			});
		});

		return () => {
			mapRef.current?.remove();
		};
	}, []);

	return <div ref={mapContainer} className="map-container" />;
};

export default Map;
