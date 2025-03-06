import React from "react";
import Collab from "../home-components/artist/Collab";
import { Hheader } from "../home-components/header";
import Navbar from "../home-components/Navbar";
import Info from "../home-components/artist/Info";
import Howitworks from "../home-components/artist/Howitworks";
import ArtistCollaboration from "../home-components/artist/Join";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";

function Sellart() {
  return (
    <>
      <Hheader />
      <Navbar />
      <Info />
      <Collab />
      <Howitworks />
      <ArtistCollaboration />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default Sellart;
