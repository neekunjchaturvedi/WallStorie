import React from "react";
import { Hheader } from "../home-components/header";
import { Outlet } from "react-router-dom";

function Storie() {
  return (
    <>
      <Hheader />
      <Outlet />
    </>
  );
}

export default Storie;
