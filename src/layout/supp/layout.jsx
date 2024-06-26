import React from "react";
import Navbar from "../../components/ELEMENTS/Nav/Navbar";
import SupeSidebar from '../../components/ELEMENTS/Nav/SupeSidebar';
import Footer from '../../components/ELEMENTS/Nav/Footer';


const SuppLayout = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      <SupeSidebar />
      <Navbar />
      <div className="absolute top-[10vh] right-0 left-[20%] bottom-0 overflow-y-scroll overflow-x-hidden">
        {children}
      </div>
      <Footer />

    </div>
  );
};

export default SuppLayout;
