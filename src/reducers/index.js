import { combineReducers } from "redux";
import authReducer from './authReducer'
import notificationReducer from "./notificationReducer";
import cartReducer from './cartReducer';

const allReducers = combineReducers({
  user: authReducer,
  notification: notificationReducer,
  cart: cartReducer
});

export default allReducers;