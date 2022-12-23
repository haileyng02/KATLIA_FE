import React, { useState,useEffect } from "react";
import AccountInput from "./AccountInput";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const AddressSelect = ({ form,open,currItem,containNote,validate }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    if (open!=null && !open) return;
    fetchProvinces();
    if (currItem) {
      setCurrAddress(currItem);
    } 
  }, [currItem, form, open]);

  const setCurrAddress = async (currItem) => {
    form.setFieldsValue({
      province: currItem.province,
    });

    await fetchDistricts(currItem.province);
    form.setFieldsValue({
      district: currItem.district,
    });

    await fetchWards(currItem.district);
    form.setFieldsValue({
      ward: currItem.ward,
    });
  };

  // Fetch province at first render\
  const fetchProvinces = async () => {
    try {
      const response = await provinceApi.get("/p");
      setProvince(sortByName(normalizeText(response.data)));
    } catch (err) {
      handleApiCallError(err);
    }
  };

  // Fetch district after selected province
  const fetchDistricts = async (province) => {
    try {
      const str = String(province);
      const code = str.substring(0, str.indexOf("_"));
      const response = await provinceApi.get(`p/${code}`, {
        params: {
          depth: 2,
        },
      });
      setDistrict(sortByName(normalizeText(response.data.districts)));
      setWard([]);
    } catch (err) {
      handleApiCallError(err);
    }
  };

  // Fetch wards after selected district
  const fetchWards = async (district) => {
    try {
      const str = String(district);
      const code = str.substring(0, str.indexOf("_"));
      const response = await provinceApi.get(`d/${code}`, {
        params: {
          depth: 2,
        },
      });

      setWard(sortByName(normalizeText(response.data.wards)));
    } catch (err) {
      handleApiCallError(err);
    }
  };

  const handleChangeProvince = (value) => {
    if (value !== "default") {
      fetchDistricts(value);
    }
  };

  const handleChangeDistrict = (value) => {
    if (value !== "default") {
      fetchWards(value);
    }
  };
  return (
    <>
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="province"
          custom={"flex-1"}
          label="Province"
          items={province}
          handleChange={handleChangeProvince}
          rules={validate && [{ required: true, message: "Please select province" }]}
        />
        <DefaultSelect
          name="district"
          custom={"flex-1"}
          label="District"
          items={district}
          handleChange={handleChangeDistrict}
          rules={validate && [{ required: true, message: "Please select district" }]}
        />
      </div>
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="ward"
          custom={"flex-1"}
          label="Ward"
          items={ward}
          rules={validate && [{ required: true, message: "Please select ward" }]}
        />
        {containNote && <AccountInput name="note" custom={"flex-1"} label="Note" />}
      </div>
    </>
  );
};

export default AddressSelect;
