import React from "react";
import { BsCart4 } from "react-icons/bs";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { IoRibbonOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";

const Ads = () => {
  return (
    <div className="my-[80px]">
      <div className="flex xl:grid-cols-4  md:grid md:grid-cols-2 flex-col justify-between gap-10">
        <div className="flex flex-col gap-2 xl:max-w-[300px]">
          <BsCart4 className="text-4xl" />
          <p className="text-lg font-bold">Free Delivery</p>
          <p className="text-base">
            Shop a wide range of high-quality products, from fashion to
            electronics. Enjoy Free Delivery on all orders.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-[300px]">
          {" "}
          <RiPoliceBadgeLine className="text-4xl" />
          <p className="text-lg font-bold">100% Secure Payment</p>
          <p className="text-base">
            Enjoy 100% Secure Payment on all orders. Shop with confidence,
            knowing your transactions are safe and protected!
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-[300px]">
          {" "}
          <IoRibbonOutline className="text-4xl" />
          <p className="text-lg font-bold">Quality Guarantee</p>
          <p>
            Enjoy our Quality Guarantee on all orders. Shop with confidence,
            knowing every item meets the highest standards!
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-[300px]">
          {" "}
          <CiDollar className="text-4xl" />
          <p className=" text-lg font-bold">Daily offer</p>
          <p>Don't miss out on exclusive deals every day!</p>
        </div>
      </div>
    </div>
  );
};

export default Ads;
