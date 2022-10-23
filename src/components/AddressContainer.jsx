import React, { useState, useEffect } from "react";
import AddressItem from "../components/AddressItem";
import AddressItem2 from "./AddressItem2";
import AddAddressModal from "../components/AddAddressModal";

const addressData = [
  {
    id: 1,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    isDefault: false,
  },
  {
    id: 2,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    isDefault: true,
  },
  {
    id: 3,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    isDefault: false,
  },
  {
    id: 4,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    isDefault: false,
  },
  {
    id: 5,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    isDefault: false,
  },
];

const AddressContainer = ({ type, custom }) => {
  const [addressBook, setAddressBook] = useState([...addressData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  useEffect(() => {
    sortAddress(getDefaultIndex());
  }, []);

  const addAddress = () => {
    setCurrItem(null);
    setIsModalOpen(true);
  };

  const editAddress = (id) => {
    setCurrItem(addressBook.filter((r) => r.id === id)[0]);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDefaultIndex = () =>
    addressBook.findIndex((element) => element.isDefault === true);

  //Sort addresses to move the default one to first
  const sortAddress = (index) => {
    const array = addressBook;
    array.splice(0, 0, addressBook.splice(index, 1)[0]);
    setAddressBook([...array]);
  };

  return (
    <>
      {type === 2 ? (
        <div className="grid grid-flow-col auto-cols-[370px] overflow-x-auto gap-x-[29px] pb-4">
          {addressBook.map((a, i) => {
            return (
              <AddressItem2
                key={i}
                data={a}
                editAddress={() => editAddress(a.id)}
              />
            );
          })}
        </div>
      ) : (
        <>
          <div className="mt-[30px] flex flex-col gap-y-[22px]">
            {addressBook.map((a, i) => (
              <AddressItem
                key={i}
                data={a}
                editAddress={() => editAddress(a.id)}
              />
            ))}
          </div>
          <button
            onClick={() => addAddress()}
            className="default-button w-full h-[56px] mt-[22px]"
          >
            Add Address
          </button>
        </>
      )}
      <AddAddressModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        currItem={currItem}
      />
    </>
  );
};

export default AddressContainer;
