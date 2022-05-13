// custom icon for map markers.
const toilet_icon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// create map instance and add base layer from carto
const map = L.map('map').setView([51.505, -0.09], 13);
const basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


// on marker click
function on_marker_click(e) {
    const index = get_marker_id(e);
}

// add toilet markers to map
function map_add_toilets(toilets) {
    for(let i = 0; i < toilets.length; i++) {
        const t = toilets[i];
        const m = L.marker([t.lat, t.lon], {
            id: i
        });
        m.on("click", on_marker_click);
        m.addTo(map);
    }
}

// helper function to get marker id. 
function get_marker_id(marker_event) {
    return marker_event.target.options.id;
}

// get toilets from our database. 
function get_toilets(callback) {
    fetch('http://example.com/movies.json') // change url to correct one.
        .then(response => response.json())
        .then(data => {
            if(callback) callback(data);
        });
}

async function update_toilet(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });

    return response.json(); 
}