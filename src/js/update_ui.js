const base_url = "https://www.google.com/maps/place/";

const toilet_name = document.getElementById("toilet-name");
const address = document.getElementById('address');
const address_url = document.getElementById('google_maps_url')
// const toilet_type = document.getElementById();
// const sub_category = document.getElementById();
// const notes = document.getElementById();

function update_ui(data) {
    toilet_name.innerHTML = data.name;
    generate_google_maps_url(data.address);
}

function generate_google_maps_url(address_str) {
    const google_url = base_url + address_str.replaceAll(' ', '+');
    address.innerHTML = address_str;
    address_url.setAttribute('href', google_url);
}

function currently_open(time_str, curr_time) {
    
}

function set_hours(time_str) {
    
}

function generate_hours_object(time_str) {
    
}