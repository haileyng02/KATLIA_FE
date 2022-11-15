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
  const [gender, setGender] = useState("men");
  const navigate = useNavigate();

  // Get current category based on URL
  useEffect(() => {
    const path = window.location.pathname.substring(1);
    const genderPath = path.substring(0, path.indexOf("/"));
    if (genderPath !== gender) setGender(genderPath);

    const data = path.substring(genderPath.length + 1);
    if (data.includes("all")) {
      setCategory({ category: "view all" });
      getProductByGender(genderPath);
      return;
    }
    const categoryId = data.split("-")[0];
    let category;
    if (!data.includes("&page=")) {
      category = data.slice(data.indexOf("-") + 1).replaceAll("%20", " ");
    } else
      category = data
        .slice(data.indexOf("-") + 1, data.indexOf("&page="))
        .replaceAll("%20", " ");
    // if (category !== currCategory.category) {
      setCategory({ categoryId, category });
      getProductByCategoryId(categoryId);
    // }
  }, [navigate]);

  // useEffect(() => {
  //   if (currCategory.category === "view all") {
  //     return;
  //   }
  // }, [currCategory]);

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

  const categoryClick = (c) => {
    setCategory(c);
    if (c.category === "view all") {
      navigate(`/${gender}/all`);
    } else {
      navigate(`/${gender}/${c.categoryId}-${c.category}`);
    }
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
