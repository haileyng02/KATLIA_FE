import { logOut } from "../actions/auth";
import { clearCart } from "../actions/cart";

const logOutProgress = (dispatch,navigate) => {
    localStorage.clear(); 
    dispatch(logOut()); 
    dispatch(clearCart());
    navigate('/signin');
}

export default logOutProgress;