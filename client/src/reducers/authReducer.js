import { CLEAR_USER, SET_USER, AUTH_ERROR } from '../action/types';

const initialState = {
  isLoggedIn: null,
  user: null,
  error: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload
      }
    case CLEAR_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null
      }
    default:
      return state;
  }
}
