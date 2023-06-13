// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];
  
  // TODO: add your own access token
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0b21hdGljNTAwMCIsImEiOiJjbGc4eGxqZTkwNDZzM3NwN3M0enNnaThqIn0.V2i8pBwmr3lKXpe_34Zh7Q';
  
  // This is the map instance
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });
  
  
  // TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
  // Create a new marker.
  const marker = new mapboxgl.Marker()
  .setLngLat(busStops[0])
  .addTo(map);
  // counter here represents the index of the current bus stop
  let counter = 0;

  map.on('load', function () {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
    // Attach click event to button
    document.getElementById('startBtn').addEventListener('click', move);
});



  /*function move() {
    // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
    // Use counter to access bus stops in the array busStops
    // Make sure you call move() after you increment the counter.
    counter+=1;
    setTimeout(move,1000)
    marker.setLngLat(busStops[counter]);
  }*/

  function move() {
    if (!marker) {
        marker = new mapboxgl.Marker()
        .setLngLat(busStops[0])
        .addTo(map);
    } else {
        if (counter >= busStops.length - 1) return;
        counter++;
        marker.setLngLat(busStops[counter]);

        const routeSource = map.getSource('route');
        const coordinates = routeSource._data.geometry.coordinates;
        coordinates.push(busStops[counter]);
        routeSource.setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
            }
        });

        setTimeout(move, 1000);
    }
}





