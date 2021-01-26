import { SET_USER, AUTH_ERROR, CLEAR_USER } from './types';
import { history } from '../utils/History';
import { userService } from '../services/user.service';

const FetchUser = () => async dispatch => {
    userService.fetchuser()
        .then(data => {
            localStorage.setItem("auth-token", data.token);
            dispatch({ type: SET_USER, payload: data.user });
        })
        .catch(error => {
            dispatch({ type: CLEAR_USER });
        })
};

const RegisterUser = (user) => async dispatch => {
    userService.register(user)
        .then(data => {
            localStorage.setItem("auth-token", data.token);
            history.push('/');
            dispatch({ type: SET_USER, payload: data.user });
        })
        .catch(error => {
            dispatch({ type: AUTH_ERROR, payload: error });
        })
};
const LoginUser = (email, password) => async dispatch => {
    userService.login(email, password)
        .then(data => {
            localStorage.setItem("auth-token", data.token);
            history.push('/');
            dispatch({ type: SET_USER, payload: data.user });
        })
        .catch(error => {
            dispatch({ type: AUTH_ERROR, payload: error });
        })
};
const LogoutUser = () => async dispatch => {
    localStorage.removeItem("auth-token");
    dispatch({ type: CLEAR_USER });
    history.push('/');
}

export default {
    FetchUser,
    RegisterUser,
    LoginUser,
    LogoutUser
}
