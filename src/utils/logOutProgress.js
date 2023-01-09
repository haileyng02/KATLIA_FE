import { logOut } from "../actions/auth";
import { clearCart } from "../actions/cart";
import { mixReset } from "../actions/mixmatch";

const logOutProgress = (dispatch,navigate) => {
    localStorage.clear(); 
    dispatch(logOut()); 
    dispatch(clearCart());
    dispatch(mixReset());
    navigate('/signin');
}

export default logOutProgress;