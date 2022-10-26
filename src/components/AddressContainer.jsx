import React, { useState, useEffect } from "react";
import AddressItem from "../components/AddressItem";
import AddressItem2 from "./AddressItem2";
import AddAddressModal from "../components/AddAddressModal";

const addressData = [
  {
    id: 1,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    fullAddress: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    address: '56, August Revolution',
    ward: '25195_Phuong Tan Phu',
    district: '689_Thanh pho Dong Xoai',
    province: '70_Tinh Binh Phuoc',
    note: 'hihi',
    isDefault: false,
  },
  {
    id: 2,
    name: "Nguyen Tran Cam Tien",
    phoneNumber: 528325771,
    fullAddress: "164, Phan Dinh Phung, phuong 2, Phu Nhuan, TP.HCM",
    address: '164, Phan Dinh Phung',
    ward: '27061_Phuong 02',
    district: '768_Quan Phu Nhuan',
    province: '79_Thanh pho Ho Chi Minh',
    isDefault: true,
  },
  {
    id: 3,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    fullAddress: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    address: '56, August Revolution',
    ward: '25195_Phuong Tan Phu',
    district: '689_Thanh pho Dong Xoai',
    province: '70_Tinh Binh Phuoc',
    isDefault: false,
  },
  {
    id: 4,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    fullAddress: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    address: '56, August Revolution',
    ward: '25195_Phuong Tan Phu',
    district: '689_Thanh pho Dong Xoai',
    province: '70_Tinh Binh Phuoc',
    isDefault: false,
  },
  {
    id: 5,
    name: "Nguyen Huu Trung Kien",
    phoneNumber: 975305060,
    fullAddress: "56, August Revolution, Tan Phu, Dong Xoai, Binh Phuoc",
    address: '56, August Revolution',
    ward: '25195_Phuong Tan Phu',
    district: '689_Thanh pho Dong Xoai',
    province: '70_Tinh Binh Phuoc',
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
    setCurrItem(null);
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
