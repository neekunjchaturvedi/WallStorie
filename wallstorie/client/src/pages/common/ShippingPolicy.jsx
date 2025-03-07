import Shipping from "@/components/common/Shipping";
import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import Footer from "@/components/home-components/Footer";
import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import React from "react";

function ShippingPolicy() {
  return (
    <>
      <Hheader />
      <Navbar />
      <Shipping />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default ShippingPolicy;
