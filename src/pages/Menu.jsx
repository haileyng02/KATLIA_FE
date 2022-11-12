import CategoryBar from "../components/CategoryBar";
import ProductsContainer from "../components/ProductsContainer";

const Menu = () => {
  return (
    <div className="flex px-[38px] pt-[62px]">
      {/* Sidebar */}
      <aside className="sticky">
        <CategoryBar/>
      </aside>
      {/* Products Container */}
      <ProductsContainer/>
    </div>
  );
};

export default Menu;
