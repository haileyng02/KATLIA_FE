import React, { useEffect, useState } from "react";
import { Divider, Skeleton } from "antd";
import ReactPaginate from "react-paginate";
import Feedback from "./Feedback";
import noRatingImage from "../images/no-rating.svg";
import SkeletonImage from "antd/es/skeleton/Image";

//Pagination
const itemsPerPage = 4;

const FeedbackContainer = ({ feedbacks }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!feedbacks) return;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(feedbacks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(feedbacks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, feedbacks]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % feedbacks.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="mt-[10px] py-[22px] px-[40px] bg-[#9098B12B] rounded-10">
      {currentItems != null && currentItems.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center h-[40vh]">
          <img src={noRatingImage} alt="NO RATINGS YET" />
          <p className="mt-5">NO RATINGS YET</p>
        </div>
      ) : (
        <>
          {currentItems ? (
            currentItems.map((feedback, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <Divider />}
                <Feedback feedback={feedback} />
              </React.Fragment>
            ))
          ) : (
            <div className="row gap-[10px]">
                <SkeletonImage style={{borderRadius:500}} className="h-12 w-12 flex-1 mb-7"/>
                <Skeleton active className="ml-[10px]"/>
            </div>
          )}
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
            previousLabel={
              itemOffset === 0 ? null : <p className="text-[18px]">Previous</p>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="flex gap-x-[18px] mx-auto items-center justify-end mt-[30px]"
            activeClassName="underline"
          />
        </>
      )}
    </div>
  );
};

export default FeedbackContainer;
