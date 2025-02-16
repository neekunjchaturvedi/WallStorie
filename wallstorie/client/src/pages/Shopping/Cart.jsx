import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import Footer from "@/components/home-components/Footer";
import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import CartPage from "@/components/shopping/slidingcart";
import React from "react";

function Cart() {
  return (
    <>
      <Hheader />
      <Navbar />
      <CartPage />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default Cart;
