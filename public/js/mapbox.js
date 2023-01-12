mapboxgl.accessToken = 'pk.eyJ1IjoiaGhhazAwIiwiYSI6ImNsOXZvNmh4eTF4eWgzb3RmdnhnMnY0cjcifQ.gqRGVTyuQShcVyUrkYn_tw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8],
  zoom: 3
});

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.352, 48.856]
      },
      properties: {
        title: "Paris" ,
        description: 'France',
        link:'/paris'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California',
        link:'/sanfrancisco' 
      }
    }
  ]
};

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3><a href="${feature.properties.link}">${feature.properties.description}</a>`
      )
  )
  .addTo(map);
}
