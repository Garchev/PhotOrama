const databaseUrl = 'https://photobase-ac586-default-rtdb.europe-west1.firebasedatabase.app';

export function host(url) {
    
    return databaseUrl + '/' + url + '.json'
}

export async function request(url, method, body) {
    let options = {
        method
    };

    if (body) {
        Object.assign(options, {
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);
    

    let data = await response.json();

    if(data && data.hasOwnProperty('error')) {
        console.log(data)
        const message = data.error.message;
        throw new Error(message);
    }

    return data;
}