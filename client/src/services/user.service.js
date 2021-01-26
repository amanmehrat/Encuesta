import axios from '../utils/Axios';

const fetchuser = async () => {
    try {
        const res = await axios.get('/fetchuser')
        return Promise.resolve(res.data);
    } catch (ex) {
        return Promise.reject(ex.response?.data?.error);
    }
}
const register = async (user) => {
    try {
        const res = await axios.post('/register', user)
        return Promise.resolve(res.data);
    } catch (ex) {
        return Promise.reject(ex.response?.data?.error);
    }
}
const login = async (email, password) => {
    try {
        const res = await axios.post('/login', { email, password })
        return Promise.resolve(res.data);
    } catch (ex) {
        return Promise.reject(ex.response?.data?.error);
    }
}
export const userService = {
    register,
    login,
    fetchuser
};
