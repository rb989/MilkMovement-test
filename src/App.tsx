import { useState, useEffect, useMemo, useRef } from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import type {CircleLayer} from 'react-map-gl';

import constants from './utils/constants';
import 'mapbox-gl/dist/mapbox-gl.css';

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#f82c1f'
  },
  source: ''
};

function App() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [routes, setRoutes] = useState([]);
  const [coords, setCoords] = useState([]);

  const mapRef = useRef(null);

  const geojson = useMemo(() => {
    const features = coords.map((coord) => ({type: 'Feature', geometry: {type: 'Point', coordinates: coord}, properties: null}));
    return {
      type: 'FeatureCollection',
      features: features
    };
  }, [coords]);

  const handleRouteSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = event.target.value;
    setSelectedRoute(routeId)
  }

  useEffect(() => {
    fetch(constants.baseApiUrl)
      .then(response => response.json())
      .then(data => {
        setRoutes(data);
        if (data.length)
          setSelectedRoute(data[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedRoute)
      fetch(`${constants.baseApiUrl}/${selectedRoute}`)
      .then(response => response.json())
      .then(data => {
        setCoords(data)
      });
  }, [selectedRoute])

  useEffect(() => {
    if (coords.length) {
      const leftTop = [coords[0][0], coords[0][1]]
      const rightBottom = [coords[0][0], coords[0][1]]

      coords.forEach(item => {
        if (leftTop[0] > item[0]) leftTop[0] = item[0]
        if (leftTop[1] > item[1]) leftTop[1] = item[1]
        if (rightBottom[0] < item[0]) rightBottom[0] = item[0]
        if (rightBottom[1] < item[1]) rightBottom[1] = item[1]
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapRef.current! as any).fitBounds([leftTop, rightBottom]);
    }
  }, [coords])

  return (
    <div className="w-full h-screen p-10">
      <div className="text-lg text-center pb-4">
        <label className="mr-4">Route Session IDs: </label>
        <select className="border rounded p-1" onChange={handleRouteSelect}>
          {
            routes.map((route, index) => (
              <option key={index} value={route}>{route}</option>
            ))
          }
        </select>
      </div>
      <Map
        ref={mapRef}
        mapboxAccessToken={constants.mapboxToken}
        initialViewState={{
          longitude: -74.5,
          latitude: 40,
          zoom: 9
        }}
        style={{width: '100%', height: '90%'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  )
}

export default App
