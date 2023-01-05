import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Sale = () => {
  const [currCategory, setCategory] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gender, categoryPath } = useParams();
  const navigate = useNavigate();

  //Get sale product by gender
  const getSaleProductByGender = async (gender) => {
    setLoading(true);
    try {
      const result = await appApi.get(routes.SALE_PRODUCT_BY_GENDER(gender), {
        ...routes.getSaleProductByGenderParams(gender),
      });
      console.log(result.data);
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

  //Get sale product by category id
  const getSaleProductByCategoryId = async (id) => {
    setLoading(true);
    try {
      const result = await appApi.get(routes.SALE_PRODUCT_BY_CATEGORY_ID(id), {
        ...routes.getSaleProductByCategoryIdParams(id),
      });
      console.log(result.data);
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

  const categoryClick = (c) => {
    if (c.category === "view all") {
      navigate(`/sale/${gender}/all/page=1`);
    } else {
      navigate(`/sale/${gender}/${c.categoryId}-${c.category}/page=1`);
    }
  };

  const genderClick = (value) => {
    navigate(`/sale/${value}/all/page=1`);
  };

  // Get current category based on URL
  useEffect(() => {
    if (categoryPath === "all") {
      setCategory({ category: "view all" });
      return;
    }
    const categoryId = categoryPath.split("-")[0];
    const category = categoryPath
      .replace(categoryId + "-", "")
      .replaceAll("%20", " ");
    setCategory({ categoryId, category });
  }, [gender, categoryPath]);

  useEffect(() => {
    if (currCategory) {
      if (currCategory.category === "view all") {
        getSaleProductByGender(gender);
      } else {
        getSaleProductByCategoryId(currCategory.categoryId);
      }
    }
  }, [currCategory]);

  return (
    <div className="flex px-[150px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky w-[18%]">
        <CategoryBar
          currCategory={currCategory}
          categoryClick={(c) => categoryClick(c)}
          gender={gender}
          header={"Sale"}
        />
      </aside>
      {/* Products Container */}
      <div className="flex-1">
        <div className="row justify-center ml-[67px] gap-x-10 font-inter text-[22px] text-[#0000006B]">
          <h2
            onClick={() => genderClick("men")}
            className={`${
              gender === "men" && "font-bold text-black"
            } cursor-pointer`}
          >
            MEN
          </h2>
          <h2
            onClick={() => genderClick("women")}
            className={`${
              gender === "women" && "font-bold text-black"
            } cursor-pointer`}
          >
            WOMEN
          </h2>
        </div>
        <ProductsContainer
          items={items}
          loading={loading}
          setLoading={setLoading}
          gender={gender}
          currCategory={currCategory}
          setItems={setItems}
          getProductByCategoryId={getSaleProductByCategoryId}
          getProductByGender={getSaleProductByGender}
        />
      </div>
    </div>
  );
};

export default Sale;
