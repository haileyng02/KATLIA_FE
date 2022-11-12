import React, { useState } from "react";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  const [currCategory, setCategory] = useState("VIEW ALL");
  const [items,setItems] = useState([]);

  const getProductByCategoryId = async (id) => {
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
  };
  
  const categoryClick = (c) => {
    setCategory(c);
    getProductByCategoryId(c.categoryId);
  };
  
  return (
    <div className="flex px-[38px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky">
        <CategoryBar currCategory={currCategory} categoryClick={(c)=>categoryClick(c)}/>
      </aside>
      {/* Products Container */}
      <ProductsContainer items={items}/>
    </div>
  );
};

export default Menu;
