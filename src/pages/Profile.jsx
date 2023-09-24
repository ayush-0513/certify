import React, { useState } from "react";
import { search } from "../assets";
import { useStateContext } from "../context";
import { FormField } from "../components";
import { useAddress } from "@thirdweb-dev/react";
const Profile = () => {
  const { getCertificateByAddress } = useStateContext();
  const address = useAddress();
  let data = "first click on the search button";
  const getCall = async () => {
    try {
      console.log("hello mr how do u do");
      data = await getCertificateByAddress(address);
      // console.log(form);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const showCertificate = () => {
    const allCertificate = document.querySelector(".all-certificates");
    allCertificate.innerHTML = toString(data);
    console.log(data);
  };
  const handleFormFieldChange = (e) => {
    setAdd(add, e.target.value);
    console.log(add);
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          All certificate
        </h1>
      </div>
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] my-10">
        <FormField
          placeholder="address"
          inputType="text"
          handleChange={(e) => handleFormFieldChange(e)}
        />

        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={getCall}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[40px] object-contain"
          />
        </div>
      </div>
      <div className="all-certificates">
        <button onClick={showCertificate}>Get certificate</button>
      </div>
    </div>
  );
};

export default Profile;
