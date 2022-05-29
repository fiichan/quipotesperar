const base_url = "https://www.google.com/maps/place/";
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const toilet_name = document.getElementById("toilet-name");
const address = document.getElementById('address');
const address_url = document.getElementById('google_maps_url')
const location_type = document.getElementById('location-type');
const toilet_type = document.getElementById('toilet-type');
const open_now = document.getElementById('toilet-open-now');
const out_of_order = document.getElementById('toilet-out-of-order')
const times = document.getElementsByClassName('times');
const notes = document.getElementById('notes');

function update_ui(data) {
    toilet_name.innerHTML = data.name;
    generate_google_maps_url(data.address);
    set_hours(data.times);
}

function generate_google_maps_url(address_str) {
    const google_url = base_url + address_str.replaceAll(' ', '+');

    const index = address_str.lastIndexOf(' ');
    if (index < address_str.length - 1) {
        address_str = address_str.substring(0, index) + ', ' + address_str.substring(index + 1);
    }

    address.innerHTML = address_str;
    address_url.setAttribute('href', google_url);
}

function currently_open(hours) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
}

function set_hours(time_str) {
    const days_hours = deconstruct_time_str(time_str);
    currently_open(hours);
}

function deconstruct_time_str(time_str) {

    if(!time_str) return [];

    const time_strs = time_str.split(',');

    if (time_strs.length === 0) { return [] }
    else {
        let total_open_days = [];
        time_strs.forEach(str => {
            total_open_days = total_open_days.concat(time_str_to_days(str));
        });
        return total_open_days;
    }
}

function time_str_to_days(str) {
    if (str.match(/^[0-9]*/) > 0) return get_days([str.replace('-', ' - ')], 'mon', 'sun');
}

function get_days(hours, start, end) {

    if (end === undefined) {
        return [{ day: start, times: hours.join(' and ') }];
    }

    const open_days = [];
    for (let i = days.indexOf(start); i < days.indexOf(end) + 1; i++) {
        const day = { day: days[i], times: hours.join(' and ') };
        open_days.push(day);
    }

    return open_days;
}