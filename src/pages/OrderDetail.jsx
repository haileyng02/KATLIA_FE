import React from "react";
import { useLocation } from "react-router-dom";
import checked from "../images/Checked.svg";
import unChecked from "../images/Unchecked.svg";
import passedLine from "../images/PassedLine.svg";
import unpassedLine from "../images/UnpassedLine.svg";

const OrderDetail = () => {
  //Get order
  const location = useLocation();
  const order = location.state;

  return (
    <div>
      <h1 className="account-title">{order.id}</h1>
      {/* <div className="flex mt-[59px] gap-x-[82.44px] relative">
        <div>
          <img src={order.statusID>=1 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Packing</p>
        </div>
        <div>
          <img src={order.statusID>=2 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Shipping</p>
        </div>
        <div>
          <img src={order.statusID>=3 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Success</p>
        </div>
        <div className="absolute flex top-[20.7px] left-[20.7px] -z-10">
            <img src={passedLine} alt="Status line" />
            <img src={passedLine} alt="Status line" />
        </div>
      </div> */}
    </div>
  );
};

export default OrderDetail;
