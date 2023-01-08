import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { deleteCartItem } from "../actions/cart";
import Quantity from "./Quantity";
import DeleteIcon from "../images/Delete.svg";

const CartItem = ({ item, handleDelete, handleUpdate, getCart }) => {
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
      getCart();
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
  const updateCartItemCall = async (quantity) => {
    try {
      const result = await appApi.patch(
        routes.UPDATE_CART_ITEM,
        routes.getUpdateCartBody(item.id, quantity),
        routes.getAccessTokenHeader(currentUser.token)
      );
      console.log(result);
      getCart();
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

  const onUpdate = (quantity) => {
    handleUpdate(item.id, quantity);
    updateCartItemCall(quantity);
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
            <h2 className="cart-item ml-[68px] text-left">{item?.name}</h2>
          </div>
        </td>
        <td>
          {item?.unitSale ? (
            <>
              <p className="cart-item line-through text-primary">
                {"$" + item?.unit}
              </p>
              <p className="cart-item">{"$" + item?.unitSale}</p>
            </>
          ) : (
            <p className="cart-item">{"$" + item?.unit}</p>
          )}
        </td>
        {/* Quantity */}
        <td className="w-[125px]">
          <Quantity
            custom="text-[18px] h-[46px]"
            quantity={quantity}
            setQuantity={setQuantity}
            isCart
            onUpdate={onUpdate}
          />
        </td>
        <td>
          {item?.unitSale ? (
            <>
              <p className="cart-item text-right line-through text-primary">
                {"$" + (item?.unit * quantity).toFixed(2)}
              </p>
              <p className="cart-item text-right">{"$" + (item?.unitSale * quantity).toFixed(2)}</p>
            </>
          ) : (
            <p className="cart-item text-right">
              {"$" + (item?.unit * quantity).toFixed(2)}
            </p>
          )}
        </td>
      </tr>
      {/* <tr className="text-[16px] text-[#FF0202]">
        <td></td>
        <td colSpan={4}>Item has reached its maximum quantity</td>
      </tr> */}
    </>
  );
};

export default CartItem;
