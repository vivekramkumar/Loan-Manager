import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_USER,
    CLEAR_USERS,
    SHOW_MODAL,
    HIDE_MODAL,
  } from '../adminTypes';
  
  export default (state, action) => {
    switch (action.type) {
  
      case GET_USERS:
        return {
          ...state,
          //users: action.user
          users: action.payload.users

          
        };
  
      case ADD_USER:
        return {
          ...state,
         
        };
  
      case UPDATE_USER:
        console.log("test update user");
        return {
          ...state,
          [action.category]: state[action.category].map(item =>
            item.itemId === action.payload.itemId ? action.payload : item
          )
        };
  
      case DELETE_USER:
        return {
          ...state,
         
        };
  
      case CLEAR_USERS:
        return {
          ...state,
          users: [],
         
        };
  
      case SHOW_MODAL:
        return {
          ...state,
          isModalShowing: true
        }
      case HIDE_MODAL:
        return {
          ...state,
          isModalShowing: false
        }
  
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null
        };
  
      default:
        return state;
    }
  };
  