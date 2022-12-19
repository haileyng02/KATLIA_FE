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
  const [pricing, setPricing] = useState();

  const handleCheckOut = () => {
    navigate("/delivery-information", { state: cart });
  };

  //Get Cart
  const getCart = async () => {
    console.log('incart')
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_CART,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      if (result.data.message==="No item in cart") {
        setCart({cartItems:[]});
        return;
      }
      setCart(result.data);
      setPricing({
        subtotal: result.data.subtotal,
        ship: result.data.ship,
        discount: result.data.discount,
        total: result.data.total,
      });
    } catch (err) {
      setCart({cartItems:[]})
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
    console.log("ok");
    if (currentUser) getCart();
  }, [currentUser]);

  const handleDelete = (id) => {
    console.log(id);
    setCart({
      ...cart,
      cartItems: cart.cartItems.filter(function (obj) {
        return obj.id !== id;
      }),
    });
  };

  const handleUpdate = (id, quantity) => {
    const index = cart.cartItems.findIndex((obj) => obj.id === id);
    const temp = cart;
    temp.cartItems[index] = {
      ...temp.cartItems[index],
      quantity: quantity,
      total: temp.cartItems[index] * quantity,
    };
    setCart(temp);
  };

  const updatePricing = () => {
    let subtotal = 0;
    for (let i = 0; i < cart?.cartItems?.length; i++) {
      subtotal += cart?.cartItems[i].quantity * cart?.cartItems[i].unit;
      // promoPrice += cart.cartItems[i].totalPricePromo
    }
    setPricing({
      ...pricing,
      subtotal: subtotal,
      total: subtotal + pricing?.ship - pricing?.discount,
    });
  };

  useEffect(() => {
    updatePricing();
  }, [cart]);

  return (
    <div className="px-[150px] pt-[77px] text-[#22262A] ">
      <h1
        onClick={getCart}
        className="text-[30px] leading-9 font-inter font-bold"
      >
        SHOPPING CART
      </h1>
      {/* Cart */}
      {cart?.cartItems?.length >= 1 || !cart?.cartItems ? (
        <div>
          <table className=" mt-[49px] w-full table-fixed">
            <colgroup>
              <col span="1" width="5%" />
              <col span="1" width="50%" />
              <col span="1" width="" />
              <col span="1" width="10%" />
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
                cart.cartItems?.map((item, i) => (
                  <CartItem
                    key={i}
                    item={item}
                    token={currentUser.token}
                    setCart={setCart}
                    handleDelete={(id) => handleDelete(id)}
                    handleUpdate={(id, quantity) => handleUpdate(id, quantity)}
                    updatePricing={updatePricing}
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
                <p className="cart-item">
                  {"$" + pricing?.subtotal?.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between my-[27px] cart-item">
                <h3>Shipping fee</h3>
                <p className="cart-item">{"$" + pricing?.ship}</p>
              </div>
              <div className="flex justify-between cart-item">
                <h3>Discount</h3>
                <p className="cart-item">{"$" + pricing?.discount?.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mt-[58px] text-[30px]">
                <h3>TOTAL</h3>
                <p className="text-[30px]">
                  {"$" + pricing?.total?.toFixed(2)}
                </p>
              </div>
            </Skeleton>
            {/* Check out */}
            <button
              onClick={handleCheckOut}
              className={`bg-primary hover:bg-secondary text-white w-full rounded-[5px] h-[60px] mt-[31px]`}
            >
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] font-inter">Your cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
