import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const navData = ["Profile", "Address", "Order", "Change Password"];
  const handleNavClick = (navItem) => {
    const path = String(navItem).toLowerCase();
    navigate("/account/" + path);
  };
  return (
    <div className="px-[155px] py-[49px]">
      <h1 className=" font-bold text-[30px]">Account</h1>
      <div className="flex">
        {/* Left */}
        <div>
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
        </div>
        <div className=" w-[1px] bg-account-divider ml-[60px]"></div>
        {/* Right */}
        <div></div>
      </div>
    </div>
  );
};

export default Account;
