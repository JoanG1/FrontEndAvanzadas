import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../../styles/Map.css';
import { useNavigate } from "react-router-dom";


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdvbWV6MSIsImEiOiJjbWE0bjJiaG4wOXFsMmlxNXBwNWc0ZTN3In0.Tg7Z_jnFxx3eqR31R1g8UA';

const Map: React.FC = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const [coordenadas, setCoordenadas] = useState<{
    latitud: number;
    longitud: number;
    direccion?: string;
  }>({
    latitud: 0,
    longitud: 0,
    direccion: '',
  });


  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.5, 40],
      zoom: 5,
      pitch: 30,
      bearing: -30,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      mapboxgl: mapboxgl as any,
      marker: false,
      placeholder: 'Buscar ubicación',
    });

    geocoderRef.current = geocoder;
    map.addControl(geocoder, 'top-left');

    geocoder.on('result', (e) => {
      const { center } = e.result;
      if (center && mapRef.current) {
        map.flyTo({ center, zoom: 14 });
        agregarMarcador(center);
      }
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      agregarMarcador([lng, lat]);
      reverseGeocodeAndUpdateGeocoder(lng, lat);
    });

    map.on('load', () => {
      map.resize();
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

    return () => {
      map.remove();
    };
  }, []);

  const agregarMarcador = ([lng, lat]: [number, number]) => {
    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat]);
    } else if (mapRef.current) {
      markerRef.current = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }

    setCoordenadas({
      latitud: lat,
      longitud: lng,
    });
  };

  const reverseGeocodeAndUpdateGeocoder = async (lng: number, lat: number) => {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const placeName = data.features[0].place_name;
        geocoderRef.current?.setInput(placeName);
        console.log(placeName)
        setCoordenadas((prev) => ({
          ...prev,
          direccion: placeName,
        }));
      }
    } catch (error) {
      console.error('Error en la geocodificación inversa', error);
    }
  };

  const manejarCrearReporte = () => {
    const { latitud, longitud, direccion } = coordenadas;

    if (latitud && longitud) {
      const reporte = {
        latitud,
        longitud,
        direccion: direccion || "Desconocida"
      };

      console.log('📍 Reporte generado:', reporte);

      navigate("/nuevo-reporte", {
        state: {
          location: reporte.direccion,
          latitud: reporte.latitud,
          longitud: reporte.longitud
        }
      });
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
