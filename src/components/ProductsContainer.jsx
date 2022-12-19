import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Skeleton } from "antd";
import DropDownBox from "./DropDownBox";
import ProductThumbnail from "./ProductThumbnail";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg";
import appApi from "../api/appApi";
import * as routes from '../api/apiRoutes'
import { async } from "q";

const ProductsContainer = ({ items, loading }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  //Pagination
  const itemsPerPage = 12;

  // Get current page based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (!path.includes("&page=")) {
      setPage(0);
      setItemOffset(0);
      return;
    }
    const page = path.substring(path.indexOf("&page=") + 6);
    const pageNumber = parseInt(page) - 1;
    const newOffset = (pageNumber * itemsPerPage) % items.length;
    setPage(pageNumber);
    setItemOffset(newOffset);
  }, [navigate, items.length, pageCount]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    let path = window.location.pathname;
    if (path.includes("&page="))
      path = path.substring(0, path.indexOf("&page="));
    navigate(path + "&page=" + (event.selected + 1));
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };
  //Get all colors
  const getAllColors = async () => {
    try {
      const result = await appApi.get(
        routes.GET_ALL_COLORS
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    getAllColors()
  }, [])

  //Get all sizes
  const getAllSizes = async () => {
    try {
      const result = await appApi.get(
        routes.GET_ALL_SIZES
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }
  useEffect(() => {
    getAllSizes()
  }, [])
  
  //Search products
  const searchProduct = async () => {
    try {
      const result = await appApi.get(
        routes.SEARCH_PRODUCTS,
        routes.getSearchProductsBody("HOODIE")
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
    searchProduct()
  }, [])
  
  //Filter by color
  const filterByColor = async () => {
    try {
      const result = await appApi.get(
        routes.FILTER_BY_COLOR,
        routes.getFilterByColorBody(1)
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
    filterByColor()
  }, [])

  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]">
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        <p className="">{items.length + ' items found'}</p>
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px]">
          <h3>Sort by:</h3>
          <p className="text-[#F9AF5E] ml-2 sort-outline">Popular</p>
          <img src={DropDownIcon} alt="Drop down" className=" ml-4" />
        </div>
      </div>
      <hr className="black-line opacity-40 mt-[6px]" />
      {/* Filter */}
      <div className="flex mt-[23px] justify-between">
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
      {/* Products */}
      <div className=" grid grid-cols-4 mt-[74px] gap-x-[76px] gap-y-[78px]">
        {loading
          ? Array(12)
              .fill()
              .map((_, i) => (
                <div key={i}>
                  <Skeleton.Image
                    style={{ width: "100%", height: "100%" }}
                    active={true}
                    className="aspect-[2/3] w-full"
                  />
                  <Skeleton className="mt-8" />
                </div>
              ))
          : currentItems.map((item, i) => (
              <ProductThumbnail item={item} key={i} />
            ))}
      </div>
      {/* Pagination */}
      <div className="mt-16 flex">
        {pageCount!==0 ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <svg
                width="39"
                height="12"
                viewBox="0 0 39 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39 6L29 0.226497V11.7735L39 6ZM0 7H30V5H0V7Z"
                  fill="black"
                />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="flex gap-x-[18px] mx-auto items-center"
            activeClassName="underline"
            forcePage={page}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductsContainer;
