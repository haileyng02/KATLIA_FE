import React, { useState, useEffect } from "react";
import AccountInput from "../components/AccountInput";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const AddressForm = () => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isDistrictSelected, setDistrictSelected] = useState(null);
  const [isWardSelected, setWardSelected] = useState(null);

  useEffect(() => {
    fetchProvinces();
  }, []);

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
      setDistrictSelected(false);
      setWardSelected(false);
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

      setWardSelected(false);
      setWard(sortByName(normalizeText(response.data.wards)));
    } catch (err) {
      handleApiCallError(err);
    }
  };

  // Handle user's changes in input
  const handleChange = e => {
    const key = e.target.name
    const value = e.target.value
    console.log(value)

    if (key === 'province' && value !== 'default') {
      fetchDistricts(value)
      return
    }

    if (key === 'district' && value !== 'default') {
      setDistrictSelected(true)
      fetchWards(value)
      return
    }

    if (key === 'ward' && value !== 'ward') {
      setWardSelected(true)
    }
  }

  
  return (
    <>
      <AccountInput label={"Your address"} />
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="province"
          custom={"flex-1"}
          label="Province"
          items={province}
          handleChange={handleChange}
        />
        <DefaultSelect
          name="district"
          custom={"flex-1"}
          label="District"
          items={district}
          handleChange={handleChange}
        />
      </div>
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="ward"
          custom={"flex-1"}
          label="Ward"
          items={ward}
          handleChange={handleChange}
        />
        <AccountInput custom={"flex-1"} label="Note" />
      </div>
    </>
  );
};

export default AddressForm;
