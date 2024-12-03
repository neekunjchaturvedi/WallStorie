import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import OurStorySection from "./components/OurStory";
import OurCollections from "./components/OurCollections";
import WhyChooseUs from "./components/Chooseus";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />
      <WhyChooseUs />
    </>
  );
}

export default App;
