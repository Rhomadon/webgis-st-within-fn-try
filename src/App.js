import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet'
import Within from './components/Within';

function App() {

  const center = [-6.233628818303135, 106.82149988475815]

  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom={true} minZoom={2}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Within/>
    </MapContainer>
  )
}

export default App;
