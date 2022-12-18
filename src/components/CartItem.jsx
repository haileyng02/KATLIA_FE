import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import Quantity from "./Quantity";
import DeleteIcon from "../images/Delete.svg";

const CartItem = ({ item, handleDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(item?.quantity);

  //Delete Cart Item
  const deleteCartItem = async () => {
    try {
      const token = currentUser.token;
      console.log(token);
      const data = await appApi.delete(
        routes.DELETE_CART_ITEM(item.id),
        routes.getDeleteCartBody(item.id),
        routes.getAccessTokenHeader(token)
      );

      console.log(data);
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

  //Update Cart Item
  const updateCartItem = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2Njg3NjAzMDIsImV4cCI6MTY2ODg0NjcwMn0.6G5Tk78A_7EgslAw4yfslOC29Zf_ZypGd5dr2jIidbk";
      const data = await appApi.patch(
        routes.UPDATE_CART_ITEM,
        routes.getUpdateCartBody("637746186d20e9c758312282", 2),
        routes.getAccessTokenHeader(token)
      );

      console.log(data);
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

  const onDelete = () => {
    deleteCartItem();
    handleDelete(item.id);
  };

  return (
    <>
      <tr height="28px" />
      <tr className="border-t-2 border-[#F6F7F8]" height="28px" />
      <tr className="text-center">
        <td>
          <Tooltip title="Delete item">
            <img
              src={DeleteIcon}
              alt="Delete"
              className="cursor-pointer"
              onClick={onDelete}
            />
          </Tooltip>
        </td>
        <td>
          <div className="flex items-center">
            <img
              src={item?.image}
              alt="Cart item"
              className="w-[100px] aspect-[2/3] object-cover object-center"
            />
            <h2 className="cart-item ml-[68px]">{item?.name}</h2>
          </div>
        </td>
        <td className="cart-item">{"$" + item?.unit}</td>
        {/* Quantity */}
        <td className="w-[125px]">
          <Quantity
            custom="text-[18px] h-[46px]"
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </td>
        <td className="cart-item text-right">
          {"$" + item?.unit * item?.quantity}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
