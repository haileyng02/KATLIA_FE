import { combineReducers } from "redux";
import authReducer from './authReducer'
import notificationReducer from "./notificationReducer";

const allReducers = combineReducers({
  user: authReducer,
  notification: notificationReducer
});

export default allReducers;