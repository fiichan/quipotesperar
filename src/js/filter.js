const options = document.getElementsByClassName("filter");

const free = document.getElementById('filter-free');
const handicap = document.getElementById('filter-handicapfriendly');
const menstruating = document.getElementById('filter-menstruatingfriendly');
const family = document.getElementById('filter-familyfriendly');

// set default filters here.
const filters = {
    price: 0,
    open_now: true
};

setTimeout(() => {
    filter_toilets(markers, filters);    
}, 500);

free.addEventListener("click", (e) => {
    if(e.currentTarget.checked) {
        filters['price'] = 0;
    } else {
        delete filters['price'];
    }

    filter_toilets(markers, filters);
});

handicap.addEventListener("click", (e) => {
    if(e.currentTarget.checked) {
        filters['has_standup_aid'] = 1;
        filters['has_handicapped_toilet'] = 1;
        filters['is_accessible'] = 1;
    } else {
        delete filters['has_standup_aid'];
        delete filters['has_handicapped_toilet'];
        delete filters['is_accessible'];
    }

    filter_toilets(markers, filters);
});

menstruating.addEventListener("click", (e) => {
    if(e.currentTarget.checked) {
        filters['has_sanitary_bin'] = 1;
        filters['has_sink_in_cabin'] = 1;
    } else {
        delete filters['has_sanitary_bin'];
        delete filters['has_sink_in_cabin'];
    }

    filter_toilets(markers, filters);
});

family.addEventListener("click", (e) => {
    if(e.currentTarget.checked) {
        filters['has_baby_changer'] = 1;
        filters['is_accessible'] = 1;
        filters['has_hand_dryer'] = 1;
        filters['has_sanitary_bin'] = 1;
    } else {
        delete filters['has_baby_changer'];
        delete filters['is_accessible'];
        delete filters['has_hand_dryer'];
        delete filters['has_sanitary_bin'];
    }

    filter_toilets(markers, filters);
});

for (let j = 0; j < options.length; j++) {
    const o = options[j];
    o.addEventListener("change", (e) => {
        const filter = e.target.name;
        
        if(e.currentTarget.checked) {
            filters[filter] = 1;
        } else {
            delete filters[filter];
        }

        filter_toilets(markers, filters);
    });
}