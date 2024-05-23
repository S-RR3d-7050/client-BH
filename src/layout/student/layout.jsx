import React from "react";
import Navbar from "../../components/ELEMENTS/Nav/Navbar";
import SideBar from "../../components/ELEMENTS/Nav/SideBar";

const StudentLayout = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      <SideBar />
      <Navbar />
      <div className="absolute top-[10vh] right-0 left-[20%] bottom-0 overflow-y-scroll overflow-x-hidden">
        {children}
      </div>
      <Navbar />

    </div>
  );
};

export default StudentLayout;
