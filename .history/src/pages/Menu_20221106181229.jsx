import React, {useState} from "react";
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
  //Get 
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
