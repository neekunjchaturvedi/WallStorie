import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import Footer from "@/components/home-components/Footer";
import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import Privacyrules from "@/components/home-components/reachout/privacypolicy";

import React from "react";

function Privacy() {
  return (
    <>
      <Hheader />
      <Navbar />
      <Privacyrules />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default Privacy;
