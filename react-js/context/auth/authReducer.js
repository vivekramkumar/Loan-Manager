import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_AUTH,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';



export default (state, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS:
      if (action.rememberMe) {
        localStorage.setItem('token', action.payload.token);
      }
      setAuthToken(action.payload.token);
      console.log("******* usertype "+action.payload.userType);
      console.log("******* token "+action.payload.token);
     
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
