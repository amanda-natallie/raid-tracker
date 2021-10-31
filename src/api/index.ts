import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://femsapi-7ae0.restdb.io/rest/',
    headers: {
        'Content-type': 'application/json',
        'x-apikey': '617a26be63fbb2763ab023a3',
        'Cache-Control': 'no-cache',
    },
});
