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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hheader />
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />

      <WhyChooseUs />
      <Footer />
      <Bottomfoot />
    </>
  );
}

export default App;
