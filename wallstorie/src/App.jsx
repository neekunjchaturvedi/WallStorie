import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import OurStorySection from "./components/OurStory";
import OurCollections from "./components/OurCollections";
import WhyChooseUs from "./components/Chooseus";
import Footer from "./components/Footer";
import { Hheader } from "./components/header";
import { Bottomfoot } from "./components/Bottomfoot";
import Slider from "./components/Slider";
import SchedulingSection from "./components/Schedule";
import CommentSection from "./components/Comments";

function App() {
  const [count, setCount] = useState(0);

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
      <CommentSection />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default App;
