import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import OrderItem from "../components/OrderItem";
import noOrderIcon from '../images/no-order.svg';

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //Get Order History
  const getOrderHistory = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ORDER_HISTORY,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
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
    setLoading(false);
  };

  useEffect(() => {
    getOrderHistory();
  }, [currentUser]);

  return (
    <div>
      <h1 className="account-title">Order</h1>
      <div className="mt-[23px] flex flex-col gap-y-[12px]">
        {!loading ? (
          orders.length > 0 ? (
            orders.map((o, i) => <OrderItem key={i} item={o} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-[35vh]">
              <img src={noOrderIcon} alt="No order" />
              <p className="font-inter font-light text-13 mt-5">
                NO ORDERS YET
              </p>
            </div>
          )
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
};

export default Order;
