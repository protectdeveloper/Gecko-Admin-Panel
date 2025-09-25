'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';

interface MapComponentProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
  tolerance: number;
  onToleranceChange: (tolerance: number) => void;
}

const icon = L.icon({
  iconUrl: '/assets/img/marker-icon.png',
  iconRetinaUrl: '/assets/img/marker-icon-2x.png',
  shadowUrl: '/assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapEvents = ({
  setPosition,
  onToleranceChange
}: {
  setPosition: (position: [number, number]) => void;
  onToleranceChange: (tolerance: number) => void;
}) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
    zoomend: (e) => {
      const map = e.target;
      const zoom = map.getZoom();
      // Zoom seviyesine göre tolerans değerini güncelle
      const newTolerance = Math.max(1, Math.min(300, Math.floor(zoom * 2)));
      onToleranceChange(newTolerance);
    }
  });
  return null;
};

const MapComponent = ({ position, onPositionChange, tolerance, onToleranceChange }: MapComponentProps) => {
  const { t } = useTranslation();

  const getRadiusInMeters = (toleranceValue: number) => {
    return toleranceValue * 10;
  };

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents setPosition={onPositionChange} onToleranceChange={onToleranceChange} />
      <Marker position={position} icon={icon}>
        <Popup>
          {t('devices.selectedLocation')}: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </Popup>
      </Marker>
      <Circle
        center={position}
        radius={getRadiusInMeters(tolerance)}
        pathOptions={{
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.2,
          weight: 2
        }}
      />
    </MapContainer>
  );
};

export default MapComponent;
