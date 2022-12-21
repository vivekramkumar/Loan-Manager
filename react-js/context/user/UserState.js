import React, { useReducer, useContext } from 'react';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import LoadingContext from '../loading/loadingContext';
import MessageContext from '../message/messageContext';
import axios from 'axios';
import {
  GET_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  CLEAR_USERS,
  ADD_USER,
  DELETE_USER,
  HIDE_MODAL,
  SHOW_MODAL,
  ERROR_GET_USERS,
  ERROR_ADD_USER,
  ERROR_DELETE_USER,
  ERROR_UPDATE_USER
} from '../adminTypes';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { baseURL } from '../baseUrl';

const UserState = props => {
  const loadingContext = useContext(LoadingContext);
  const { showLoading, hideLoading } = loadingContext;

  const messageContext = useContext(MessageContext);
  const { showInfoMsg, showErrorMsg } = messageContext;

  const initialState = {
    users: [],
    current: null,
    isModalShowing: false
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get All Users
  const getAllUsers = async () => {
    showLoading();

    try {
      //console.log("inside userstate.getAllUsers")
      const res = await axios.get(baseURL + '/api/users');
      //console.log("after userstate.getAllUsers")

      dispatch({
        type: GET_USERS,
        payload: res.data
      });

    } catch (err) {
      showErrorMsg(ERROR_GET_USERS, err);
    }

    hideLoading();
  };

  // Update User
  
  const updateUser = async (userId,user) => {
    showLoading();
    try {
      console.log("updateeee##########");
      const res = await axios.put(baseURL + `/api/updateUser/${userId}`,user);
      console.log("updat2222222eeee##########");
      user["userId"] = res.data.userId;
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
        //category: category + 's'
      });
    } catch (err) {
      showErrorMsg(ERROR_UPDATE_USER, err);
    }

    hideLoading();
  };


  

  // Show add user modal
  const showModal = () => dispatch({ type: SHOW_MODAL });

  // Hide add user Modal
  const hideModal = () => dispatch({ type: HIDE_MODAL });

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set current user
  const setCurrent = user => dispatch({ type: SET_CURRENT, payload: user });

  // Clear current user
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        isModalShowing: state.isModalShowing,
        getAllUsers,
        showModal,
        updateUser,
        hideModal,
        setCurrent,
        clearCurrent,
        clearUsers
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;