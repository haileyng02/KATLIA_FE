import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { deleteCartItem, updateCartItem } from "../actions/cart";
import Quantity from "./Quantity";
import DeleteIcon from "../images/Delete.svg";
import { useEffect } from "react";

const CartItem = ({ item, handleDelete,handleUpdate, updatePricing }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item?.quantity);

  //Delete Cart Item
  const deleteCartItemCall = async () => {
    try {
      const token = currentUser.token;
      const data = await appApi.delete(`/cart/deleteCartItem/${item.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: item.id,
        },
      });

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
  const updateCartItemCall = async () => {
    try {
      const result = await appApi.patch(
        routes.UPDATE_CART_ITEM,
        routes.getUpdateCartBody(item.id, quantity),
        routes.getAccessTokenHeader(currentUser.token)
      );

      console.log(result);
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
    dispatch(deleteCartItem(item.productId, item.quantity));
    handleDelete(item.id);
    deleteCartItemCall();
  };

  const onUpdate = () => {
    dispatch(updateCartItem(item.productId, quantity));
    handleUpdate(item.id,quantity);
    updateCartItemCall();
  };

  useEffect(() => {
    onUpdate();
    updatePricing();
  }, [quantity]);


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
            <h2 className="cart-item ml-[68px] text-left">{item?.name}</h2>
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
          {"$" + (item?.unit * quantity).toFixed(2)}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
