import { useState } from "react";

import "./App.css";
import Navbar from "./home-components/Navbar";
import { Hero } from "./home-components/Hero";
import OurStorySection from "./home-components/OurStory";
import OurCollections from "./home-components/OurCollections";
import WhyChooseUs from "./home-components/Chooseus";
import Footer from "./home-components/Footer";
import { Hheader } from "./home-components/header";
import { Bottomfoot } from "./home-components/Bottomfoot";
import Slider from "./home-components/Slider";
import SchedulingSection from "./home-components/Schedule";
import CommentSection from "./home-components/Comments";
import Makeyours from "./home-components/Makeyours";

function App() {
  return (
    <>
      <Hheader />
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />
      <Slider />
      <WhyChooseUs />
      <SchedulingSection />
      <Makeyours />
      <CommentSection />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default App;
