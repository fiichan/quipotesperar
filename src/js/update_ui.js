const base_url = "https://www.google.com/maps/place/";
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const filter_panel = document.getElementById('filters-panel');
const filter_toggle = document.getElementById('filters-toggle');
let filter_panel_open = false;

const info_panel = document.getElementById('information-panel');
const close_info = document.getElementById('close-info-panel');

gsap.set(info_panel, {width:  0, height: 0, padding: 0});
gsap.set(filter_panel, {width: 150, height: 80});

filter_toggle.addEventListener("click", () => {

    console.log(filter_panel_open);
    if(filter_panel_open) {
        new TimelineMax()
            .to(filter_panel, 0.5, {width:  150, height: 80})
            .add(() => {
                filter_panel_open =! filter_panel_open;
            });
    } else {
        new TimelineMax()
            .to(filter_panel, 0.5, {width: 'calc(100% - 20px)', height: 'auto'})
            .add(() => {
                filter_panel_open =! filter_panel_open;
            });
    }
});

close_info.addEventListener("click", () => {
    new TimelineMax()
        .set(info_panel, {overflow: 'hidden'})
        .to(info_panel, 0.5, {width:  0, height: 0, padding: 0});
});

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
    open_now.classList.toggle('is-hidden', !data.open_now);
    out_of_order.classList.toggle('is-hidden', !!!+data.out_of_order);
    
    if(data.notes) set_notes(data.notes.trim());

    new TimelineMax()
        .to(info_panel, 0.5, {width: 'calc(100% - 20px)', height: 'auto', padding: 20})
        .set(info_panel, {overflowY: 'scroll', overflowX: 'hidden'});
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