import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import OurStorySection from "./components/OurStory";
import OurCollections from "./components/OurCollections";
import WhyChooseUs from "./components/Chooseus";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />
      <WhyChooseUs />
      <Footer/>
    </>
  );
}

export default App;
