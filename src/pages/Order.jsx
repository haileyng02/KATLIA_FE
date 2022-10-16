import React from "react";
import OrderItem from "../components/OrderItem";

const Order = () => {
  const orderData = [
    {
      id: "LQNSU346JK",
      date: "September 27, 2022",
      statusID: 1,
      totalQty: 2,
      subTotal: 83.75,
      shipping: 2,
      totalPrice: 101.84,
      items: [
        {
          image:
            "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1666569600&Signature=ZV2VVP5Tlc2s2yJp4WXhgeF4LXxBSLPkFS-~v5mGs~j7wu0R2Cj4LossTM6l9BipRvu1VsK4ZEznO5WoBcWlUkTeUZKClsTZCe6LiyqKfwN6Uq6QySrQiw19zXgy6Mx5Tjs-QevpXcAe~gu1Rj3gAgBBJg8oGI0YZwvRJtXIvUNdwC5yxSCSlkBFGR6fCr6V7ByJx3pnlfT25EqmHuorrfeX9jcc4z1ulpUPo0m4fhHXNAdeg7wlZnDDH6Qqv78jHV4fd93aLaSSDz~2w4Q2u-rNNFae5yFLVHT1b1khoqVhIctgZ4EmVehxcAIywnlv3GWjPJv~AknSTyrX4TuAew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
          name: "FADED MINIMALIST T-SHIRT",
          price: 41.25,
        },
        {
          image:
            "https://s3-alpha-sig.figma.com/img/ea3b/179c/39ed87623ac25c793007f5edca37cd55?Expires=1666569600&Signature=dwpSy4bOMyQOBB5lRmg7A3CBOa21Hac2Rzg8JvFXjI9fvjfIoPrf1fq6s8~Hu~sYM6-Pa~adlnZY1R2Fl6aW1dCRuNex45s0c5Rgupjzkrj8Fn--QS5fxTH4JnCsoWI9D6Jb-QONMmx3p64mPXvI2J~87SjFl7Z~lSSCfbCqWB01JrywESQxB9syxj5B3MkLVU-cQ5FdNVoKoWq6YslA9nyBu3T6E9TRh99okZsaoHxYDgv~~J05YcetTb~OCOdE3su15VIu5tBgjoxVsdzUUX-PsfX4sfplOEqJoXhfSzSSX2abtOU4vMbtuJM6t9HirKpqXW6wnxY0835raGbaMQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
          name: "TULLE TOP WITH GATHERING",
          price: 42.5,
        },
      ],
    },
    {
      id: "SDG1345KJD",
      date: "September 28, 2022",
      statusID: 2,
      totalQty: 1,
      subTotal: 83.75,
      shipping: 2,
      totalPrice: 41.5,
      items: [
        {
          image:
            "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1666569600&Signature=ZV2VVP5Tlc2s2yJp4WXhgeF4LXxBSLPkFS-~v5mGs~j7wu0R2Cj4LossTM6l9BipRvu1VsK4ZEznO5WoBcWlUkTeUZKClsTZCe6LiyqKfwN6Uq6QySrQiw19zXgy6Mx5Tjs-QevpXcAe~gu1Rj3gAgBBJg8oGI0YZwvRJtXIvUNdwC5yxSCSlkBFGR6fCr6V7ByJx3pnlfT25EqmHuorrfeX9jcc4z1ulpUPo0m4fhHXNAdeg7wlZnDDH6Qqv78jHV4fd93aLaSSDz~2w4Q2u-rNNFae5yFLVHT1b1khoqVhIctgZ4EmVehxcAIywnlv3GWjPJv~AknSTyrX4TuAew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
          name: "FADED MINIMALIST T-SHIRT",
          price: 41.25,
        },
        {
          image:
            "https://s3-alpha-sig.figma.com/img/ea3b/179c/39ed87623ac25c793007f5edca37cd55?Expires=1666569600&Signature=dwpSy4bOMyQOBB5lRmg7A3CBOa21Hac2Rzg8JvFXjI9fvjfIoPrf1fq6s8~Hu~sYM6-Pa~adlnZY1R2Fl6aW1dCRuNex45s0c5Rgupjzkrj8Fn--QS5fxTH4JnCsoWI9D6Jb-QONMmx3p64mPXvI2J~87SjFl7Z~lSSCfbCqWB01JrywESQxB9syxj5B3MkLVU-cQ5FdNVoKoWq6YslA9nyBu3T6E9TRh99okZsaoHxYDgv~~J05YcetTb~OCOdE3su15VIu5tBgjoxVsdzUUX-PsfX4sfplOEqJoXhfSzSSX2abtOU4vMbtuJM6t9HirKpqXW6wnxY0835raGbaMQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
          name: "TULLE TOP WITH GATHERING",
          price: 42.5,
        },
      ],
    },
  ];
  return (
    <div>
      <h1 className="account-title">Order</h1>
      <div className="mt-[23px] flex flex-col gap-y-[12px]">
        {orderData.map((o, i) => (
          <OrderItem key={i} item={o} />
        ))}
      </div>
    </div>
  );
};

export default Order;
