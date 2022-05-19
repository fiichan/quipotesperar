// get toilets from our database. 
function get_toilets(callback) {
    fetch('server/get_toilets.php')
        .then(response => response.json())
        .then(data => {
            if (callback) callback(data);
        });
}

// update toilets information in databse
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