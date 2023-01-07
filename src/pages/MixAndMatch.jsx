import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import MixItem from "../components/MixItem";
import { getColors } from "../actions/colors";
import {
  setMixItems,
  setMixGender,
  setMixColor,
  mixReset,
} from "../actions/mixmatch";
import title from "../images/m&m-logo.svg";
import arrowIcon from "../images/arrow.svg";
import menImage from "../images/mix-men.png";
import womenImage from "../images/mix-women.png";

const { Option } = Select;

const MixAndMatch = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.colors);
  const { mixItems, mixGender, mixColor } = useSelector(
    (state) => state.mixmatch
  );
  const [colorsData, setColorsData] = useState();
  const [gender, setGender] = useState("men");
  const [colorId, setColorId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
  ]);
  const [currIndex, setCurrIndex] = useState(0);

  //Get all colors
  const getAllColors = async () => {
    try {
      const result = await appApi.get(routes.GET_ALL_COLORS);
      setColorsData(result.data);
      dispatch(getColors(result.data));
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

  //Mix and match
  const getMixAndMatch = async (gender, colorId) => {
    setLoading(true);
    setItems([
      { loading: false },
      { loading: false },
      { loading: false },
      { loading: false },
    ]);
    try {
      const result = await appApi.get(routes.MIX_AND_MATCH, {
        ...routes.getMixAndMatchParams(gender, colorId),
      });
      console.log(result.data);
      let newArray = [];
      for (let i = 1; i <= 4; i++) {
        newArray[i - 1] = result.data["item" + i].item;
      }
      setItems(newArray);
      dispatch(setMixItems(newArray));
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

  const handleMix = () => {
    getMixAndMatch(gender, colorId);
  };

  const handleReset = () => {
    setGender("men");
    setColorId(0);
    setItems([
      { loading: false },
      { loading: false },
      { loading: false },
      { loading: false },
    ]);
    dispatch(mixReset());
  };

  const handleLoading = async () => {
    if (loading) {
      setItems(
        items.map((item, i) =>
          i === currIndex
            ? { ...item, loading: true }
            : { ...item, loading: false }
        )
      );
      await new Promise((res) => setTimeout(res, 150));
      switch (currIndex) {
        case 0:
          setCurrIndex(1);
          break;
        case 1:
          setCurrIndex(3);
          break;
        case 2:
          setCurrIndex(0);
          break;
        case 3:
          setCurrIndex(2);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (colors) {
      setColorsData(colors);
    } else {
      getAllColors();
    }
    setItems(mixItems);
    setGender(mixGender);
    setColorId(mixColor);
  }, []);

  useEffect(() => {
    dispatch(setMixGender(gender));
  }, [gender]);

  useEffect(() => {
    dispatch(setMixColor(colorId));
  }, [colorId]);

  useEffect(() => {
    handleLoading();
  }, [loading, currIndex]);

  return (
    <div className="flex mx-[150px] mt-8 h-[85vh] border-1 border-black rounded-10 relative">
      {/* Select */}
      <div className="flex flex-col basis-[28.5%] bg-[#C85A275E] px-[47px] pt-[25px] h-full rounded-10">
        <img src={title} alt="MIX & MATCH" className="max-w-[248px]" />
        <h2 className="text-[25px] mt-[8.5vh]">Choose gender:</h2>
        <Select
          defaultValue="men"
          options={[
            {
              value: "men",
              label: "Men",
            },
            {
              value: "women",
              label: "Women",
            },
          ]}
          onChange={setGender}
          value={gender}
          className="w-[81%] h-[40px] mt-[1.5vh]"
        />
        <h2 className="text-[25px] mt-[4.5vh]">Choose color:</h2>
        <Select
          size="large"
          placeholder="Color"
          defaultValue={0}
          loading={!colorsData}
          onChange={setColorId}
          value={colorId}
          className="w-[81%] h-[40px] mt-[1.5vh]"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
        >
          <Option value={0}>Random</Option>
          {colorsData?.map((color, i) => (
            <Option key={i} value={color.colorId} label={color.color}>
              <div className="row gap-x-[10px] font-inter font-[16px]">
                <div
                  className={`w-5 h-5 rounded-full`}
                  style={{ backgroundColor: color.hex }}
                />
                <p className="mb-0 text-[18px]">{color.color}</p>
              </div>
            </Option>
          ))}
        </Select>
        <button
          onClick={handleMix}
          className="px-[15px] h-[65px] w-fit rounded-[20px] bg-[#C85A275E] border-[2px] border-secondary hover:bg-secondary mt-[64px] row justify-center gap-x-[16px]"
        >
          <p className="text-[25px] text-white">START MIXING</p>
          <img src={arrowIcon} alt="Arrow" />
        </button>
      </div>
      {/* Result */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="grid grid-cols-2 gap-x-[155px] gap-y-[44px]">
          {items.map((item, i) => (
            <MixItem key={i} item={item} loading={item.loading} />
          ))}
        </div>
        <img
          src={gender === "men" ? menImage : womenImage}
          alt="men"
          className="absolute h-[67%]"
        />
      </div>
      {/* Reset */}
      <p
        onClick={handleReset}
        className="text-[15px] text-[#1565C0] underline absolute right-[27px] top-[15px] cursor-pointer hover:brightness-125"
      >
        Reset
      </p>
    </div>
  );
};

export default MixAndMatch;
