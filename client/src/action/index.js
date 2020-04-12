import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (surveyValues, history) => async dispatch => {
    console.log(history);
    const res = await axios.post('/api/survey', surveyValues);
    console.log(res);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys')
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};