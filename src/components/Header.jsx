import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Profile from "../images/Profile.svg";
import Cart from "../images/Cart.svg";
import { useState } from "react";

const navData = ["MEN", "WOMEN", "SALE", "CONTACT", "ABOUT"];

const Header = () => {
  const navigate = useNavigate();
  const currentUser = true;
  const [currItem, setCurrItem] = useState("");

  const handleNavClick = (navItem) => {
    setCurrItem(navItem);
    const path = String(navItem).toLowerCase();
    navigate("/" + path);
  };
  return (
    <div className="w-full h-[73px] bg-header flex fixed z-10 px-[150px]">
      <div className=" my-auto flex justify-between w-full">
        <h1
          className=" text-[30px] font-logo font-bold leading-[38px] cursor-pointer"
          onClick={() => handleNavClick("")}
        >
          KATLIA
        </h1>
        <ul className="flex">
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
        <Search />
        <div className="flex items-center">
          {currentUser ? (
            <img
              src={Profile}
              alt="Profile icon"
              className=" w-[27px] cursor-pointer"
              onClick={() => handleNavClick("account/profile")}
            />
          ) : (
            <p
              className="mr-4 cursor-pointer"
              onClick={() => handleNavClick("signin")}
            >
              Login
            </p>
          )}
          <img
            src={Cart}
            alt="Cart icon"
            className="ml-[15px] w-7 cursor-pointer"
            onClick={() => handleNavClick("cart")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
