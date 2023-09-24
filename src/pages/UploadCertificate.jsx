import React, { useState } from "react";
import { CustomButton, FormField, Loader } from "../components";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import FormData from "form-data";
import { useStateContext } from "../context";
const UploadCertificate = () => {
  const navigate = useNavigate();

  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MDJlMjExNC00NTMwLTRlMDYtODlkMy1hMGVmMzc1NzIxZDIiLCJlbWFpbCI6ImFyanVub21yYXlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkzZWM2ZTUzZDRhODM1NWY4MjU5Iiwic2NvcGVkS2V5U2VjcmV0IjoiZmMxNzY4OTU1N2VjZWJjMTg3ZjcwNzczMjRkNTIyZmVmMWVjNzJhNWRhNjQ2YjdiM2IyNmEyY2EwYWE1ZTc4NSIsImlhdCI6MTY5NTEwMTkyOX0.zW1hN_0tn1prI-y4quZs-xGXo8vkeoyVasMEOj04jGU";
  const isLoading = false;
  const { issueCertificate, getCertificate } = useStateContext();
  const [form, setForm] = useState({
    recipient: "",
    certificateType: "",
    issueDate: "",
    ipfsHash: "",
  });

  let certificateImage;
  const imageUploaded = async (e) => {
    certificateImage = e.target.files[0];
    console.log(certificateImage);
    const formData = new FormData();
    formData.append("file", certificateImage);
    const headers = {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      Authorization: `Bearer ${JWT}`,
    };
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers,
        }
      );
      console.log(res.data);
      handleFormFieldChange("ipfsHash", res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormFieldChange = (fieldName, e) => {
    if (fieldName === "ipfsHash") {
      setForm({ ...form, [fieldName]: e });
    } else {
      setForm({ ...form, [fieldName]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...form });
    await issueCertificate({ ...form });
    navigate("/");
  };
  const demo = async () => {
    await getCertificate();
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Upload Certificate
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Recipient address *"
            placeholder="0xaaaaaaaaaaaaaaa"
            inputType="text"
            value={form.recipient}
            handleChange={(e) => handleFormFieldChange("recipient", e)}
          />
          <FormField
            labelName="Certificate Type *"
            placeholder="E.g. Blockchain basic Course"
            inputType="text"
            value={form.certificateType}
            handleChange={(e) => handleFormFieldChange("certificateType", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Issue Date *"
            placeholder="Issue Date"
            inputType="date"
            value={form.issueDate}
            handleChange={(e) => handleFormFieldChange("issueDate", e)}
          />
        </div>

        <FormField
          labelName="Certificate Image *"
          placeholder="Upload your certificate"
          inputType="file"
          value={certificateImage}
          handleChange={(e) => imageUploaded(e)}
        />

        <FormField
          labelName="IPFS Hash *"
          placeholder=""
          inputType="text"
          value={form.ipfsHash}
          readOnly={true}
          handleChange={(e) => handleFormFieldChange("ipfsHash", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="upload"
            title="Upload Certificate"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
      <button onClick={demo}>getCertificate</button>
    </div>
  );
};

export default UploadCertificate;
