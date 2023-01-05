import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "antd";
import Profile from "../images/Profile.svg";
import CartButton from "./CartButton";
import SearchField from "./SearchField";
import logOutProgress from '../utils/logOutProgress'

const navData = ["MEN", "WOMEN", "SALE", "CONTACT", "ABOUT"];

const items = [
  { label: "View Profile", key: "profile" },
  { label: "Log Out", key: "logout", danger: true },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [currItem, setCurrItem] = useState("");

  const handleNavClick = (navItem) => {
    setCurrItem(navItem);
    let path = String(navItem).toLowerCase();
    if (navItem === "MEN" || navItem === "WOMEN") path = "products/"+navItem.toLowerCase()+'/all/page=1';
    else if (navItem==='SALE') path='sale/men/all/page=1'
    navigate("/" + path);
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "profile":
        navigate("/account/profile");
        return;
      case "logout":
        logOutProgress(dispatch,navigate);
        return;
      default:
        return;
    }
  };
  
  return (
    <div className="w-full h-[73px] bg-header flex items-center fixed z-10 px-[150px]">
      <div className=" my-auto flex justify-between items-center w-full">
        <h1
          className=" text-[30px] font-logo font-bold leading-[38px] cursor-pointer"
          onClick={() => handleNavClick("")}
        >
          KATLIA
        </h1>
        <ul className="flex items-center justify-between w-[50%]">
          {navData.map((n, i) => (
            <li
              key={i}
              className={`nav-item ${
                currItem === n ? "text-black" : "text-nav-item"
              }`}
              onClick={() => handleNavClick(n)}
            >
              {n}
            </li>
          ))}
        </ul>
        <SearchField />
        <div className="flex items-center">
          {currentUser ? (
            <Dropdown menu={{ items, onClick }} placement="bottom">
              <img
                src={Profile}
                alt="Profile icon"
                className=" w-[27px] cursor-pointer"
                onClick={() => handleNavClick("account/profile")}
              />  
            </Dropdown>
          ) : (
            <p
              className="mr-4 cursor-pointer"
              onClick={() => handleNavClick("signin")}
            >
              Login
            </p>
          )}
          <CartButton/>
        </div>
      </div>
    </div>
  );
};

export default Header;
