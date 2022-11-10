import React, { useEffect } from "react";
import forMenPic from "../images/home_for-men.png";
import FeaturedThumbnail from "../components/FeaturedThumbnail"
import appApi from "../api/appApi";
import * as routes from '../api/apiRoutes'

const ForMenFeatured = () => {

  const featuredItems = [
    {id: 1,title: 'Leaf print shirt', image: 'https://s3-alpha-sig.figma.com/img/0a13/1a1c/ade33891a43841aa9fde3aecde3febdc?Expires=1664755200&Signature=TgaoM596TOhfFbUGfZHJyMw943L5gbFIY3vEuL~L8wGGYulEy0FJYgXa4vuIYNc3X48VKL-Ep5sKrSk-QRQbvr43xUsACYPMVjl52~UDteT-KfSbkCa0jeB7lgODW3KPMyI~rBRb6eFHyOf7loybytYaAPnWMtlCDsbcy1Q01zfi-gavO75Uwmn-9xublWpCKOrNA4JuA0dw6DbFgV4Hpi2LgvwHpqeGqI4GEaib8Wu4fO2uCwg3tXjmHRiPILlLsITTgm78lbLx0ikr0XTuptT1P~F7vrywAyXtVujGpReEspu5DPaxdXbf~C1Zl~00f5RKTR5aupqbjx3ysRyXFQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'},
    {id: 2,title: 'Linen suit jacket', image: 'https://s3-alpha-sig.figma.com/img/017c/6ba5/e29d0c2e949f17fa5cc8cf20c6f6d761?Expires=1664755200&Signature=PlsW~EoIbEZq~pHVbxGJ9d5grizs3b4hoL0OpLOZu6ol-U83GYhMiFZqFWW1DAjd2j8T5RYnGPd12fpG8ILhokMO6ob6PFufPL13cykjeeKR7n90IsAQ4S85XpEGJQ69p0qHixKkilLbuhduOmGlISE91jzIo5-XEmOGWbXO-TCabTH2XjsDV81rp~hpmrhk3yUlnoWKLFQ28LZV8gTURCTluRMupTZijNkuDZKRAG0h0r~XI5Nikxr282KCPCcuKSohi~YCYBWSUzLRi3sJTBJ~63maJPpWUDMSxI0xMl3go~69wT14ixhsbw3bH2X~-D9vOry9HqgK8n67y2QVyw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'},
    {id: 3,title: 'Crochet hat', image: 'https://s3-alpha-sig.figma.com/img/e3fd/d97f/08416ef6504d0425a3f8811fe5b916e0?Expires=1664755200&Signature=OhQ8~adDS10-TBb3BYbsaPz56edEkYweKLoGJx0tLWm-V7ZXNcLov0ef12dtiYTMi7gOUg8PubDhkkXprITU4Jz~C5PKhX6T89RB8wUvSL~cBEaxqQRuGYBf-T-cJBFgz241NoC-QnBBLZSeMhc4petv90lJkSuRrk6xJ-Wh0WuYdHsWNRZUVZDqSVLrAoYKyrSg97AyNPIqCC0UW8IcrZNcfTu0YzWKccwHxiSD3MGGv1avbq5gL8amRdERIFCr5UjtVLGrcTAvquvAPyzaajO~oUvB9HbsNb6qRgZsc2SXreyyEyfLvDOUqOIV3OlXMaGYiKbR30aWSgO~I7juNQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'},
    {id: 4,title: 'Shirt with comics', image: 'https://s3-alpha-sig.figma.com/img/c896/af0a/d7b6ea9c1757d4dea1faac397b6a1df9?Expires=1664755200&Signature=KUGuL2b1erjWXbwxsK0O6Rtsi4oKGi1eur1hyQbDI~0q2AW8Ge6kZ5bcgkc1Y~97GM6z9Ves3b7RPBD4GEanPvh3FK1Uj1H6J~e0gduALFDIBT3BaGipz6OUFLtnYdq3b7qtQg0fbC4o6c4tfJzAhsc4mlCq9wtrwHtiQ-5AnXLyhsIrOUBdC8Jtzqf5B7GoWvfaJGcMFLwzOnKwOTJJbq9xHh5sQfKemhdBDXpo2wZpnClz4j9GLwbw6dd1mhMGVq8AjqUdkjNSJ56VR7dJdDYqiDCxwPNCXQwSHQ23g3wTMFdKqWydJr-KP12H6aUnETKEeS36STTMZWZmmKOsBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
  ];

  // Get top 4 
  const getTop4 = async () => {
    try {
      const data = await appApi.get(
        routes.GET_TOP4_MEN,
        routes.getTop4Body('men')
      )
      console.log(data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } 
      else {
        console.log(err.message)
      }
    } 
  }

  useEffect(() => {
    getTop4()
  }, [])

  return (
    <div className="mt-[59px] px-[45px] relative pt-[130px]">
      {/* Title */}
      <img
        src={forMenPic}
        alt="FOR MEN"
        className="absolute top-0 left-[202px] w-[234px] h-[156px]"
      />
      {/* Featured */}
      <div className="flex justify-between">
        <FeaturedThumbnail 
        item={featuredItems[0]} 
        container='basis-[20.4%] mt-[132px]'
        image='aspect-[11/15]'/>
        <FeaturedThumbnail 
        item={featuredItems[1]} 
        container='basis-[20.4%] mt-[132px]'
        image='aspect-[11/15]'/>
        <FeaturedThumbnail 
        item={featuredItems[2]} 
        container='basis-[21.5%] self-start'
        image='aspect-square'/>
        <FeaturedThumbnail 
        item={featuredItems[3]} 
        container='basis-[20.4%] mt-[145px]'
        image='aspect-[11/15]'/>
      </div>
    </div>
  );
};

export default ForMenFeatured;
