const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmd0bWsiLCJhIjoiY2s0MnJ2cW42MDBieDNtcGMxM29oYW96bCJ9.rvXlhI3h_o8GJcwn4DBGKg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/khangtmk/ck6ahyfpq370b1is4uchyret3',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
        .setLngLat(loc.coordinates)
        .addTo(map);

    // Adding popup
    new mapboxgl.Popup({
        offset: 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});
