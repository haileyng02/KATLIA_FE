import { combineReducers } from "redux";
import authReducer from './authReducer'
import notificationReducer from "./notificationReducer";
import cartReducer from './cartReducer';
import colorsReducer from './colorsReducer';

const allReducers = combineReducers({
  user: authReducer,
  notification: notificationReducer,
  cart: cartReducer,
  colors: colorsReducer
});

export default allReducers;