import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  const [currCategory, setCategory] = useState({ category: "view all" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gender, categoryPath } = useParams();
  const navigate = useNavigate();

  // Get current category based on URL
  useEffect(() => {
    setCategory({ category: "view all" });
  }, [gender]);

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
  }, [categoryPath]);

  useEffect(() => {
    if (currCategory.category === "view all") {
      getProductByGender(gender);
    } else {
      getProductByCategoryId(currCategory.categoryId);
    }
  }, [currCategory]);

  const categoryClick = (c) => {
    if (c.category === "view all") {
      navigate(`/products/${gender}/all/page=1`);
    } else {
      navigate(`/products/${gender}/${c.categoryId}-${c.category}/page=1`);
    }
  };

  const getProductByCategoryId = async (id) => {
    setLoading(true);
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_BY_CATEGORY_ID(id),
        routes.getProductByCategoryId(id)
      );
      setItems(data.data);
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

  const getProductByGender = async (gender) => {
    setLoading(true);
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_BY_GENDER(gender),
        routes.getProductByGender(gender)
      );
      setItems(data.data);
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
    <div className="flex px-[150px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky w-[18%]">
        <CategoryBar
          currCategory={currCategory}
          categoryClick={(c) => categoryClick(c)}
          gender={gender}
        />
      </aside>
      {/* Products Container */}
      <ProductsContainer items={items} loading={loading} />
    </div>
  );
};

export default Menu;
