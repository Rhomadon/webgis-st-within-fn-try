import './App.css';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import LiquiditySell from './components/LiquiditySell';
import LiquidityRent from './components/LiquidityRent';
import PropertySell from './components/PropertySell';
import PropertyRent from './components/PropertyRent';
import PolygonMonas from './components/PolygonMonas';

function App() {

  const center = [-6.233628818303135, 106.82149988475815]

  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom={true} minZoom={2}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LiquiditySell />
        <LiquidityRent />
        <PropertySell />
        <PropertyRent />
      </LayersControl>
      <PolygonMonas />
    </MapContainer>
  )
}

export default App;
