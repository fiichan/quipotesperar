// custom icon for map markers.
const toilet_icon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
let markers = null;

// create map instance and add base layer from carto
const map = L.map('map').setView([41.389596925956106, 2.1655470275217112], 13);
const basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// get toilets from databse, on request complete add default filtered toilets to map.
get_toilets((data) => {
    markers = generate_markers(data);
    filter_toilets(markers, {
        category: null
    });
});

// on marker click
function on_marker_click(e) {
    const index = get_marker_index(e);
}

// generate marker object
function generate_markers(data) {
    const toilets = [];
    for (let i = 0; i < data.length; i++) {
        const di = data[i];
        toilets.push({
            ...di,
            visible: false,
            index: i,
            marker: generate_map_marker(di.lat, di.lon, i)
        });
    }
    return toilets;
}

// generate actual map marker
function generate_map_marker(lat, lon, index) {
    const m = L.marker([lat, lon], {
        index: index
    }).on("click", on_marker_click);

    return m;
}

// add toilet markers to map based on selected filter parameters
function filter_toilets(toilets, filter) {

    for (let i = 0; i < toilets.length; i++) {
        const t = toilets[i];
        let skip = false;
        
        for (const [key, value] of Object.entries(filter)) {
            const make_visible = t[key] == value ? true : false;
            
            if(!make_visible) {
                toggle_marker(t, false);
                skip = true;
            }
        }

        if(skip) continue;
        toggle_marker(t, true);
    }
}

// function to check if marker needs to add removed or left as is. 
function toggle_marker(toilet, make_visible) {
    if(toilet.visible && make_visible) {
        return;
    } else if(toilet.visible && make_visible == false) {
        toilet.visible = false;
        map.removeLayer(toilet.marker);
    } else if(toilet.visible == false && make_visible) {
        toilet.visible = true;
        toilet.marker.addTo(map);
    } else {
        return;
    }
}


// helper function to get marker index. 
function get_marker_index(marker_event) {
    return marker_event.target.options.index;
}

