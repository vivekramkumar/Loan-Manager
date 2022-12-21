import React, { useReducer, useContext } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import LoadingContext from '../loading/loadingContext';
import MessageContext from '../message/messageContext';
import axios from 'axios';
import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_AUTH,
} from '../types';
import { baseURL } from '../baseUrl';


const AuthState = props => {
  const loadingContext = useContext(LoadingContext);
  const { showLoading, hideLoading } = loadingContext;

  const messageContext = useContext(MessageContext);
  //const { showSuccessMsg, showErrorMsg } = messageContext;
  const { showInfoMsg, showErrorMsg } = messageContext;

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    userType:null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register User
  const register = async formData => {
    showLoading();
    let isSuccess = false;
    try {
      await axios.post(baseURL + '/api/register', formData);
      isSuccess = true;

    } catch (err) {
      showErrorMsg(REGISTER_FAIL, err);
      dispatch({
        type: REGISTER_FAIL
      });
      showInfoMsg("Register Unsuccessfull");

    }

    hideLoading();
    return isSuccess;
  };

// Login Admin
const adminLogin = async (formData, rememberMe) => {
  showLoading()

  try {
    console.log("form data######"+(formData));
    const res = await axios.post(baseURL + '/api/adminLogin', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      rememberMe
    });

    showInfoMsg("Admin Logged in Successfully");

  } catch (err) {

    showErrorMsg(LOGIN_FAIL, err);
    dispatch({
      type: LOGIN_FAIL
    });
    showInfoMsg("Login Unsuccessfull");
  }

  hideLoading();
};



  // Login User
  const userLogin = async (formData, rememberMe) => {
    showLoading()

    try {
      console.log("form data######"+formData);
      const res = await axios.post(baseURL + '/api/userLogin', formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        rememberMe
      });

      showInfoMsg(" User Logged in Successfully");

    } catch (err) {

      showErrorMsg(LOGIN_FAIL, err);
      dispatch({
        type: LOGIN_FAIL
      });
      showInfoMsg("Login Unsuccessfull");

    }

    hideLoading();
  };


  const setAuthentication = () => {
    if (!localStorage.getItem('token'))
      return;

    setAuthToken(localStorage.token);
    dispatch({
      type: SET_AUTH
    })

  }

  

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        register,
        adminLogin,
        userLogin,
        setAuthentication,
        logout,      
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
