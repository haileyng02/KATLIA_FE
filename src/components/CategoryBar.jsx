import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const CategoryBar = ({ categoryClick, currCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get category by gender
  const getCategoryByGender = async () => {
    try {
      const data = await appApi.get(
        routes.GET_CATEGORY_BY_GENDER("men"),
        routes.getCategoryByGender("men")
      );
      let categories = [{ category: 'VIEW ALL' }]
      setCategories([
        ...categories,
        ...data.data.map((c, i) => {
          return {
            ...c,
            category: c.category.toUpperCase(),
          };
        }),
      ]);
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
    getCategoryByGender();
  }, []);

  return (
    <div className="">
      {/* Menu Title */}
      <h1 className=" text-[35px] leading-[44px] font-bold mb-[59px]">Men</h1>

      {/* Side category bar */}
      <nav>
        {loading ? (
          <Skeleton />
        ) : (
          <ul className={`space-y-[63px]`}>
            {categories.map((c, i) => (
              <li
                className={`cursor-pointer hover:text-black ${
                  currCategory.category === c.category ? "text-black" : "text-menu-nav"
                }`}
                key={i}
                onClick={() => categoryClick(c)}
              >
                {c.category}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default CategoryBar;
