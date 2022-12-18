import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CartItem from "../components/CartItem";
import { Skeleton } from "antd";

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cart, setCart] = useState();

  const handleCheckOut = () => {
    navigate("/delivery-information",{state:cart?.cartItems});
  };

  //Get Cart
  const getCart = async () => {
    try {
      const token = currentUser.token;
      console.log('getcart: '+ token)
      const result = await appApi.get(
        routes.GET_CART,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      setCart(result.data);
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
    if (currentUser) getCart();
  }, [currentUser]);

  const handleDelete = (id) => {
    console.log(id)
  };

  return (
    <div className="px-[150px] pt-[77px] text-[#22262A] ">
      <h1
        onClick={getCart}
        className="text-[30px] leading-9 font-inter font-bold"
      >
        SHOPPING CART
      </h1>
      {/* Cart */}
      <table className=" mt-[49px] w-full">
        <colgroup>
          <col span="1" width="" />
          <col span="1" width="50%" />
          <col span="1" width="" />
          <col span="1" width="" />
          <col span="1" width="" />
        </colgroup>
        <tbody>
          <tr className="leading-[25px]">
            <th></th>
            <th className=" text-left">PRODUCT</th>
            <th>UNIT PRICE</th>
            <th>QUANTITY</th>
            <th className=" text-right">PRICE</th>
          </tr>
          {cart ? (
            cart.cartItems.map((item, i) => (
              <CartItem
                key={i}
                item={item}
                token={currentUser.token}
                setCart={setCart}
                handleDelete={(id)=>handleDelete(id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <Skeleton active className="mt-5" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* TOTAL */}
      <div className="w-[30%] mt-[49px] mr-0 ml-auto">
        <Skeleton active loading={!cart}>
          <div className="flex justify-between cart-item">
            <h3>Subtotal</h3>
            <p className="cart-item">{"$" + cart?.subtotal}</p>
          </div>
          <div className="flex justify-between my-[27px] cart-item">
            <h3>Shipping fee</h3>
            <p className="cart-item">{"$" + cart?.ship}</p>
          </div>
          <div className="flex justify-between cart-item">
            <h3>Discount</h3>
            <p className="cart-item">{cart?.discount}</p>
          </div>
          <div className="flex justify-between mt-[58px] text-[30px]">
            <h3>TOTAL</h3>
            <p className="text-[30px]">{"$" + cart?.total}</p>
          </div>
        </Skeleton>
        {/* Check out */}
        <button
          onClick={handleCheckOut}
          className="bg-primary text-white w-full rounded-[5px] h-[60px] mt-[31px]"
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
