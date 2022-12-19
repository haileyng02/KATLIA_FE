import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { initCart } from "../actions/cart";
import Cart from "../images/Cart.svg";

const CartButton = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleCartClick = () => {
    if (currentUser) {
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  //Get Cart
  const getCart = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_CART,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      if (result.data.message === "No item in cart") {
        dispatch(initCart([]));
        return;
      }
      dispatch(initCart(result.data.cartItems));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    console.log('qty:'+quantity)
    setValue(quantity);
  }, [quantity]);

  useEffect(() => {
    if (currentUser) {
      console.log("ok");
      getCart();
    }
  }, [currentUser]);

  return (
    <div className="relative ml-[15px]">
      <img
        src={Cart}
        alt="Cart icon"
        className=" w-7 cursor-pointer"
        onClick={handleCartClick}
      />
      <div className="w-4 h-4 bg-[#C85A27] rounded-full absolute -top-1 -right-2 text-[11px] text-white flex items-center justify-center">
        {value}
      </div>
    </div>
  );
};

export default CartButton;
