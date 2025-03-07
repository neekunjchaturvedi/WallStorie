import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import Footer from "@/components/home-components/Footer";
import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import TermsAndConditions from "@/components/home-components/reachout/Termsandconditions";
import React from "react";

function Termsandcondition() {
  return (
    <>
      <Hheader />
      <Navbar />
      <TermsAndConditions />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default Termsandcondition;
