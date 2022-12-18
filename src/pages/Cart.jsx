import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CartItem from "../components/CartItem";
import { Skeleton } from "antd";

const data = {
  subtotal: 188.04,
  shippingFee: 20,
  discount: "No",
  total: 208.04,
};

const cartItems = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1665360000&Signature=GaHqOuZG7Wer65krW5yQr2-fCcrG3BX9l8FhDt4~5DZxQJ8YdjwmRtBbVRYECcGRXqyDZDuSuJpX59El4lW~XVe2m4NKUeSghFt6kTQDknRKvjJZygfBKzcAhurmrMBHOMjJhwGBNEWVlZztTCbYMDZSGW-qMbY98pJ8QWgRMyOtdvEcXSD7JEMXYdbtz1WzRpVPyey~MujqnKqR3ssB~v99t1WDM8evr~Gp~SQsRR4O6YWdlHRPglAVSVxj1WGYF2ljaSi7j8T9q7T3OGRjhU1ZxFs9nQCQ9vaiacX7mVaHKxkk~gDeB5hb86fNJ2RLvVTNTykoouqUZYNal~3ndw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "FADED MINIMALIST T-SHIRT",
    unit: 41.52,
    quantity: 2,
    price: 83.04,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/ea3b/179c/39ed87623ac25c793007f5edca37cd55?Expires=1665360000&Signature=GMg3~IKkKNaSjmq75wX4lZ8ruXl4H~y4y8CG~IqNYvMSnOFd8xG2QElysd6iNuKVPXIUH~odvmYf~vClpXSDYuxzrMunHy93ngziyRoEq5PFX0LYzaRswL7QYW02lD69UMBlv7fwP2suHB9SHd4aXb5j15pbRkR78kKEIB-1XkmeWww-trLqROffasc1pIHer3eNm2ubedDWyBWsD0OFDY2FxmFU9luK-wtnRVK7ktY08hJN6HFwr~hBA0WOlMdEkRFF3yLFKFvyuLZFgrgMkaiibAfP4fM1bVOcU9VwAFU~XiDEru-C2U-MxNskE1sQt9mOS~~~jEFcfI7CRFZ1aQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    name: "TULLE TOP WITH GATHERING",
    unit: 52.5,
    quantity: 3,
    price: 105,
  },
];

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cart, setCart] = useState();

  const handleCheckOut = () => {
    navigate("/delivery-information");
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
