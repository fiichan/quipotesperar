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
const category = document.getElementById('category')
const sub_category = document.getElementById('sub-category')
const open_now = document.getElementById('toilet-open-now');
const out_of_order = document.getElementById('toilet-out-of-order');
const times = process_time_elements(document.getElementsByClassName('times'));
const notes = document.getElementById('notes');
const notes_content = document.getElementById('notes-content');

const price_free = document.getElementById('price_free_tag');
const price_x = document.getElementById('price_x_tag');
const wheelchair = document.getElementById('wheelchair_tag');

const at_ground_lvl =  document.getElementById('at_ground_lvl_tag');
const has_handdryer =  document.getElementById('has_handdryer_tag');
const has_soap_dispenser =  document.getElementById('has_soap_dispenser_tag');
const has_sink =  document.getElementById('has_sink_tag');
const has_urinal = document.getElementById('has_urinal_tag');
const has_sink_in_cabin = document.getElementById('has_sink_in_cabin_tag');
const has_baby = document.getElementById('has_baby_changer_tag');
const has_lock = document.getElementById('has_lock_tag');
const male_female = document.getElementById('female_male_tag');
const unisex = document.getElementById('unisex_tag');

function update_ui(data) {

    console.log(data.category, data.sub_category);

    toilet_name.innerHTML = data.name;
    
    generate_google_maps_url(data.address);
    set_hours(data.times);
    set_gender(!!+data.gender);
    set_price(data.price);

    open_now.classList.toggle('is-hidden', !data.open_now);
    out_of_order.classList.toggle('is-hidden', !!!+data.out_of_order);
    at_ground_lvl.classList.toggle('is-hidden', !!!+data.is_accessible);
    has_handdryer.classList.toggle('is-hidden', !!!+data.has_hand_dryer);
    has_soap_dispenser.classList.toggle('is-hidden', !!!+data.has_soap_dispenser);
    has_sink.classList.toggle('is-hidden', !!!+data.has_sink);
    has_urinal.classList.toggle('is-hidden', !!!+data.has_urinal);
    has_sink_in_cabin.classList.toggle('is-hidden', !!!+data.has_sink_in_cabin);
    has_baby.classList.toggle('is-hidden', !!!+data.has_baby_changer);
    has_lock.classList.toggle('is-hidden', !!!+data.has_lock);

    const reduced_mobility_ok = (!!+data.has_standup_aid && !!+data.has_handicapped_toilet && !!+data.is_accessible) ? true : false;
    wheelchair.classList.toggle('is-hidden', !reduced_mobility_ok);
    
    if(data.notes) set_notes(data.notes.trim());
    if(data.category) category.innerHTML = data.category;
    if(data.sub_category) sub_category.innerHTML = data.sub_category;

    new TimelineMax()
        .to(info_panel, 0.5, {width: 'calc(100% - 20px)', height: 'auto', padding: 20})
        .set(info_panel, {overflowY: 'scroll', overflowX: 'hidden'});
}

function set_gender(gender) {
    male_female.classList.toggle('is-hidden', !gender);
    unisex.classList.toggle('is-hidden', gender);
}

function set_price(amount) {
    const free = amount === 0 ? true : false;
    price_free.classList.toggle('is-hidden', !free);
    price_x.classList.toggle('is-hidden', free);
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