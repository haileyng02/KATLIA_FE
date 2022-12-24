import React, { useEffect } from "react";
import DropDownBox from "./DropDownBox";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ProductItems from "./ProductItems";

const ProductsContainer = ({ items, loading }) => {
  //Get all colors
  const getAllColors = async () => {
    try {
      const result = await appApi.get(routes.GET_ALL_COLORS);
      // console.log(result);
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
    getAllColors();
  }, []);

  //Get all sizes
  const getAllSizes = async () => {
    try {
      const result = await appApi.get(routes.GET_ALL_SIZES);
      // console.log(result);
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
    getAllSizes();
  }, []);

  //Filter by color
  const filterByColor = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_BY_COLOR,
        routes.getFilterByColorBody(1)
      );
      // console.log(result);
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
    filterByColor();
  }, []);

  //Filter by size
  const filterBySize = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_BY_SIZE,
        routes.getFilterBySizeBody("S")
      );
      // console.log(result);
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
    filterBySize();
  }, []);

  //Filter by color and size
  const filterByColorAndSize = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_BY_COLOR_AND_SIZE,
        routes.getFilterByColorAndSizeBody(1, "S")
      );
      // console.log(result);
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
    filterByColorAndSize();
  }, []);

  //Filter color by gender
  const filterColorByGender = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_COLOR_BY_GENDER,
        routes.getFilterColorByGenderBody(1, "men")
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    filterColorByGender();
  }, []);

//Filter color by categoryId
  const filterColorByCategoryId = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_COLOR_BY_CATEGORY_ID,
        routes.getFilterColorByCategoryId(1, 1)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    filterColorByCategoryId();
  }, []);

  

  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]">
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        <p className="">{items.length + " items found"}</p>
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px]">
          <h3>Sort by:</h3>
          <p className="text-[#F9AF5E] ml-2 sort-outline">Popular</p>
          <img src={DropDownIcon} alt="Drop down" className=" ml-4" />
        </div>
      </div>
      <hr className="black-line opacity-40 mt-[6px]" />
      {/* Filter */}
      <div className="flex mt-[23px] justify-between mb-[74px]">
        <div className="flex gap-x-[49px]">
          <DropDownBox title="Color" />
          <DropDownBox title="Size" />
          <DropDownBox title="Prize" />
        </div>
        {/* Reset Filter */}
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px] w-[160px] justify-between">
          <h3>Reset Filter</h3>
          <img src={CloseIcon} alt="Close" />
        </div>
      </div>
      <ProductItems loading={loading} items={items}/>
    </div>
  );
};

export default ProductsContainer;
