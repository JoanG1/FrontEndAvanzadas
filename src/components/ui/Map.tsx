// src/components/ui/Map.tsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // Libreria MapBox
import 'mapbox-gl/dist/mapbox-gl.css'; //Estilos del Mapa
import '../../styles/Map.css'; // 👈 Estilos del componente Mapa


//Token de acceso publico
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
			center: [-74.5, 40],
			zoom: 9,
		});

		return () => map.remove();
	}, [isMounted]);

	return (
		<div
			ref={mapContainer}
			className="map-container"
		/>
	);
};

export default Map;
