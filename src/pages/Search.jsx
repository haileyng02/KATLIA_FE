import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ProductItems from "../components/ProductItems";
import noResultIcon from "../images/no-result.svg";

const Search = () => {
  const { searchValue, page } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(searchValue);
    searchProduct(searchValue);
  }, [searchValue]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  //Search products
  const searchProduct = async (value) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.SEARCH_PRODUCTS,
        routes.getSearchProductsBody(value)
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

  return (
    <div className="px-[150px] pt-8">
      <h1 className="font-inter font-semibold text-[22px] uppercase">
        {searchValue}
      </h1>
      <Divider className="mt-[20px] mb-[12px]" />
      <p className="font-inter text-[18px] mb-[49px]">
        {items.length + " RESULTS"}
      </p>
      {!loading && items.length === 0 ? (
        <div className="w-full flex flex-col items-center py-[80px]">
          <img src={noResultIcon} alt="No result" />
          <h1 className="font-inter font-bold text-[14px] mt-[40px]">NO SEARCH RESULT FOUND</h1>
          <p className="font-inter text-[13px] mt-[10px]">{`NO RESULTS FOUND FOR THE SEARCH: "${searchValue.toUpperCase()}"`}</p>
        </div>
      ) : (
        <ProductItems loading={loading} items={items} />
      )}
    </div>
  );
};

export default Search;
