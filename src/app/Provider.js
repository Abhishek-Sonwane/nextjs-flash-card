import Header from "@/_components/Header";
import React from "react";
import { ToastContainer } from "react-toastify";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Provider;
