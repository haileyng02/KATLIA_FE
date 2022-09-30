import React, {useState} from "react";
import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  const [currCategory, setCategory] = useState("VIEW ALL");
  const categories = [
    "VIEW ALL",
    "T-SHIRT",
    "SHIRTS",
    "HOODIES | SWEATSHIRTS",
    "POLO",
    "SUITS",
  ];
  return (
    <div className="flex px-[19px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky">
        <CategoryBar currCategory={currCategory} categories={categories} />
      </aside>
      {/* Products Container */}
      <ProductsContainer/>
    </div>
  );
};

export default Menu;
