import React from "react";
import { useNavigate } from "react-router-dom";
import appApi from "../api/appApi";
import Quantity from "../components/Quantity";
import DeleteIcon from "../images/Delete.svg";
import * as routes from '../api/apiRoutes'

const Cart = () => {
  const navigate = useNavigate()
  const cartItems = [
    {
      image:
        "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1665360000&Signature=GaHqOuZG7Wer65krW5yQr2-fCcrG3BX9l8FhDt4~5DZxQJ8YdjwmRtBbVRYECcGRXqyDZDuSuJpX59El4lW~XVe2m4NKUeSghFt6kTQDknRKvjJZygfBKzcAhurmrMBHOMjJhwGBNEWVlZztTCbYMDZSGW-qMbY98pJ8QWgRMyOtdvEcXSD7JEMXYdbtz1WzRpVPyey~MujqnKqR3ssB~v99t1WDM8evr~Gp~SQsRR4O6YWdlHRPglAVSVxj1WGYF2ljaSi7j8T9q7T3OGRjhU1ZxFs9nQCQ9vaiacX7mVaHKxkk~gDeB5hb86fNJ2RLvVTNTykoouqUZYNal~3ndw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "FADED MINIMALIST T-SHIRT",
      unitPrice: 41.52,
      quantity: 2,
      price: 83.04,
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/ea3b/179c/39ed87623ac25c793007f5edca37cd55?Expires=1665360000&Signature=GMg3~IKkKNaSjmq75wX4lZ8ruXl4H~y4y8CG~IqNYvMSnOFd8xG2QElysd6iNuKVPXIUH~odvmYf~vClpXSDYuxzrMunHy93ngziyRoEq5PFX0LYzaRswL7QYW02lD69UMBlv7fwP2suHB9SHd4aXb5j15pbRkR78kKEIB-1XkmeWww-trLqROffasc1pIHer3eNm2ubedDWyBWsD0OFDY2FxmFU9luK-wtnRVK7ktY08hJN6HFwr~hBA0WOlMdEkRFF3yLFKFvyuLZFgrgMkaiibAfP4fM1bVOcU9VwAFU~XiDEru-C2U-MxNskE1sQt9mOS~~~jEFcfI7CRFZ1aQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "TULLE TOP WITH GATHERING",
      unitPrice: 52.5,
      quantity: 3,
      price: 105,
    },
  ];
  const data = {
    subtotal: 188.04,
    shippingFee: 20,
    discount: "No",
    total: 208.04,
  };
  const handleCheckOut = () => {
    navigate('/delivery-information')
  }

  //Get Cart
  const getCart = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2Njg3NjAzMDIsImV4cCI6MTY2ODg0NjcwMn0.6G5Tk78A_7EgslAw4yfslOC29Zf_ZypGd5dr2jIidbk";
      const data = await appApi.get(
        routes.GET_CART,
        routes.getAccessTokenHeader(token)
      )

      console.log(data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  //Delete Cart Item
  const deleteCartItem = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2Njg3NjAzMDIsImV4cCI6MTY2ODg0NjcwMn0.6G5Tk78A_7EgslAw4yfslOC29Zf_ZypGd5dr2jIidbk";
      const data = await appApi.delete(
        routes.DELETE_CART_ITEM,
        routes.getDeleteCartBody("6374f10b602db0945ba9b0e1"),
        routes.getAccessTokenHeader(token)
      )

      console.log(data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }
  return (
    <div className="px-[150px] pt-[77px] text-[#22262A] ">
      <h1 onClick={getCart} className="text-[30px] leading-9 font-inter font-bold">
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
        <tr className="leading-[25px]">
          <th></th>
          <th onClick={deleteCartItem} className=" text-left">PRODUCT</th>
          <th>UNIT PRICE</th>
          <th>QUANTITY</th>
          <th className=" text-right">PRICE</th>
        </tr>
        {cartItems.map((item, i) => (
          <React.Fragment key={i}>
            <tr height="28px" />
            <tr className="border-t-2 border-[#F6F7F8]" height="28px" />
            <tr className="text-center">
              <td>
                <img src={DeleteIcon} alt="Delete" />
              </td>
              <td>
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt="Cart item"
                    className="w-[100px] aspect-[2/3] object-cover object-center"
                  />
                  <h2 className="cart-item ml-[68px]">{item.name}</h2>
                </div>
              </td>
              <td className="cart-item">{"$" + item.unitPrice}</td>
              {/* Quantity */}
              <td className="w-[125px]">
                <Quantity custom="text-[18px] h-[46px]" quantity={item.quantity}/>
              </td>
              <td className="cart-item text-right">{"$" + item.unitPrice*item.quantity}</td>
            </tr>
          </React.Fragment>
        ))}
      </table>
      {/* TOTAL */}
      <div className="w-[30%] mt-[49px] mr-0 ml-auto">
        <div className="flex justify-between cart-item">
          <h3>Subtotal</h3>
          <p className="cart-item">{"$" + data.subtotal}</p>
        </div>
        <div className="flex justify-between my-[27px] cart-item">
          <h3>Shipping fee</h3>
          <p className="cart-item">{"$" + data.shippingFee}</p>
        </div>
        <div className="flex justify-between cart-item">
          <h3>Discount</h3>
          <p className="cart-item">{data.discount}</p>
        </div>
        <div className="flex justify-between mt-[58px] text-[30px]">
          <h3>TOTAL</h3>
          <p className="text-[30px]">{"$" + data.total}</p>
        </div>
        {/* Check out */}
        <button
        onClick={handleCheckOut}
        className="bg-primary text-white w-full rounded-[5px] h-[60px] mt-[31px]">
          Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
