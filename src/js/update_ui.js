const base_url = "https://www.google.com/maps/place/";
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const toilet_name = document.getElementById("toilet-name");
const address = document.getElementById('address');
const address_url = document.getElementById('google_maps_url');
const location_type = document.getElementById('location-type')
const toilet_type = document.getElementById('toilet-type')
const open_now = document.getElementById('toilet-open-now');
const out_of_order = document.getElementById('toilet-out-of-order');
const times = process_time_elements(document.getElementsByClassName('times'));
const notes = document.getElementById('notes');
const notes_content = document.getElementById('notes-content');

function update_ui(data) {
    toilet_name.innerHTML = data.name;
    generate_google_maps_url(data.address);
    set_hours(data.times);
    out_of_order.classList.toggle('is-hidden', !!!+data.out_of_order);
    set_notes(data.notes.trim());
}

function process_time_elements(els) {
    const time_els = {};
    for (let i = 0; i < els.length; i++) {
        const el = els[i];
        time_els[el.dataset.time] = el;
    }

    return time_els;
}

function set_notes(info) {
    notes.classList.toggle('is-hidden', !info);
    notes_content.innerHTML = info;
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

        if (ds_hs[0].length === 1) {
            if (days.indexOf(ds_hs[0][0]) === day) {
                if (check_time(now, ds_hs[1])) return true;
            }

        } else {
            if (day >= days.indexOf(ds_hs[0][0]) && day <= days.indexOf(ds_hs[0][1])) {
                if (check_time(now, ds_hs[1])) return true;
            }
        }
    }

    return false;
}

function check_time(curr, hours) {
    const now = parseFloat(`${curr.getHours()}.${curr.getMinutes()}`);

    for (let i = 0; i < hours.length; i++) {
        const range = hours[i];
        if (now >= range[0] && now <= range[1]) return true;
    }

    return false;
}

function set_hours(time_str) {

    const days_hours = deconstruct_time_str(time_str);
    let is_open = false;

    if ((days_hours != null)) {
        is_open = currently_open(days_hours);
        set_opening_hours_ui(days_hours);
    } else {
        set_opening_hours_ui(null);
    }

    open_now.classList.toggle('is-hidden', !is_open);
}

function deconstruct_time_str(time_str) {

    if (!time_str) return null;

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

    if (str.match(/[a-zA-Z]{3}/) != null) {

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

function set_opening_hours_ui(opening_hours) {

    if(opening_hours === null) {
        for (const day in times) {
            const el = times[day];
            el.innerHTML = "desconocido";
        }

        return;
    }

    const checked_days = days.reduce((accumulator, value) => {
        return {...accumulator, [value]: ''};
    }, {});

    opening_hours.forEach(time => {
        if(time[0].length === 1) {
            const day = time[0][0];
            delete checked_days[day];
            times[day].innerHTML = hours_to_string(time[1]);
        } else {
            for (let i = days.indexOf(time[0][0]); i < days.indexOf(time[0][1]) + 1; i++) {
                delete checked_days[days[i]];
                times[days[i]].innerHTML = hours_to_string(time[1]);
            }
        }
    });

    for (const day in checked_days) {
        times[day].innerHTML = "cerrado";
    }
}

function hours_to_string(hours) {

    const hour_strs = [];
    hours.forEach(hour => {
        const formatted = [];
        hour.forEach(mins => {
            formatted.push(mins.toFixed(2));
        });
        hour_strs.push(formatted.join('-'));
    });

    return hour_strs.join('&nbsp;&nbsp;y&nbsp;&nbsp;').replaceAll('.', ':');
}