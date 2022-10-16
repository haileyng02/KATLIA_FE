import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Address from "./Address";
import Order from "./Order";
import ChangePassword from "./ChangePassword";
import OrderDetail from "./OrderDetail";

const Account = () => {
  const navigate = useNavigate();
  const [initNav, setNav] = useState("/profile");

  const navData = ["Profile", "Address", "Order", "Change Password"];

  // Get current nav based on URL
  useEffect(() => {
    setNav(window.location.pathname.substring(9));
  }, [navigate]);

  const handleNavClick = (navItem) => {
    var path = String(navItem).toLowerCase();
    const splittedPath = path.split(" ");
    path = splittedPath.join("-");
    navigate("/account/" + path);
  };

  const getCurrentContainer = () => {
    // if (initNav.includes('order/') && initNav.length>6) {
    //   return <OrderDetail/>
    // }
    switch (initNav) {
      case "profile":
        return <Profile />;
      case "address":
        return <Address />;
      case "order":
        return <Order />;
      // case initNav.match(/order\//)?.input:
        // return <OrderDetail />;
      case "change-password":
        return <ChangePassword />;
      default:
        break;
    }
  };

  return (
    <div className="px-[150px] pt-16">
      <div className="flex">
        <div className="w-1/4">
          <h1 className="font-inter font-bold text-[30px]">Account</h1>
          {/* Nav */}
          <ul className="">
            {navData.map((n, i) => (
              <li
                className=" mt-12 text-[25px] text-account-nav cursor-pointer"
                onClick={() => handleNavClick(n)}
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
        <div className=" w-[1px] bg-account-divider ml-[75px]"></div>
        {/* Container*/}
        <div className="ml-[71px] w-full">{getCurrentContainer()}</div>
      </div>
    </div>
  );
};

export default Account;
