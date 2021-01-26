import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';


const handleStripeToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

const submitSurvey = (surveyValues, history) => async dispatch => {
    const res = await axios.post('/api/survey', surveyValues);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys')
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export default {
    handleStripeToken,
    fetchSurveys,
    submitSurvey
}
