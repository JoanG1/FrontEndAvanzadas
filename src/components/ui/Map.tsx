// src/components/ui/Map.tsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../../styles/Map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdvbWV6MSIsImEiOiJjbWE0bjJiaG4wOXFsMmlxNXBwNWc0ZTN3In0.Tg7Z_jnFxx3eqR31R1g8UA';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [coordenadas, setCoordenadas] = useState<{ latitud: string; longitud: string }>({
    latitud: '',
    longitud: '',
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar el mapa
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.5, 40],
      zoom: 5,
      pitch: 30,
      bearing: -30,
      antialias: true,
    });

    // Agregar controles de navegación
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Agregar control de geolocalización
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // Agregar control de geocodificación (buscador)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      mapboxgl: mapboxgl as any,
      marker: false,
      placeholder: 'Buscar ubicación',
    });

    mapRef.current.addControl(geocoder, 'top-left');

    // Manejar resultados del geocoder
    geocoder.on('result', (e) => {
      const { center } = e.result;
      if (center && mapRef.current) {
        mapRef.current.flyTo({ center, zoom: 14 });
        agregarMarcador(center);
      }
    });

    // Manejar clics en el mapa para agregar marcadores
    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      agregarMarcador([lng, lat]);
    });

    // Agregar capa de edificios 3D al cargar el mapa
    mapRef.current.on('load', () => {
      mapRef.current?.resize();

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

  // Función para agregar o mover el marcador
  const agregarMarcador = (coords: [number, number]) => {
    const [lng, lat] = coords;

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat]);
    } else if (mapRef.current) {
      markerRef.current = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }

    setCoordenadas({
      latitud: lat.toFixed(6),
      longitud: lng.toFixed(6),
    });
  };

  // Función para manejar el clic en "Crear Reporte"
  const manejarCrearReporte = () => {
    if (coordenadas.latitud && coordenadas.longitud) {
      console.log('Coordenadas seleccionadas:', coordenadas);
      alert(`Coordenadas seleccionadas:\nLatitud: ${coordenadas.latitud}\nLongitud: ${coordenadas.longitud}`);
    } else {
      alert('Por favor, selecciona una ubicación en el mapa.');
    }
  };

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
      <div className="map-controls">
        <button onClick={manejarCrearReporte} className="map-button">
          Crear Reporte
        </button>
      </div>
    </div>
  );
};

export default Map;
