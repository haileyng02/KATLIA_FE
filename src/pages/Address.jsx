import React, { useEffect } from "react";
import AddressContainer from "../components/AddressContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const Address = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { addressId } = useParams();
  
  //Get all address
  const getAllAddress = async() => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2NzE0NTgxNzUsImV4cCI6MTY3MTU0NDU3NX0.gztvSo8P3ijc2wN6tB73t1R8QSMyjS09C0mRNKmoHL8";
      const result = await appApi.get(
        routes.GET_ALL_ADDRESS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    getAllAddress()
  }, [])

//Update address
const updateAddress = async () => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2NzE0NTgxNzUsImV4cCI6MTY3MTU0NDU3NX0.gztvSo8P3ijc2wN6tB73t1R8QSMyjS09C0mRNKmoHL8";
    console.log({
      ...routes.getAccessTokenHeader(token),
      ...routes.getUpdateAddressIdParams("63a06f55b27729d75aca888d")
    });
    const result = await appApi.put(
      routes.UPDATE_ADDRESS("63a06f55b27729d75aca888d"),
      routes.getAddAddressBody("Nguyen Huu Trung Kien", "0338411557", "KTX Khu B, Toa C01", "Binh Duong", "Di An", "Dong Hoa", "", true),
      {
        ...routes.getAccessTokenHeader(token),
        ...routes.getUpdateAddressIdParams("63a06f55b27729d75aca888d")
      }
    );
    console.log(result);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(err.message);
    }
  }
}

useEffect(() => {
  updateAddress()
}, [])

  // //Delete address
  // const deleteAddress = async() => {
  //   try {
  //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2NzE0NTgxNzUsImV4cCI6MTY3MTU0NDU3NX0.gztvSo8P3ijc2wN6tB73t1R8QSMyjS09C0mRNKmoHL8";
  //     const result = await appApi.delete(
  //       `/address/deleteAdress/${addressId}`,
  //       {
  //         headers: {
  //           Authorization: 'Bearer ' + token
  //         },
  //         params: {
  //           id: addressId
  //         }
  //       }
  //     );

  //     console.log(result);
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else {
  //       console.log(err.message);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   deleteAddress()
  // }, [])

  //Add address
  const addAddress = async() => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2NzE0NTgxNzUsImV4cCI6MTY3MTU0NDU3NX0.gztvSo8P3ijc2wN6tB73t1R8QSMyjS09C0mRNKmoHL8";
      const result = await appApi.post(
        routes.ADD_ADDRESS,
        routes.getAddAddressBody("Nguyen Huu Trung Kien", "0975305060", "KTX Khu B", "Binh Duong", "Di An", "Dong Hoa", "", true),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }
  return (
    <div>
      <h1 onClick={addAddress} className="account-title">Address</h1>
      <AddressContainer type={1}/>
    </div>
  );
};

export default Address;
