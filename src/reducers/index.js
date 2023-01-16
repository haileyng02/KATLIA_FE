import { combineReducers } from "redux";
import authReducer from './authReducer'
import notificationReducer from "./notificationReducer";
import cartReducer from './cartReducer';
import colorsReducer from './colorsReducer';
import mixmatchReducer from "./mixmatchReducer";
import featuredReducer from './featuredReducer';

const allReducers = combineReducers({
  user: authReducer,
  notification: notificationReducer,
  cart: cartReducer,
  colors: colorsReducer,
  mixmatch: mixmatchReducer,
  featured: featuredReducer
});

export default allReducers;