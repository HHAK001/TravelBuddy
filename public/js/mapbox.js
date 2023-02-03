mapboxgl.accessToken = 'pk.eyJ1IjoiaGhhazAwIiwiYSI6ImNsOXZvNmh4eTF4eWgzb3RmdnhnMnY0cjcifQ.gqRGVTyuQShcVyUrkYn_tw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hhak00/clctplyat002n15l6qlvbw40k',
  center: [4, 45],
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
        coordinates: [13.404954, 52.520008]
      },
      properties: {
        title: 'Berlin',
        description: 'Germany',
        link:'/berlin' 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-3.703790, 40.416775]
      },
      properties: {
        title: 'Madrid',
        description: 'Spain',
        link:'/madrid' 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [16.373819, 48.208176]
      },
      properties: {
        title: 'Wien',
        description: 'Austria',
        link:'/wien' 
      }
    },
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
