import React, { useEffect, useState } from "react";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ProductItems from "./ProductItems";
import { Select, Spin } from "antd";

const { Option } = Select;

const ProductsContainer = ({
  items,
  setItems,
  loading,
  setLoading,
  gender,
  currCategory,
  getProductByGender,
  getProductByCategoryId,
}) => {
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  //Get all colors
  const getAllColors = async () => {
    try {
      const result = await appApi.get(routes.GET_ALL_COLORS);
      setColors(result.data);
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
    getAllSizes();
  }, []);

  //Get all sizes
  const getAllSizes = async () => {
    try {
      const result = await appApi.get(routes.GET_ALL_SIZES);
      setSizes(result.data);
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

  //Filter color by gender
  const filterColorByGender = async (colorId, gender) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_COLOR_BY_GENDER,
        routes.getFilterColorByGenderBody(colorId, gender)
      );
      setItems(result.data);
      console.log(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Filter color by categoryId
  const filterColorByCategoryId = async (colorId, gender) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_COLOR_BY_CATEGORY_ID,
        routes.getFilterColorByCategoryId(colorId, gender)
      );
      setItems(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Filter size by gender
  const filterSizeByGender = async (size, gender) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_SIZE_BY_GENDER,
        routes.getFilterSizeByGenderBody(size, gender)
      );
      setItems(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Filter size by categoryId
  const filterSizeByCategoryId = async (size, categoryId) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_SIZE_BY_CATEGORY_ID,
        routes.getFilterSizeByCategoryIdBody(size, categoryId)
      );
      setItems(result.data);
      console.log(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Filter size color by gender
  const filterSizeColorByGender = async (colorId, size, gender) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_SIZE_COLOR_BY_GENDER,
        routes.getFilterSizeColorByGenderBody(colorId, size, gender)
      );
      setItems(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Filter size color by category id
  const filterSizeColorByCategoryId = async (colorId, size, categoryId) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.FILTER_SIZE_COLOR_BY_CATEGORY_ID,
        routes.getFilterSizeColorByCategoryIdBody(colorId, size, categoryId)
      );
      setItems(result.data);
      console.log(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  const handleColorChange = (value) => {
    setColor(value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleResetFilter = () => {
    setColor(null);
    setSize(null);
    if (currCategory) {
      if (currCategory.category === "view all") {
        getProductByGender(gender);
      } else {
        getProductByCategoryId(currCategory.categoryId);
      }
    }
  };

  useEffect(() => {
    setColor(null);
    setSize(null);
  }, [currCategory, gender]);

  useEffect(() => {
    if (color && size) {
      if (currCategory.category === "view all")
        filterSizeColorByGender(color, size, gender);
      else {
        filterSizeColorByCategoryId(color, size, currCategory.categoryId);
      }
    } else if (color) {
      if (currCategory.category === "view all")
        filterColorByGender(color, gender);
      else {
        filterColorByCategoryId(color, currCategory.categoryId);
      }
    } else if (size) {
      if (currCategory.category === "view all")
        filterSizeByGender(size, gender);
      else {
        filterSizeByCategoryId(size, currCategory.categoryId);
      }
    }
  }, [color, size]);

  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]">
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        {loading ? (
          <Spin />
        ) : (
          <p className="">{items.length + " items found"}</p>
        )}
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
          <Select
            size="large"
            placeholder="Color"
            loading={!colors}
            value={color}
            className="w-[201px] product-filter"
            onChange={handleColorChange}
            showSearch
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            {colors?.map((color, i) => (
              <Option key={i} value={color.colorId} label={color.color}>
                <div className="row gap-x-[10px] font-inter font-[16px]">
                  <div
                    className={`w-5 h-5 rounded-full`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="mb-0 text-[18px]">{color.color}</p>
                </div>
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            placeholder="Size"
            loading={!sizes}
            value={size}
            onChange={handleSizeChange}
            className="w-[201px] product-filter text-black"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={sizes?.map((size, i) => {
              return { key: i, label: size.size, value: size.size };
            })}
          />
        </div>
        {/* Reset Filter */}
        <div
          onClick={handleResetFilter}
          className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px] w-[160px] justify-between cursor-pointer hover:border-primary"
        >
          <h3>Reset Filter</h3>
          <img src={CloseIcon} alt="Close" />
        </div>
      </div>
      <ProductItems loading={loading} items={items} />
    </div>
  );
};

export default ProductsContainer;
