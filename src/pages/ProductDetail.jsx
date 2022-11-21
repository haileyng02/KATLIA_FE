import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Skeleton, Spin } from "antd";
import Quantity from "../components/Quantity";
import ColorIcon from "../components/ColorIcon";
import SimilarItems from "../components/SimilarItems";
import * as routes from "../api/apiRoutes";
import appApi from "../api/appApi";
import CartIcon from "../images/Cart2.svg";
import loadingIcon from "../images/loading2.gif";

const ProductDetail = () => {
  const location = useLocation();
  const [item, setItem] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [currImage, setCurrImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  const id = location.state;

  //Get Product Detail
  const getProductDetail = async (id) => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_DETAIL(id),
        routes.getProductDetail(id)
      );
      const item = data.data;
      console.log(item);
      setItem(item);
      setCurrentColor(item.colorList[0]);
      setCurrImage({ id: 0, url: item.colorList[0].imgList[0].url });
      setCurrentSize(item.colorList[0].details[0].size);
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
    getProductDetail(id);
  }, []);

  const colorOnClick = (c) => {
    setCurrentColor(c);
  };

  const imageOnClick = (id, url) => {
    setCurrImage({ id, url });
  };

  const sizeOnClick = (size) => {
    setCurrentSize(size);
  };

  return (
    <div className=" pt-[71px] font-inter">
      <div className="px-[150px] flex items-start justify-between">
        {/* Left */}
        {item ? (
          <div className="flex basis-[47%] justify-between gap-x-7 items-start">
            {/* Main Image */}
            <img
              src={currImage?.url}
              alt="Main"
              className="object-cover object-center basis-[85%] bg-gray-400"
              style={{ height: "80vh" }}
            />
            {/* Sub Images */}
            <div
              className="grid grid-flow-row basis-[12.5%] gap-y-[10px] cursor-pointer overflow-y-auto"
              style={{ height: currentColor?.imgList.length > 5 && "80vh" }}
            >
              {currentColor?.imgList.map((image, i) => {
                return (
                  <img
                    key={i}
                    src={image.url}
                    alt="Product"
                    className={`object-cover object-center aspect-[55/82] hover:border-2 hover:border-primary hover:border-solid ${
                      currImage.id === i &&
                      "border-2 border-primary border-solid"
                    }`}
                    onClick={() => imageOnClick(i, image.url)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <Skeleton.Image
            active
            style={{ width: "100%", height: "80vh" }}
            className="w-[47%]"
          />
        )}
        {/* Right */}
        <div className=" basis-[36.5%] mt-[82px]">
          {item ? (
            <div>
              <h1 className=" font-bold">{item?.name}</h1>
              <p className=" leading-6 mt-7">{item?.description}</p>
              <div className="flex mt-6 gap-x-12">
                {item?.colorList?.map((c, i) => (
                  <ColorIcon
                    key={i}
                    color={c}
                    current={currentColor.id === c.id}
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
                  if (s.size==='ONESIZE' && i!==0) return null;
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
                        className={`${s.size==='ONESIZE' ? 'text-[14px]' : 'text-[18px]'} leading-[42px] m-auto ${
                          currentSize === s.size
                            ? "text-white"
                            : "text-nav-item "
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
                  <img
                    src={CartIcon}
                    alt="Cart"
                    className="h-[17px] w-[17px]"
                  />
                  <h3 className=" text-secondary">Add To Cart</h3>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton className="w-full" />
          )}
        </div>
      </div>
      <hr className="black-line w-[50%] mt-[274px]" />
      {/* SIMILAR ITEMS */}
      <SimilarItems id={item?.id} />
    </div>
  );
};

export default ProductDetail;
