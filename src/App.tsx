import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  return (
    <div className="w-full h-screen">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  )
}

export default App
