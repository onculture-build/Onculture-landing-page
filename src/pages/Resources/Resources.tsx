import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../layouts/Home/Footer";

const Resources = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Resources;
