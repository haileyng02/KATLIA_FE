import React, {useState} from "react";
import appApi from "../api/appApi";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const categories = [
  "VIEW ALL",
  "T-SHIRT",
  "SHIRTS",
  "HOODIES | SWEATSHIRTS",
  "POLO",
  "SUITS",
];

const Menu = () => {
  const [currCategory, setCategory] = useState("VIEW ALL");
  
  const categoryClick = (c) => {
    setCategory(c);
  }
  //Get category by gender
  const getCategoryByGender = async () => {
    try {
      await appApi.get(
        routes.GET_CATEGORY_BY_GENDER,
        routes.getCategoryByGender('')
      )
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
    <div className="flex px-[38px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky">
        <CategoryBar currCategory={currCategory} categories={categories} categoryClick={(c)=>categoryClick(c)}/>
      </aside>
      {/* Products Container */}
      <ProductsContainer/>
    </div>
  );
};

export default Menu;
