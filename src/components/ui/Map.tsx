import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // Librería Mapbox
import 'mapbox-gl/dist/mapbox-gl.css'; // Estilos por defecto de Mapbox
import '../../styles/Map.css'; // Estilos personalizados del mapa

// Token de acceso público de Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdvbWV6MSIsImEiOiJjbWE0bjJiaG4wOXFsMmlxNXBwNWc0ZTN3In0.Tg7Z_jnFxx3eqR31R1g8UA';

const Map: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted || !mapContainer.current) return;

		const containerHeight = mapContainer.current.offsetHeight;
		if (containerHeight === 0) return;

		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [-74.5, 40], // Coordenadas iniciales (NYC)
			zoom: 15,
			pitch: 30, // 🎯 Inclinación de la cámara para vista 3D
			bearing: -30, // 🎯 Rotación de la cámara
			antialias: true, // Mejora visual
		});

		// Agrega controles de navegación (zoom, rotación)
		map.addControl(new mapboxgl.NavigationControl());

		map.on('load', () => {
			// Agrega capa de edificios en 3D
			map.addLayer({
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

		return () => map.remove();
	}, [isMounted]);

	return <div ref={mapContainer} className="map-container" />;
};

export default Map;
