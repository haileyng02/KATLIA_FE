import React, { useState, useEffect } from "react";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  const [currCategory, setCategory] = useState("VIEW ALL");
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);

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

  useEffect(() => {
    getProductByGender();
  },[])

  const getProductByGender = async () => {
    try {
      const data = await appApi.get(
        routes.GET_PRODUCT_BY_GENDER('men'),
        routes.getProductByGender("men")
        );
      console.log(data);
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
    getProductByCategoryId(c.categoryId);
  };
  
  return (
    <div className="flex px-[150px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky w-[14%]">
        <CategoryBar currCategory={currCategory} categoryClick={(c)=>categoryClick(c)}/>
      </aside>
      {/* Products Container */}
      <ProductsContainer items={items} loading={loading}/>
    </div>
  );
};

export default Menu;
