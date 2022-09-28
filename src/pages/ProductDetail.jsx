import React, { useState } from "react";
import ColorIcon from "../components/ColorIcon";
import MinusIcon from '../images/MinusIcon.svg';
import PlusIcon from '../images/PlusIcon.svg';
import CartIcon from '../images/Cart2.svg'

const ProductDetail = () => {
  const images = [
    "https://s3-alpha-sig.figma.com/img/ee40/85e6/95a087fb32c5506029cceab00961fa36?Expires=1665360000&Signature=W1vWeSVgmLXdQMz9GUxGcaeTCnyIY9MD090DmCr9nBlW9aPfdIkt~BGvjk7FgSaRS65W854ERf5En66KHbVSbPnwGTHv73pFrXCI8jExJbQWFnaNvw6C5VrloNBdV5JXR13Xt6YNC8~DzXsLxXWJffk60Nz-BoTMJjqyJfYVhWx18vwr5ibj61-tC38b9FMJDVrk7HlUwZhQYETViapHJSP9NaiAxO~tW3mZCLGyvLnqusFmFoImk~o1oxYSGfzq06KWjGCxRh2ws1V3IW6Yrv4yBiE-WOuW6UileruAveZCaTUUSERqmbVHQwoIyjo08yzYU7sbuAV3ZoGIysL-~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/bd5e/94a8/5ce7adfdafce1bee36e5ae048c0b36b8?Expires=1665360000&Signature=MHdFG~zy~qUJfNMssJxoEKrQvjFS2~yfQixGokX6ZvLHMa2ixlpsqM4pRO6PUoj40tH4-kRX-ANMfGjKTqkYEC3P6I2cWBHIAKqUHw778jmoR2vje7WtTz77Nb4IzgAlILmXektEo0pWnzL8ULJG51SI5WMFQhiuT3vhV1Z2jxNM~pJxJL8-zRnERhCtWEiYpPWh6bVzsG~1yIPf9MqIM68k0eicoc5ppyTfktf9pLRh6L-eYbT9UuiqvPOG1stkgwo-5EJdQkm5ptQ3urjbvdomdmcOSpu1ukcOFlaZ7YRrGzLzFCCue9U3ne8dpPoB4aiqkWAE1WR69jd~KOF10g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/dc03/6561/06d45d00f3a31c056801d6e9dd71706b?Expires=1665360000&Signature=TRDH5piWpV7WhliBGwdO97ANdp34UDVYlz64la7Qpdl-aBlvohZsLygeq0so0O9Z6KVnOdAuKjk~7S0088Ce0-GP1NB48QZeuXhdScN5zd3OCVh4a-HSEmTvJ5ZAtH00simAkEANlYUKcJnYwX~6JsatxXKl2WfH4SJGj70Uiu9dJKaeEP096mMP4Mc9t7giRP8yW5JTwK993rOqiuGwka3wiAs2q24WsY9botM6jpIe7p0z6SVWmUrepDiqjcStssxqS3SS9hoWm-yTq-DQOpVs8JJGHrmfw1JORA7NAwzl0VBlOnEdk4trugHvLbpKVgmHmrIRAtydKjiI4bBa8w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/9cab/0b55/762387ef52f1195a2b041ef6ae94cc20?Expires=1665360000&Signature=gouuNNUKzy7XpGhB-H-DyXYLX4vhVDH2VlSOaxngApa9Mwe1cqHEw27gOs~AQQi-Y9FOgzkKeuUFTg1gx~rLWF-uvSsEX5f2fApFPdBxkDXp0fkxV4SvOiFczYVHm2lP7URbWGPkhPSxYaiG6IdUMuRpUANW8SskTGbQQyhS2LvDUK4RcJhUmMd2BC1vbZNEras3HqV4Wy2PZuDnTYaY0Uy2BRzpOwKs~IxsGKpvUv1TZsDELpz6ea1GO28m981rOAYsVmA-L-xmrzH~H1OlNNDCWS-8K26mrcVtH5YpTMFjinm1FtpDXJvJj8W0x5wJJyOtNyGw9Oc-NZU3-sBztw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  ];

  // const colors = [
  //   {code: "#000000", name: "Black"}
  // ]

  const sizes = [
    "S",
    "M",
    "L",
    "XL"
  ]

  const [mainImage, setMainImage] = useState(images[0]);
  const handleOnClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="flex pt-[71px] pl-[71px] pr-[134px] items-start justify-between">
      {/* Left */}
      <div className="flex basis-[47%] items-start justify-between">
        {/* Main Image */}
        <div className=" basis-[85.5%] bg-gray-400 overflow-hidden aspect-[55/82]">
          <img
            src={mainImage}
            alt="Main"
            className="object-cover object-center w-full"
          />
        </div>
        {/* Sub Images */}
        <div className="flex flex-col basis-[8.5%] gap-y-[6.3px] cursor-pointer">
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className="overflow-hidden"
                style={{ flex: 1 }}
                onClick={() => handleOnClick(image)}
              >
                <img
                  src={image}
                  alt="Product"
                  className="object-cover object-center aspect-[55/82]"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Right */}
      <div className=" basis-[36.5%] mt-[82px]">
        <h1 className=" font-bold">BASIC KNIT SWEATER</h1>
        <p className=" leading-6 mt-7">
          Round neck sweater featuring long sleeves, side vents at the hem and
          ribbed trims.
        </p>
        <div className="flex mt-6 gap-x-12">
          <ColorIcon  colorCode="#000000"/>
          <ColorIcon  colorCode="#95D5EA"/>
          <ColorIcon  colorCode="#60AB4D"/>
          <ColorIcon  colorCode="#EDD3AB"/>
          <ColorIcon  colorCode="#F81515"/>
          <ColorIcon  colorCode="#D9D9D9"/>
        </div>
        <p className="leading-6 mt-7">Black</p>
        <p className="leading-6 mt-9">28.58$</p>
        <div className="flex mt-9 gap-x-[23px]">
          {sizes.map((s,i) => {
            return <div key={i} className="w-[64px] h-[66px] bg-[#D9D9D9] flex">
            <h3 className=" text-[35px] leading-[42px] text-nav-item m-auto">{s}</h3>
          </div>
          })}
        </div>
        <div className="flex mt-16 max-h-[49px] gap-x-[82px]">
          {/* Quantity */}
          <div className="bg-[#F6F7F8] rounded-[5px] flex items-center">
            <button className="quantity-button">
              <img src={MinusIcon} alt="Minus" className="m-auto"/>
            </button>
            <input value={2} className="w-12 h-12 text-center bg-transparent"/>
            <button className="quantity-button">
              <img src={PlusIcon} alt="Plus" className="m-auto"/>
            </button>
          </div>
          {/* Add To Cart */}
          <div className="flex bg-[#EBF5FF] rounded-[5px] items-center px-[21px] gap-x-[15px]">
            <img src={CartIcon} alt="Cart" className="h-[17px] w-[17px]"/>
            <h3 className=" text-primary">Add To Cart</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
