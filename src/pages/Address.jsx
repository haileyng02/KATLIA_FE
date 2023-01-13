import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import AddressItem from "../components/AddressItem";
import AddAddressModal from "../components/AddAddressModal";
import noAddressIcon from '../images/no-address.svg';

const Address = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [addOpen, setAddOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [loading, setLoading] = useState(false);

  //Get all address
  const getAllAddress = async () => {
    console.log("huh");
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_ADDRESS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      if (result.data[0] == null) {
        setLoading(false);
        return;
      }
      const index = result.data?.findIndex(
        (element) => element?.setAsDefault === true
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
    setCurrItem(null);
    setAddOpen(true);
  };

  const editAddress = (id) => {
    const item = data?.filter((r) => r.id === id)[0];
    setCurrItem(item);
    setAddOpen(true);
  };

  const handleCancel = () => {
    setAddOpen(false);
  };

  //Sort addresses to move the default one to first
  const handleSetData = (index, data) => {
    const array = data;
    array.splice(0, 0, data?.splice(index, 1)[0]);
    setData(array);
  };

  useEffect(() => {
    if (currentUser) getAllAddress();
  }, [currentUser]);

  return (
    <div>
      <h1 className="account-title">Address</h1>
      <div className="mt-[30px] flex flex-col gap-y-[22px]">
        {!loading ? (
          data ? (
            data?.map((a, i) => (
              <AddressItem
                key={i}
                data={a}
                editAddress={() => editAddress(a.id)}
                currentUser={currentUser}
                getAllAddress={getAllAddress}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[35vh]">
              <img src={noAddressIcon} alt='No address'/>
              <p className="font-inter font-light text-13 mt-5">YOU HAVEN'T ADDED ANY ADDRESS</p>
            </div>
          )
        ) : (
          <Skeleton active className="mb-6" />
        )}
      </div>
      <button
        onClick={() => handleAddAddress()}
        className="default-button w-full h-[56px] mt-[22px]"
        disabled={!currentUser}
      >
        Add Address
      </button>
      <AddAddressModal
        open={addOpen}
        handleCancel={handleCancel}
        currItem={currItem}
        currentUser={currentUser}
        getAllAddress={getAllAddress}
      />
    </div>
  );
};

export default Address;
