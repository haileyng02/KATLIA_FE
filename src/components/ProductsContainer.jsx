import React from "react";
import DropDownBox from "./DropDownBox";
import ProductThumbnail from "./ProductThumbnail";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg"

const ProductsContainer = () => {
  const items = [
    { 
      image: 'https://s3-alpha-sig.figma.com/img/4c56/008b/932fd590d7eda180e8e196839858811e?Expires=1665360000&Signature=BO6KH9TbhJzW35-4b7imViJsp3IXLZEPIRX6rMawJ8~SV6dNoWXY1EGotufDoSv1fBs03x40HLB-CC24Bt8HVaK6X3SCmtnSgGSKJUPXghJMLx2LFxPLQspfFxP~nrJwjNY94I~pTvnlQlO~sRPQP6MO7c-4zXlMjC05axj1GC9VOVF5~57iAT0HfwNw65hhpTOhKbB9XoKAuWCMZ7bh~juPT11ldOOpj1pq4QFDFY~aHXPvv2V-rOezkNSnzMmRADphADh2HuRFJ2wgH175Thz0vYuVXESD6pZ2X7yms1fsbZ4n5LznBH4DLt8OyjSZyMdG8dR87BSa0lK05igfog__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 4,
      name: 'OXFORD SHIRT',
      price: 41.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/8b90/eb1e/3bb4dc0faec50da55349179dfe5c4e55?Expires=1665360000&Signature=VnjFtmjiPidcjQPstTWw58TwPyUtK7Q-7G5ubEz6X0oKQlqSbG378-foA-P-1JtlLs0Jf8tnNgMizL4JF92vrAZ3nd4-Kltmz5uNO4U9IaUxtNovaLRZcdH3zeqWa7pYAUj3tpnj96d84Q3Yev3CuUsrO1Cs5IeVh-YNI0s2zk5ry1ciDSWwnUYLHo1KE0qLIUEYQiJPyh~uwkXycnZcSrM~JZrZfQehPYcQfSltDBJpa36~gqDuIJk45rEs56IGU0KZBd4k5IDcmv61vKBbJnjol2-BW1HQnN2kmeZXL7k-drBdWcQiAOEB656pUmGJoiG32IxWBHDMIvGkJeT7-w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 3,
      name: 'PREMIUM STRIPED OXFORD SHIRT',
      price: 51.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/2ba6/611e/cba3c115578b10df956f17d18438e604?Expires=1665360000&Signature=VSyb6T8f0kuN6HVnWMxysDU0knPp7eWVSPXbL5NODsqje9GRw92WTD8GeDjKTSGUkTKxaZgm3BJqlkPqavongBeCBfquj7epfmAKoHzUGbJkkbSSa146YFD9E1HvPzIxUOJ1YCP~bTUrYl7JitFGd-~qiAmCd3u0XJkepZKUfe7a1H~Gkr1w8Cw~1u0N8yszEEmN6GeAveCW9hTtZVNa0FzP1foGkWJUdG-JtorqZaMJ2LXU63vTjpVCRpW4oHmQUHrX6WLvVufVrZ9wK3RmCh6um-Dot0n3M0lig-zFOnCNKHxv9ob7dw5hqN-SLv9nFqPmTgD9~YyBA5KeDFfEpA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 4,
      name: 'PREMIUM OXFORD SHIRT',
      price: 51.50
    },
    { 
      image: 'https://s3-alpha-sig.figma.com/img/a118/9898/6684907a6eb89bc834cfbdc229d7c8aa?Expires=1665360000&Signature=UQno1h-QX0ETdlqDjIv5O0PmWmnQh2u13Fz3UWQ6AM-MVZAv-VXqTbPXB~UncRoV1LRoQePv6EGU8Emu5isbEysCWxHzs3samDkwvqc46wsAfUrF8QWvkgDQ8ZBmHFHqUmv5qqnxdMmCc5N0XiFBomc67gpKDgl6FgMCqx1RDn2UyJFZFeKKalI0CJupWdI-UwXemm9JbO1veNrekeJvsolLUbuQl2PwSkS3nXm-NYirNOgjE~fF71CGqxz7-OYqivrXnomNKV~~5jN9SvV7XXpybXtk6z7N5aK7ivPcRfz8v9OdU4LdJBPiDQV7gaicXrRTYMLl~IkMme2MrTBJPw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 3,
      name: 'JOGGER BERMUDA SHORTS',
      price: 51.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/93cb/9b26/400addf10bd9bad25608d78e12ec57d0?Expires=1665360000&Signature=X3XT3tCc5FTiOS-r5zHeopnkCFfKAGE2t4i-6lHnQhH-jUxWtxwqRZ5J24H~Cz0nQQznAjRoU~DawaB-3TPKxdjqz0AldMMvuA7O~p1glvDCfIiP0sj0ElPmG5ONDrJjTFHpyioNKwAN8aRD4YKHVAx10E3Cf4D4BeoAmgQ6VVjjsv9hAKv-4~C-P5KiEq7jteDoASpb5ZiXlslhMGEijlCv-heZZ60pNvblrxlOPsG2oVuxVvvCxwSSu65ap4ZBDvjpIsFB7qpA5E6cHBna22CQxfixxyVo60KC8JmXnCYVbArtwA4FfpR39~O-b0UUjmsSv4iJEVOGTeq7yIzRsg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 4,
      name: 'BASIC DENIM JACKET',
      price: 51.50 
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/c576/178b/56d1d246e4882a3123351aa573eb5052?Expires=1665360000&Signature=PaTpaDk-cc3Ez3StubJzQ~zBvZqnW18rEQ-F0CnU3BC-CIa3ItZ~o38LtqSoDsRR8jmcqAHLUOl5Hhp3EBOXFz1Fc6sgMnxswj1Kc0j2Egt7SDDt3QOXO4rHsBzrtAl20jxt8AtJTwbTZC4of3n6X3Q19ctlx0gx03Qx72vF7Jd3s2KbFM7xWHkqAs5orxoJRn~Fj6J3VaTOJV0TIHLBOPOhJ3Bjp8oqxEfzWOvfYqm9p1m27ZMG9zCpAxf11W-RLbsfkwebvn0oiC33gduVS5bQt2yNXBhSHesvSbFLYjtyHOrgCUZMtelBxD8ICRmql2h8Ce4V~jPvvRVjkJJD9w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 4,
      name: 'BASIC BOMER JACKET',
      price: 51.50
    },
    { 
      image: 'https://s3-alpha-sig.figma.com/img/1a38/eb74/e9f3f6f4bb4b4c127f3b2fb964af4189?Expires=1665360000&Signature=gjnDXsSxkBkGtA4P5cifbiYvtcxbxDOXaH4wwWhmqZlbLS1p7wJDu7xgved5zbBDA9-b3Q~E5Hlhik3qcwqu1p4SmX8x7YRtxKvcg6tRiLEwHFS1aIWbyj7LfFLmvSQfgDZAht3zdGOA~LAkRGLwXRNG9zLVjGWhNrr70NK9t8Au7wrYA5ODeYtc9dqUoAGDKdt7-QBdKjAz8E9EOjhO9WGB2dX8cfyAQkfHSD9dnHUUz46MxyeToAaWe2PrKt3ymUO9j2eDmmmjw6msoy718gSHXU5U6rjUh~7xFZGjYau45TAg4kJq2H195u2lzgLAsy2gDt8nJoeskfLiwSzuMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 3,
      name: 'PUFFER TECHNICAL JACKET',
      price: 51.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/fdc7/ef2f/1c888c5ccf709d6c2c411a6aa6752999?Expires=1665360000&Signature=OViunG3QhTP4n0URy3jA18XWf2i1FeqjitrqUjNI89R2I07Y0cI937nckn37P6StFTACDnwpce2I0bz9nz~uviqXuIm~4QZ7c0HAH5zOCFHIZ5LVioEyYiLygOrWMEF~zjxrlHkLdfQvKKxH3Cj85F9XFCqBmSqZ3eJtRtjW1qEmoV6BGBiA~MUVccWtgnmaEvzHm6iENhnc5HEZFWcTaPXxXVXXLrJGwpQtb-K1EyUxrv6145RRkTPH-AkT5Iy7qluUz1tdwfiASRZ9wiMbDyyvobGoqs-YIF4tvOfJDKg5Z49wOy7McIfLp2KhCscNyoRRAdoz7W5xIXn4I5g~3w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 6,
      name: 'BASIC DENIM BERMUDA SHORTS',
      price: 41.50 
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/75f9/80fb/6149b3d4da6acbe0bef0ef8718dd1586?Expires=1665360000&Signature=gRpfOmJUFQzQro0~7Fq~Hdhgp2z62URMy~3p0KELcTt4ZyJzVt-RRmW7qkyal9pQkjWvQMryhUIcqY7XPvADOsTD9YEjCJ-pm536y6l9MaXHJYXmQP2NCYmArg3CXtWOuuwo4fFI72mvneAObgb4sR2x3EurutH9HOCWcbR76VGEG4PtDKuVyY6fhoGVRhP3pcozKRPezpavfBzS2LPYgdGL4cg9zWhDBMYf9CD5NkkXMBGBaaUAIjo2qLQbh96NpLfU3PvfVK318KF1qk3~pjq-SqXNbk1N8DQTgozGFLcTaE6dEcIAHmL0u2-riumw7VKhtwvWF94YUtfXIxmRtQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 5,
      name: 'SLIM FIT CHINO BERMUDA SHORTS',
      price: 41.50
    },
    { 
      image: 'https://s3-alpha-sig.figma.com/img/350b/fe27/4a02143e3fdc78e8e45a3824d164db35?Expires=1665360000&Signature=ZqFFj6mXfxHCq9nQDakxA5Yr-0ZtN7vXdHAJf8nxAPqn2nEmTnem6hXWC6uqwLT7lLUcQFCWCtHby45KDKF8whr1dA38hJHOo-jzalhBm5Q6V1rdEP2UjkxNCQ0Gff-FSKKTyExsH~D2aYzXKlvMD7mpoQMkcDvohov4fUU-Fi-o0-9QmJoUd2LKe-eN7ONWHSQY3kTwHVgz3s9JZVdxES~I9Yd-J0YRhWBudElpEERL62Vj8suliecwV3EIBfma~FXvDC4CNwvM7c5clDuNlwDfO1R7E75kZTGOgP6nVxbpR5sbn8mi9L6R3frcXTGd6~R6vX0Bvk2xVv2nlRIn4A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 7,
      name: 'SKINNY CHINO TROUSERS',
      price: 42.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/cfc9/c021/5bce688bda3ad598060a2e5a24eb004f?Expires=1665360000&Signature=PCmya8hGpYIEoOolQC1T6PPfNlwkA8zTJi8j3BgEvOB7PvOKdpyc78TjK5HIGuHdEndJtc0ejSdWFw~3MWomEyLjBkYgajTnRomm7vzKtJdc1b1qWk7Q2AljWFUFcECf4S4phVJsR7HBGCuhg1FvimqeKX-Z~ifCLdQX4Ypi6v21j8IIYkTufJfVv4JfwY8K~mZCHQOthkamJphWswa3Jn-B4w2oo66zW-4gYAPvAD6poJuopWPkfZ3WbtpTuM16CnJVFsPk3nMc1Dswen05ihsVI46hxd5fYryekMorKdPB1XOlG4nNo5a1m8Cp-rMSDOexdLQoDT4~vjCDFPCBkw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 5,
      name: 'SOFT TEXTURED TROUSERS',
      price: 41.50
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/ae52/5efb/666b6b6fc9157fef13bf9e3e3e7819a9?Expires=1665360000&Signature=JXR7kbuYgp~551UncQTNAcF-F13FZYVD6O8syOPHSmQpJDoQgu3ZJ9MbCwGdQ2eZ6g5qb~u4ez-iRiMsh30n4Te2FJrv204BHe8lQZ3v0oN8JbA16EBghwcOPEu2NO0FuWOhZEQLvN6SRm7TE19JAOF2pWg19iFkJxQgXmAd9XlvhVMjv8xQd69CQ7y-I5ejEVp3ESLT6cljTha1kth5x8pQ-YejAlUS4kS8taFVWk2A5Oo1H4zt5MbfuP5x4nY7A-yhuf2Ju3Q1-2pgjOWMxnxrES0lzBfnlDy3MOGqxsG4zP7P8aNCkkeUNCMQRMegXP2zbRx6f8nhdgIN99nQ9Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      colors: 9,
      name: 'EASY CARE JOGGER WAIST TROUSERS',
      price: 44.50
    },
  ];
  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]">
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        <p className="">22 items found</p>
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px]">
          <h3>Sort by:</h3>
          <p className="text-[#F9AF5E] ml-2 sort-outline">Popular</p>
          <img src={DropDownIcon} alt="Drop down" className=" ml-4" />
        </div>
      </div>
      <hr className="black-line opacity-40 mt-[6px]" />
      {/* Filter */}
      <div className="flex mt-[23px] justify-between">
        <div className="flex gap-x-[49px]">
          <DropDownBox title="Color" />
          <DropDownBox title="Size" />
          <DropDownBox title="Prize" />
        </div>
        {/* Reset Filter */}
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px] w-[160px] justify-between">
          <h3>Reset Filter</h3>
          <img src={CloseIcon} alt="Close"/>
        </div>
      </div>
      {/* Products */}
      <div className=" grid grid-cols-4 mt-[74px] gap-x-[76px] gap-y-[78px]">
        {items.map((item,i) => <ProductThumbnail item={item}/>)}
      </div>
    </div>
  );
};

export default ProductsContainer;
