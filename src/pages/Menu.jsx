import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  const [currCategory, setCategory] = useState({ category: "view all" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get current category based on URL
  useEffect(() => {
    let data = window.location.pathname.substring(5);
    if (data === "") {
      setCategory({ category: "view all" });
      getProductByGender();
      return;
    }
    const categoryId = data.split("-")[0];
    const category = data.slice(data.indexOf("-") + 1).replaceAll("%20", " ");
    setCategory({ categoryId, category });
    setLoading(true);
    getProductByCategoryId(categoryId);
  }, [navigate]);

  const getProductByCategoryId = async (id) => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_BY_CATEGORY_ID(id),
        routes.getProductByCategoryId(id)
      );
      setItems(data.data);
      setLoading(false);
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

  const getProductByGender = async () => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_BY_GENDER("men"),
        routes.getProductByGender("men")
      );
      setItems(data.data);
      setLoading(false);
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

  const categoryClick = (c) => {
    setCategory(c);
    setLoading(true);
    if (c.category === "view all") {
      navigate(`/men`);
      getProductByGender();
    } else {
      navigate(`/men/${c.categoryId}-${c.category}`);
      getProductByCategoryId(c.categoryId);
    }
  };

  return (
    <div className="flex px-[150px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky w-[18%]">
        <CategoryBar
          currCategory={currCategory}
          categoryClick={(c) => categoryClick(c)}
        />
      </aside>
      {/* Products Container */}
      <ProductsContainer items={items} loading={loading} />
    </div>
  );
};

export default Menu;
