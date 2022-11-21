import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductThumbnail from "../components/ProductThumbnail";
import Quantity from "../components/Quantity";
import ColorIcon from "../components/ColorIcon";
import CartIcon from "../images/Cart2.svg";
import * as routes from "../api/apiRoutes";
import appApi from "../api/appApi";
import { useEffect } from "react";

const ProductDetail = () => {
  const location = useLocation();
  const [item, setItem] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [currImage, setCurrImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  const id = location.state;

  const similarItems = [
    {
      id: 21,
      image:
        "https://s3-alpha-sig.figma.com/img/38d3/fdce/84173d0f2c376842c3e595c00a10512a?Expires=1665360000&Signature=dcGoQcBtYdYaHSoICaJFXyjcb4xHb-PEvBbkVmVYW2jZvdUIbkG7qoOzRmUTH7D8f5dUREsj22vQsXu~CG3RVWVTn9EzE3-1kjBNyHMTdVf~VwndL9swtTe0GIKutO4IhjDuuhZvA~QEnfBQYWE2TL6Oe6pmVBKnmXKeYSwKa~aDw-gLNT2Q3YxzZJbCvKODHhGtHPp-UWD0mJa9bAdq9w19Wf8iJQIC7E5L1kluo~XVpTRfOfGZEJB3t0supmteRsvTwrqASO48eN3KHrLki1xmaz1qVz1QPEmCpN84nHuThpfONOyBbKWiaabx~lr82V8D21eQkCaExvZlLQH28w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      colors: 7,
      name: "BASIC KNIT SWEATER",
      price: 27.25,
    },
    {
      id: 22,
      image:
        "https://s3-alpha-sig.figma.com/img/5da1/34f4/cd0bc526bdec1121fd820102663b1890?Expires=1665360000&Signature=PuY2r7Me~grtobjfqZddb5jbBxjw7olZkcOLuxzAtKE2W9Wbi6K6f3UyGpadOcC07Pn9S3Rl~GicEisyjzlRyJ9xHLLNJu7VorlhxIELLyX07JEfUDEKDjPTdb~xFw02fJBfZEL2Mw9zBI7gbamKDmRB0zp6ujfAYtuNUk1hWlStWBlCLp7Joq1sRdYwRBtJOn1UxaGwZlgyQUI0MPL8cT-r6SvTtBygamYODN0vHyw8HKNFBigQPjpFyVMoAO6qapwyhieVZ-ArEhmvOnWCPep~nMDnTH~n4oJsbJqdlWzo2EmxGDqTEAuWq~pIHhSHhVbNDjuahFPz9gEy7kR02Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      colors: 3,
      name: "ALPACA AND WOOL SWEATER",
      price: 51.5,
    },
    {
      id: 23,
      image:
        "https://s3-alpha-sig.figma.com/img/fda4/4075/938fadd3219b7c2571f7066503304e3a?Expires=1665360000&Signature=D912qMcLyMIqt5TmRvlQgmzUo77KFZ1ZRytu1D0ZuVLtop80EZgLcvat4CDE2bIcL9ImHDUL7nlTAuk3TQ7mSWCCO~uAJ6ybCjv0mtkhtpyS7IidVz6Em9PsyP57pTrCE1h05kYtY3nU6aHjeob51N9Q7~Kf6Qpb2vuzFKdv4yHeDGGy6CKZn32yFVgDCjxkDz2d1039JrtzN0XnzPqD8GDMtfVaBmvfaL70WSQi1Or8ImnNrp~vy2WNYZfWogJ6B70TYAy21OHMzv7aPDsPK4W3I~yzgQ0DA6d3aujT0-FAfMIT334~ayNAWklqULZk7pEWX90Oci2Lj479uSp7Pg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      colors: 1,
      name: "KNIT SWEATER WITH CUT-OUT DETAIL AND RHINESTONE BUTTONS",
      price: 45.15,
    },
  ];

  //Get Product Detail
  const getProductDetail = async (id) => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_DETAIL(id),
        routes.getProductDetail(id)
      );
      console.log(data.data);
      const item = data.data;
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

  //Get 4 Similar Items
  const get4SimilarItems = async () => {
    try {
      const data = await appApi.get(
        routes.GET_4SIMILAR_ITEMS,
        routes.get4SimilarItems("579857")
      );
      console.log(data);
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
                    currImage.id === i && "border-2 border-primary border-solid"
                  }`}
                  onClick={() => imageOnClick(i, image.url)}
                />
              );
            })}
          </div>
        </div>
        {/* Right */}
        <div className=" basis-[36.5%] mt-[82px]">
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
              return (
                <div
                  key={i}
                  className={`w-[64px] h-[66px]  flex cursor-pointer ${
                    currentSize === s.size ? "bg-primary" : "bg-[#D9D9D9] "
                  }`}
                  onClick={() => sizeOnClick(s.size)}
                >
                  <h3
                    className={`text-[18px] leading-[42px] m-auto ${
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
      </div>
      <hr className="black-line w-[50%] mt-[274px]" />
      {/* SIMILAR ITEMS */}
      <div className="mt-[141px] px-[150px]">
        <h2
          onClick={get4SimilarItems}
          className=" text-[35px] leading-[44px] font-bold"
        >
          SIMILAR ITEMS
        </h2>
        <div className="mt-[47px] grid grid-flow-col auto-cols-[29%] gap-x-[86px] overflow-x-auto pb-[53px]">
          {similarItems.map((item, i) => {
            return <ProductThumbnail item={item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
