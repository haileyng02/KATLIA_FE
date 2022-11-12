import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import DropDownBox from "./DropDownBox";
import ProductThumbnail from "./ProductThumbnail";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg";
import appApi from "../api/appApi";
import * as routes from '../api/apiRoutes'

const ProductsContainer = ({items}) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //Pagination
  const itemsPerPage = 12;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(()=>{
    console.log(items);
  },[items])

  //getProductByGender
  const getProductByGender = async () => {
    try {
      // const data = await appApi.get(
      //   routes.GET_PRODUCT_BY_GENDER_MEN, 
      //   routes.getProductByGender("men")
      //   );
      // console.log(data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } 
      else {
        console.log(err.message)
      }
    } 
  }
  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]" onClick={getProductByGender}>
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        <p className="">22 items found</p>
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
        {items.map((item, i) => (
          <ProductThumbnail item={item} key={i}/>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-16 flex">
        <ReactPaginate
          breakLabel="..."
          nextLabel= {
          <svg width="39" height="12" viewBox="0 0 39 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39 6L29 0.226497V11.7735L39 6ZM0 7H30V5H0V7Z" fill="black"/>
          </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          className='flex gap-x-[18px] mx-auto items-center'
          activeClassName='underline'
        />
      </div>
    </div>
  );
};

export default ProductsContainer;
