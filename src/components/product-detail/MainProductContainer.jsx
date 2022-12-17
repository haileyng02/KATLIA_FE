import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import Quantity from "../Quantity";
import ColorIcon from "../ColorIcon";
import ImagesContainer from "../product-detail/ImagesContainer";
import * as routes from "../../api/apiRoutes";
import appApi from "../../api/appApi";
import CartIcon from "../../images/Cart2.svg";

const MainProductContainer = ({id}) => {
  const [item, setItem] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    setItem(null);
    getProductDetail(id);
  }, [id]);

  useEffect(() => {
    setCurrentColor(item?.colorList[0]);
  }, [item]);

  useEffect(() => {
    setCurrentSize(currentColor?.details[0].size);
  }, [currentColor]);

  //Get Product Detail
  const getProductDetail = async (id) => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_DETAIL(id),
        routes.getProductDetail(id)
      );
      setItem(data.data);
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

  const colorOnClick = (c) => {
    setCurrentColor(c);
  };

  const sizeOnClick = (size) => {
    setCurrentSize(size);
  };

  return (
    <div className="px-[150px] flex items-start justify-between">
      {item ? (
        <>
          <ImagesContainer currentColor={currentColor} />
          <div className="mt-[10vh] w-[35%]">
            <h1 className=" font-bold">{item?.name}</h1>
            <p className=" leading-6 mt-7">{item?.description}</p>
            <div className="flex mt-6 gap-x-12">
              {item?.colorList?.map((c, i) => (
                <ColorIcon
                  key={i}
                  color={c}
                  current={currentColor?.id === c.id}
                  colorOnClick={(c) => colorOnClick(c)}
                />
              ))}
            </div>
            <p className="leading-6 mt-7 capitalize">
              {currentColor?.name.toLowerCase()}
            </p>
            <p className="leading-6 mt-9">{item?.price + "$"}</p>
            <div className="flex mt-9 gap-x-[23px]">
              {currentColor?.details.map((s, i) => {
                if (s.size === "ONESIZE" && i !== 0) return null;
                return (
                  <div
                    key={i}
                    className={`w-[64px] h-[66px]  flex cursor-pointer ${
                      currentSize === s.size
                        ? "bg-primary"
                        : "bg-[#D9D9D9] hover:border-2 hover:border-primary hover:border-solid"
                    }`}
                    onClick={() => sizeOnClick(s.size)}
                  >
                    <h3
                      className={`${
                        s.size === "ONESIZE" ? "text-[14px]" : "text-[18px]"
                      } leading-[42px] m-auto ${
                        currentSize === s.size ? "text-white" : "text-nav-item "
                      }`}
                    >
                      {s.size}
                    </h3>
                  </div>
                );
              })}
            </div>
            <div className="flex mt-16 max-h-[49px] gap-x-[82px]">
              {/* Quantity */}
              <Quantity custom="w-36" />
              {/* Add To Cart */}
              <div className="flex bg-[#EBF6FF] rounded-[5px] items-center px-[21px] gap-x-[15px] cursor-pointer">
                <img src={CartIcon} alt="Cart" className="h-[17px] w-[17px]" />
                <h3 className=" text-secondary">Add To Cart</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-[47%]">
            <Skeleton.Image active style={{ width: "100%", height: "80vh" }} />
          </div>
          <Skeleton className="mt-[10vh] w-[40%]" />
        </>
      )}
    </div>
  );
};

export default MainProductContainer;
