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

function currently_open(days_hours) {
    const now = new Date();
    const day = now.getDay() - 1;
    for (let i = 0; i < days_hours.length; i++) {
        const ds_hs = days_hours[i];
        if(ds_hs[0].length === 1) {
            if(days.indexOf(ds_hs[0][0]) === day) {
                
            }
        } else {

        }
    }

    const hour = now.getHours();
    const minute = now.getMinutes();

    return false;
}

function set_hours(time_str) {
    const days_hours = deconstruct_time_str(time_str);
    console.log(days_hours);
    let is_open = (days_hours != null) ? currently_open(days_hours) : false;
    console.log(is_open);
}

function deconstruct_time_str(time_str) {

    if(!time_str) return null;

    time_str = time_str.toLowerCase().replaceAll(':', '.');
    const time_strs = time_str.split(',');

    if (time_strs.length === 0) { 
        return null; 
    } else {
        const openings_hours = [];
        time_strs.forEach(str => {
            openings_hours.push(time_str_times_array(str));
        });
        return openings_hours;
    }
}

function time_str_times_array(str) {

    if( str.match(/[a-zA-Z]{3}/) != null) {

        const days_hours = str.split(';');
        days_hours[0] = days_hours[0].split('-');
        days_hours[1] = days_hours[1].split('&');
        days_hours[1] = hours_strs_to_floats(days_hours[1]);
        
        return days_hours;

    } else {
        return [
            ['mon', 'sun'], 
            hours_strs_to_floats(str.split('&'))
        ];
    }
    
}

function hours_strs_to_floats(hour_strs) {
    
    for (let i = 0; i < hour_strs.length; i++) {
        const raw_hours = hour_strs[i];
        hour_strs[i] = raw_hours.split('-');

        for (let j = 0; j < hour_strs[i].length; j++) {
            const hours = hour_strs[i][j];
            hour_strs[i][j] = parseFloat(hours);
        }
    }

    return hour_strs;
}

function get_days(hours, start, end) {

    for (let i = days.indexOf(start); i < days.indexOf(end) + 1; i++) {
        const day = { day: days[i], times: hours.join(' and ') };
        open_days.push(day);
    }

    return open_days;
}