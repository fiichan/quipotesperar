const options = document.getElementsByClassName("filter");
const filters = {};

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