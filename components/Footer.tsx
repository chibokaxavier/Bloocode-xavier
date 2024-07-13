"use client";
import React, { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <footer className="flex flex-col  text-yellow-600 ">
      <div className="flex xl:flex-row flex-col gap-[100px] items-center mx-auto px-2  py-20">
        <div className="flex flex-col gap-4">
          <p className="text-[45px] font-normal">
            Get <span className="italic">20% OFF</span> on{" "}
          </p>
          <span className="text-[45px]  font-normal">Your First Purchase</span>
          <p className="text-xl font-normal">
            Sign Up for our newsletter and never miss any offers
          </p>
        </div>
        <div className="flex-col flex gap-10">
          <input
            type="email"
            className=" w-[400px] bg-black text-white  h-[70px] px-4 rounded-md"
            placeholder="Enter your Email address "
          />
          <button className="bg-black h-[70px] w-[400px] text-white rounded-md">
            REGISTER IT NOW
          </button>
        </div>
      </div>

      <div className="flex  xl:flex-row flex-col justify-evenly pt-20 pb-5 px-5 bg-black">
        <div className="pb-20">
          <p className="text-4xl pb-3 font-bold">BlooCodeTech</p>
          <div className="xl:justify-between gap-4  flex">
            <FaFacebookF />
            <FaInstagram />
            <FaPinterest />
            <FaYoutube />
            <FaTwitter />
          </div>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 pb-10">
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">Quick Links</p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Home
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              About us
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Offer
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Services{" "}
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Contact us
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">About</p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              How it works
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Our packages
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Promotions
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Refer a friend{" "}
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-10 font-bold text-white">Help Center</p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Payments
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Shipping
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Product Returns
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              FAQs{" "}
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Check out
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Other issues
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
