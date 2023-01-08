import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Tooltip } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import AddressItem2 from "./AddressItem2";
import AddAddressModal from "../components/AddAddressModal";

const AddressContainer = ({ setChosenAddress, chosenAddress }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [addOpen, setAddOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const myDiv = document.getElementById("address-container");

  //Get all address
  const getAllAddress = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_ADDRESS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      const index = result.data.findIndex(
        (element) => element.setAsDefault === true
      );
      handleSetData(index, result.data);
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

  const handleAddAddress = () => {
    setAddOpen(true);
  };

  const editAddress = (id) => {
    const item = data.filter((r) => r.id === id)[0];
    setCurrItem(item);
    setAddOpen(true);
  };

  const handleCancel = () => {
    setAddOpen(false);
    setCurrItem(null);
  };

  //Sort addresses to move the default one to first
  const handleSetData = (index, data) => {
    const array = data;
    array.splice(0, 0, data.splice(index, 1)[0]);
    setData(array);
  };

  useEffect(() => {
    if (currentUser) getAllAddress();
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      setChosenAddress(data[0]);
      myDiv.scrollTo({
        behavior: "smooth",
        left: 0,
      });
    }
  }, [data]);

  const handleChooseAddress = (a, i) => {
    setChosenAddress(a);
    const array = data;
    array.splice(0, 0, data.splice(i, 1)[0]);
    setData([...array]);
  };

  return (
    <>
      <div className="flex justify-end">
        <Tooltip title="Click to add address">
          <p
            onClick={() => handleAddAddress()}
            className="cursor-pointer hover:font-medium underline underline-offset-2"
          >
            Add Address
          </p>
        </Tooltip>
      </div>
      <div
        id="address-container"
        className="grid grid-flow-col auto-cols-[370px] overflow-x-auto gap-x-[29px] pb-4"
      >
        {!loading ? (
          data &&
          data[0] != null &&
          data?.map((a, index) => {
            return (
              <AddressItem2
                key={index}
                data={a}
                editAddress={() => editAddress(a.id)}
                chosen={a?.id === chosenAddress?.id}
                onClick={() => handleChooseAddress(a, index)}
                currentUser={currentUser}
                getAllAddress={getAllAddress}
              />
            );
          })
        ) : (
          <Skeleton active />
        )}
      </div>
      <AddAddressModal
        open={addOpen}
        handleCancel={handleCancel}
        currItem={currItem}
        currentUser={currentUser}
        getAllAddress={getAllAddress}
        myDiv={myDiv}
      />
    </>
  );
};

export default AddressContainer;
