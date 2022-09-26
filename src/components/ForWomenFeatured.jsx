import React from "react";
import forWomenPic from "../images/home_for-women.png";
import FeaturedThumbnail from "../components/FeaturedThumbnail";

const ForWomenFeatured = () => {
  const featuredItems = [
    {
      id: 5,
      title: "Leaf print shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/1ef9/91e6/17fdf063af0b970413df3a05bca10b14?Expires=1664755200&Signature=es1RkpXZ-nWi5ULD6BvysgS412aJRhuUuotyZNt1yPfkWJTLkHdWpeQQw01GhDpACMUAftg5vZ8CzkIsv6IPa7B5P1Q44kkPdIUSyVoQc7KOM95ffzrdPjS4FtLdnQIoGwJqK8WFjAjrw7scYwteFqYh7vgwo8VzAlRp5qWGLDw1pydMOVZwgrC6gzydJNeWuXotYJVT0ANM1SzsESHBfVxYslrZ5gpC-nYuWg9Om1-PCFs-yMMFoBHBFbehab4zEGa7u--6j7G6oKt07hId0DnO1OW7L7Mi~ug-hXTHD2Fvht~TLE9s2xPHc2wi8GkdFAXe~qF0ZButxmDmOQTK5Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      id: 6,
      title: "Linen suit jacket",
      image:
        "https://s3-alpha-sig.figma.com/img/4813/2e04/fff1a21c04ae6e695a416bcea4069aed?Expires=1664755200&Signature=CNF7UZ1IR1TnYC9XZmrH4446Q9uHFMtTq0RJmA9M1t0sBKqClB7d90oBfxQVH-xSgqLKexGap6ScQKZ~YxMC9jQSuKYfw1VY9tXxvVa29BaWLO6o9u-u482PxJzTvPx96nVfZ80~TRDVwCrZyuKa1Ybn1AH-s5XT6OXD9CiYldC4hFBdzSmVKPOJ1U-GtOAlWvjSwVR1DjArSTiQoodqJOL7tOEPvM6f0vG-FjhNOHWZxj1Qqhohn-BYTSO6n8CmXou2QEnk-dBdpIZUR~ItFVTZMb3WhfiDifHzLLYNw8n4YTC7DZueleCSYA4YC0slkIhxyIMa5x5lUL2CCP1s3Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      id: 7,
      title: "Crochet hat",
      image:
        "https://s3-alpha-sig.figma.com/img/6c33/32b1/57dcc5654e54dc2fa518eceee68e5626?Expires=1664755200&Signature=VXZczuUjgRRSbnb~sWOtPXBS1nC-GSG2peiYur~yyUWVsZ0Hcxb43Ueg3hAjF7~Eo1PhjAF2UIdjVkQhB0ss4sV1y5adfwF~PsNhQ~l8qbBUSnYE78rpKbQYAq1m76QpkOsQ-BkZ6lS7USnOQKCscyBvv0j6IuQlaDm7VEeQrInUpgZTvBQaGmTE4-o9WgWChlgM54qRHLDfxdQAm8N9dCKgZbhgw3mJuO4orw8NeqfYp1SJF5TFRQLiUaW2XeVVcCVWti2aA1hLHotRqOIweWUTO0~fSklQWdzCG5Tok~IdIFnkFHU89Ry831eH7BTuTbR1VsHqxhluuE41qMN1Kg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      id: 8,
      title: "Shirt with comics",
      image:
        "https://s3-alpha-sig.figma.com/img/531b/dc8f/e74da7fc846060bdd0653bf2728d990f?Expires=1664755200&Signature=MrEENyaXtHX2MGjAz11aaRqKLhchX85U9pd7whQQwMzZ89Puv2p-2DN4OmqLvtDOYZjSwPFRx8VpMYZyhnwaN-G4sBxz0AijPCmeOY1rSxOBoe8vHUQ7wBUIKs-ePCsFZkDsNlBd12X9Gl~v2nCHkMYafBDMV41WK3dDCLWwY4dISmWo-oCLe1hK4IZ~IhCfX6arH7dEdZkW7ehv4WyzMsEFmMWLism8sr--SsWSxAWDtJOG4srO64UC8yJn3O4vmiMaiYSmgNldzXGRJlxV6yMj5UApQYPRk97TxFZdOISSbWMpoIP7Hm5fqWjoV-Vu3xnSXIwnd1YdYkM4vTE2pQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
  ];
  return (
    <div className="mt-[59px] px-[57px]">
      {/* Title */}
      <img
        src={forWomenPic}
        alt="FOR WOMEN"
        className="max-w-[333px] h-auto ml-[579px]"
      />
      {/* Featured */}
      <div className="flex justify-between mt-[89px]">
        <FeaturedThumbnail 
        item={featuredItems[0]} 
        container="basis-[20.74%]" 
        image="aspect-[275/394]"/>
        <FeaturedThumbnail 
        item={featuredItems[1]} 
        container="basis-[18.3%]" 
        image="aspect-[243/315]"/>
        <FeaturedThumbnail 
        item={featuredItems[2]} 
        container="basis-[23.8%]" 
        image="aspect-[315/452]"/>
        <FeaturedThumbnail 
        item={featuredItems[3]} 
        container="basis-[19.08%]" 
        image="aspect-[253/404]"/>
      </div>
    </div>
  );
};

export default ForWomenFeatured;
