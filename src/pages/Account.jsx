import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Address from "./Address";
import Order from "./Order";
import ChangePassword from "./ChangePassword"

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
    switch (initNav) {
      case "profile":
        return <Profile />;
      case "address":
        return <Address />;
      case "order":
        return <Order />;
      case "change-password":
        return <ChangePassword />;
      default:
        break;
    }
  };

  return (
    <div className="px-[155px] py-[49px]">
      <h1 className=" font-bold text-[30px]">Account</h1>
      <div className="flex">
        {/* Nav */}
        <ul className="">
          {navData.map((n, i) => (
            <li
              className=" mt-12 text-28 text-account-nav cursor-pointer"
              onClick={() => handleNavClick(n)}
            >
              {n}
            </li>
          ))}
        </ul>
        <div className=" w-[1px] bg-account-divider ml-[60px] mt-12"></div>
        {/* Container*/}
        <div className="mt-12 ml-[71px]">{getCurrentContainer()}</div>
      </div>
    </div>
  );
};

export default Account;
