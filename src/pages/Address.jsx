import React, { useEffect } from "react";
import AddressContainer from "../components/AddressContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const Address = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { addressID } = useParams();
  //Add address
  const addAddress = async() =>{
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

  useEffect(() => {
    addAddress()
  }, [])

  return (
    <div>
      <h1 className="account-title">Address</h1>
      <AddressContainer type={1}/>
    </div>
  );
};

export default Address;
