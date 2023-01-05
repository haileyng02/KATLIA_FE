import React from "react";
import { useNavigate } from "react-router-dom";
import mainPic1 from "../images/main-1.png";
import mainPic2 from "../images/main-2.png";
import mainArrow from "../images/shop-now-arrow.svg";
import salePic from "../images/home-sale.png";
import ForMenFeatured from "../components/ForMenFeatured";
import ForWomenFeatured from "../components/ForWomenFeatured";

const Home = () => {
  const navigate = useNavigate();

  const handleSaleClick = () => {
    navigate('/sale/men/all/page=1')
  }

  return (
    <div className="pt-[92px]">
      {/* Main */}
      <div className="px-[105px] h-[763px] relative">
        {/* Title */}
        <div className="absolute left-[205px]">
          <div className="flex gap-[73px]">
            <div className="main-title">
              <h1>KATLI</h1>
              <h1 className=" text-[#C85A27]">A</h1>
            </div>
            <div className="main-title">
              <h1 className=" text-[#C85A27]">O</h1>
              <h1>NLINE</h1>
            </div>
          </div>
          <div className="main-title absolute -right-[48px]">
            <h1>STORE</h1>
          </div>
        </div>
        <div className="h-full flex justify-between">
          {/* IMG */}
          <div className="flex">
            <img
              src={mainPic1}
              alt="Katlia Home"
              className="w-[324px] self-end mb-[70px]"
            />
            <img
              src={mainPic2}
              alt="Katlia Home"
              className="w-[262px] self-start ml-7"
            />
          </div>
          {/* INTRO */}
          <div className=" mb-[216px] self-end">
            <p className=" text-20 leading-[25px] max-w-[405px]">
              The customer is at the very center of our special business model,
              which includes design, production, distribute activities and sales
              through a wide network of our own stores.
            </p>
            {/* SHOP NOW */}
            <div className=" mt-[30px] relative">
              <h3 className="text-20 leading-[25px] underline text-center">
                SHOP NOW
              </h3>
              <img
                src={mainArrow}
                alt="Arrow"
                className=" absolute top-1/3 right-[70px]"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="black-line absolute w-[46.6%] right-0" />
      {/* Sale */}
      <div className="mt-[101px] w-1/2 mx-auto relative">
        <img src={salePic} alt="Sale" className=" w-full" />
        <div className="absolute w-full h-full top-0 left-0 flex">
          <div className="m-auto text-20 leading-[25px]">
            <p className=" max-w-[350px] text-center">
              The hot sale period has now begun. Don’t miss the news
            </p>
            <div onClick={handleSaleClick} className="w-[220px] h-20 mx-auto text-center items-center flex justify-center mt-11 border-1 border-black cursor-pointer">
              SEE THE SALE
            </div>
          </div>
        </div>
      </div>
      <hr className="black-line w-[40%] mt-[230px]" />
      {/* For men */}
      <ForMenFeatured />
      <hr className="black-line mt-[230px] w-[70%] mr-0 ml-auto" />
      <ForWomenFeatured />
    </div>
  );
};

export default Home;
