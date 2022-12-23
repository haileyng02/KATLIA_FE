import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Skeleton } from "antd";
import ProductThumbnail from "./ProductThumbnail";

//Pagination
const itemsPerPage = 12;

const ProductItems = ({ loading, items }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();
  const { page } = useParams();
  useEffect(() => {
    const pageNumber = parseInt(page) - 1;
    const newOffset = (pageNumber * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  }, [page, items]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, items]);

  const handlePageClick = (event) => {
    let path = window.location.pathname;
    path = path.substring(0, path.indexOf("page="));
    navigate(path + "page=" + (event.selected + 1));
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Products */}
      <div className=" grid grid-cols-4 gap-x-[76px] gap-y-[78px]">
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
          : currentItems?.map((item, i) => (
              <ProductThumbnail item={item} key={i} />
            ))}
      </div>
      {/* Pagination */}
      <div className="mt-16 flex">
        {pageCount !== 0 ? (
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
            forcePage={parseInt(page) - 1}
          />
        ) : null}
      </div>
    </>
  );
};

export default ProductItems;
