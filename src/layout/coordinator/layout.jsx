import React from "react";
import Navbar from "../../components/ELEMENTS/Nav/Navbar";
import CoodSidebar from "../../components/ELEMENTS/Nav/CoodSidebar";

const CoordinatorLayout = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      <CoodSidebar />
      <Navbar />
      <div className="absolute top-[10vh] right-0 left-[20%] bottom-0 overflow-y-scroll overflow-x-hidden">
        {children}
      </div>
      <Navbar />
    </div>
  );
};

export default CoordinatorLayout;
