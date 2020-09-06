//
import { combineReducers } from "redux";
import * as actionTypes from "../../actions/admins/types";

const initiaUserState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initiaUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };

    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

const initiaChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
};

const channel_reducer = (state = initiaChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload.isPrivateChannel,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});

export default rootReducer;
