import React from "react";
import { Hheader } from "../home-components/header";
import Navbar from "../home-components/Navbar";
import ContactSection from "../home-components/reachout/reach";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";

function Reachout() {
  return (
    <>
      <Hheader />
      <Navbar />
      <ContactSection />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default Reachout;
