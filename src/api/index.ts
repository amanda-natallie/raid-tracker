import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://raidtracker-9f0c.restdb.io/rest/',
    headers: {
        'Content-type': 'application/json',
        'x-apikey': '617e25d663fbb2763ab02499',
        'Cache-Control': 'no-cache',
    },
});
