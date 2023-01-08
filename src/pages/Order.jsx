import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import OrderItem from "../components/OrderItem";

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  //Get Order History
  const getOrderHistory = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ORDER_HISTORY,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data)
      setOrders([...result.data]);
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
    getOrderHistory();
  }, [currentUser]);

  return (
    <div>
      <h1 className="account-title">Order</h1>
      <div className="mt-[23px] flex flex-col gap-y-[12px]">
        {orders.length > 0 ? (
          orders.map((o, i) => <OrderItem key={i} item={o} />)
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
};

export default Order;
