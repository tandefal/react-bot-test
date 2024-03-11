import {TYPE_USER} from "../types.js";


function builderData(data, obj) {
    Object.entries(data).forEach(([key, value]) => {
        obj.append(key, value);
    });
    return obj;
}

export async function http(url = '', method = 'GET', data = null, token = null) {

    const isGetRequest = method.toUpperCase() === 'GET';
    let headers = {};
    if(token) {
        headers = {"Authorization": `Bearer ${token}`};
    }

    let options = {
        method: method.toUpperCase(),
        mode: 'cors',
        cache: 'no-cache',
        headers: {'accept': 'application/json', ...headers}
    };

    if (isGetRequest && data) {
        url += '?' + builderData(data, new URLSearchParams());
    } else if(data){
        options.body = builderData(data, new FormData());
    }
    try {
        const response = await fetch(`https://api.monopolize.ru/${url}`, options);
        const data = await response.json();
        if(data.code === 401) {
           window.localStorage.removeItem(TYPE_USER);
           window.location.reload();
        }

        if(!response.ok && data.message) {
           throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}