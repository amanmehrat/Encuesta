// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'http://localhost:5000/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
if (localStorage.getItem('auth-token'))
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth-token')}`;

// Also add/ configure interceptors && all the other cool stuff

//instance.interceptors.request...

export default instance;