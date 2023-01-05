import React from "react";
import transparent from '../images/transparent.png';

const sampleImage =
  "https://s3-alpha-sig.figma.com/img/8e15/1bb2/1b76d2adc1f356b7dfc0bf375b03857b?Expires=1673827200&Signature=QAunReLi-BRnGlrOp8O7Ep00eMMJsHbY5NskXkZxeNP2kluOBRMnvr4HD--kgrXLptAAl0L~VNMrQzhhBvcqKvdeNqlkjHPTtgAu4FCcEW-htN-bKW~F5mA5UdhRMsWeuCkS5lDGs1L2qUFW4Bw-iUElhRrKb6I-as1bFL8-t-wbsZ4PbhRmbdf1w6T9MyZgOKUZgTf5TFW0O7UZ96vPpb4uaUNpeDNGNIotjJC~ehEgLjZRTUIyCOxSx-r4x5yo0Szuo3H9vfFCZDOUNnyJ~LTNDXno3P0FLj6t2rVP-R4OloCeAs4PzthRqfZw93D-gi2AxRBB9XkZ3hmrRd5hLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const MixItem = () => {
  return (
    <div className="flex flex-col relative">
      <div className="rounded-10 bg-[#F6F7F8]">
        <img
          src={transparent}
          alt="Product"
          className="aspect-[3/4] h-[35vh] object-cover object-center rounded-10"
        />
      </div>
      <div className="h-[27px] w-full px-1 bg-[#DE9C7D] rounded-10 flex items-center justify-center absolute -bottom-[14px]">
        <p className="text-[15px] text-white truncate">CORD UTILITY BOMBER</p>
      </div>
    </div>
  );
};

export default MixItem;
