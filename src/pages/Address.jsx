import React, { useState, useEffect } from "react";
import AddressItem from "../components/AddressItem";
import AddAddressModal from "../components/AddAddressModal";

const addressData = [
  {
    id: 1,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    address:
      "Dormitory Area B, National University, Ho Chi Minh City, Mac Dinh Chi Street, Dong Hoa Ward, Di An City, Binh Duong",
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
];

const Address = () => {
  const [addressBook, setAddressBook] = useState([...addressData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currItem,setCurrItem] = useState(null);

  useEffect(() => {
    sortAddress(getDefaultIndex());
  }, []);

  const addAddress = () => {
    setCurrItem(null);
    setIsModalOpen(true)
  }

  const editAddress = (id) => {
    setCurrItem(addressBook.filter(r => r.id === id)[0]);
    setIsModalOpen(true);
  }

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
    <div>
      <h1 className="account-title">Address</h1>
      <div className="mt-[30px] flex flex-col gap-y-[22px]">
        {addressBook.map((a, i) => (
          <AddressItem key={i} data={a} editAddress={() => editAddress(a.id)}/>
        ))}
      </div>
      <button 
      onClick={() => addAddress()}
      className="default-button w-full h-[56px] mt-[22px]">
        Add Address
      </button>
      <AddAddressModal isModalOpen={isModalOpen} handleCancel={handleCancel} currItem={currItem}/>
    </div>
  );
};

export default Address;
