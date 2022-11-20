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
  //Get item id
  const location = useLocation();
  const id = location.state;

  const [item, setItem] = useState();

  const images = [
    "https://s3-alpha-sig.figma.com/img/ee40/85e6/95a087fb32c5506029cceab00961fa36?Expires=1665360000&Signature=W1vWeSVgmLXdQMz9GUxGcaeTCnyIY9MD090DmCr9nBlW9aPfdIkt~BGvjk7FgSaRS65W854ERf5En66KHbVSbPnwGTHv73pFrXCI8jExJbQWFnaNvw6C5VrloNBdV5JXR13Xt6YNC8~DzXsLxXWJffk60Nz-BoTMJjqyJfYVhWx18vwr5ibj61-tC38b9FMJDVrk7HlUwZhQYETViapHJSP9NaiAxO~tW3mZCLGyvLnqusFmFoImk~o1oxYSGfzq06KWjGCxRh2ws1V3IW6Yrv4yBiE-WOuW6UileruAveZCaTUUSERqmbVHQwoIyjo08yzYU7sbuAV3ZoGIysL-~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/bd5e/94a8/5ce7adfdafce1bee36e5ae048c0b36b8?Expires=1665360000&Signature=MHdFG~zy~qUJfNMssJxoEKrQvjFS2~yfQixGokX6ZvLHMa2ixlpsqM4pRO6PUoj40tH4-kRX-ANMfGjKTqkYEC3P6I2cWBHIAKqUHw778jmoR2vje7WtTz77Nb4IzgAlILmXektEo0pWnzL8ULJG51SI5WMFQhiuT3vhV1Z2jxNM~pJxJL8-zRnERhCtWEiYpPWh6bVzsG~1yIPf9MqIM68k0eicoc5ppyTfktf9pLRh6L-eYbT9UuiqvPOG1stkgwo-5EJdQkm5ptQ3urjbvdomdmcOSpu1ukcOFlaZ7YRrGzLzFCCue9U3ne8dpPoB4aiqkWAE1WR69jd~KOF10g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/dc03/6561/06d45d00f3a31c056801d6e9dd71706b?Expires=1665360000&Signature=TRDH5piWpV7WhliBGwdO97ANdp34UDVYlz64la7Qpdl-aBlvohZsLygeq0so0O9Z6KVnOdAuKjk~7S0088Ce0-GP1NB48QZeuXhdScN5zd3OCVh4a-HSEmTvJ5ZAtH00simAkEANlYUKcJnYwX~6JsatxXKl2WfH4SJGj70Uiu9dJKaeEP096mMP4Mc9t7giRP8yW5JTwK993rOqiuGwka3wiAs2q24WsY9botM6jpIe7p0z6SVWmUrepDiqjcStssxqS3SS9hoWm-yTq-DQOpVs8JJGHrmfw1JORA7NAwzl0VBlOnEdk4trugHvLbpKVgmHmrIRAtydKjiI4bBa8w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    "https://s3-alpha-sig.figma.com/img/9cab/0b55/762387ef52f1195a2b041ef6ae94cc20?Expires=1665360000&Signature=gouuNNUKzy7XpGhB-H-DyXYLX4vhVDH2VlSOaxngApa9Mwe1cqHEw27gOs~AQQi-Y9FOgzkKeuUFTg1gx~rLWF-uvSsEX5f2fApFPdBxkDXp0fkxV4SvOiFczYVHm2lP7URbWGPkhPSxYaiG6IdUMuRpUANW8SskTGbQQyhS2LvDUK4RcJhUmMd2BC1vbZNEras3HqV4Wy2PZuDnTYaY0Uy2BRzpOwKs~IxsGKpvUv1TZsDELpz6ea1GO28m981rOAYsVmA-L-xmrzH~H1OlNNDCWS-8K26mrcVtH5YpTMFjinm1FtpDXJvJj8W0x5wJJyOtNyGw9Oc-NZU3-sBztw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  ];

  // const colors = [
  //   {code: "#000000", name: "Black"}
  // ]

  const sizes = ["S", "M", "L", "XL"];

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

  const [mainImage, setMainImage] = useState(images[0]);
  const handleOnClick = (image) => {
    setMainImage(image);
  };

  //Get Product Detail
  const getProductDetail = async (id) => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_DETAIL(id),
        routes.getProductDetail(id)
      );
      console.log(data);
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

  return (
    <div className=" pt-[71px] font-inter">
      <div className="px-[150px] flex items-start justify-between">
        {/* Left */}
        <div className="flex basis-[47%] justify-between gap-x-7">
          {/* Main Image */}
          <div className=" basis-[85%] bg-gray-400 overflow-hidden aspect-[19/30] w-[379px] flex-none">
            <img
              src={item.colorList[0].imgList[0].url}
              alt="Main"
              className="object-cover object-center w-full"
            />
          </div>
          {/* Sub Images */}
          <div className="grid grid-flow-row basis-[18.5%] self-stretch gap-y-[6.3px] cursor-pointer overflow-y-auto">
            {item.colorList[0].imgList.map((image, i) => {
              return (
                <img
                  key={i}
                  src={image.url}
                  alt="Product"
                  className="object-cover object-center aspect-[55/82]"
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
            {item?.colorList.map((c, i) => (
              <ColorIcon key={i} colorCode={c?.hex} />
            ))}
          </div>
          <p className="leading-6 mt-7">Black</p>
          <p className="leading-6 mt-9">28.58$</p>
          <div className="flex mt-9 gap-x-[23px]">
            {sizes.map((s, i) => {
              return (
                <div key={i} className="w-[64px] h-[66px] bg-[#D9D9D9] flex">
                  <h3 className=" text-[35px] leading-[42px] text-nav-item m-auto">
                    {s}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="flex mt-16 max-h-[49px] gap-x-[82px]">
            {/* Quantity */}
            <Quantity custom="w-36" />
            {/* Add To Cart */}
            <div className="flex bg-[#EBF5FF] rounded-[5px] items-center px-[21px] gap-x-[15px]">
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
