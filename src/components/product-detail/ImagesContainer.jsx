import React, { useState, useEffect } from "react";

const noImageUrl = 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png';

const ImagesContainer = ({currentColor}) => {
  const [currImage, setCurrImage] = useState();

  useEffect(() => {
    setCurrImage({ id: 0, url: currentColor?.imgList[0]?.url ?? noImageUrl });
  }, [currentColor]);

  const imageOnClick = (id, url) => {
    setCurrImage({ id, url });
  };

  return (
    <div className="flex justify-between gap-x-7 w-[47%]">
      {/* Main Image */}
      <img
        src={currImage?.url ?? noImageUrl}
        alt="Main"
        className="object-cover object-top basis-[85%] bg-[#F6F7F8]"
        style={{ height: "80vh" }}
      />
      {/* Sub Images */}
      <div className="flex flex-col overflow-y-auto h-[80vh] basis-[12.5%] gap-y-[10px] cursor-pointer">
        {currentColor?.imgList.map((image, i) => {
          return (
            <img
              key={i}
              src={image.url ?? noImageUrl}
              alt="Product"
              className={`flex-none object-cover object-center aspect-[55/82] hover:border-2 hover:border-primary hover:border-solid ${
                currImage?.id === i && "border-2 border-primary border-solid"
              }`}
              onClick={() => imageOnClick(i, image.url)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImagesContainer;
