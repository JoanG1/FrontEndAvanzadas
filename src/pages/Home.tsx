// src/pages/Home.tsx
import React from 'react';
import Map from '../components/ui/Map';//TRAEMOS COMPONENTE A RENDERIZAR

const Home: React.FC = () => {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Mapa con Mapbox</h1>
			<Map />
		</div>
	);
};

export default Home;
