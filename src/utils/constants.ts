const constants = {
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
  baseApiUrl: import.meta.env.VITE_API_BASE_URL,
  getRoutesUrl: `${import.meta.env.VITE_API_BASE_URL}/all-routes`,
  addLocationUrl: `${import.meta.env.VITE_API_BASE_URL}/locations`,
  getRouteLocationsUrl: `${import.meta.env.VITE_API_BASE_URL}/route-locations`
}

export default constants;
