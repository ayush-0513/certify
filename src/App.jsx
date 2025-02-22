import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Profile,
  UploadCertificate,
  verification,
  about,
  Payment,
  Validate,
} from "./pages";
import { Sidebar, Navbar } from "./components";
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/uploadCertificate"
            element={<UploadCertificate />}
          ></Route>
          <Route path="/Payment" element={<Payment />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/Validate" element={<Validate />}></Route>
          {/* <Route path="/verification" element={<verification />}></Route> */}
          {/* <Route path="/about" element={<about />}></Route> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
