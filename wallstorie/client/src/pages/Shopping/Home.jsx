import Navbar from "@/components/home-components/Navbar";
import { Hero } from "@/components/home-components/Hero";
import OurStorySection from "@/components/home-components/OurStory";
import OurCollections from "@/components/home-components/OurCollections";
import WhyChooseUs from "@/components/home-components/Chooseus";
import Footer from "@/components/home-components/Footer";
import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import Slider from "@/components/home-components/Slider";
import SchedulingSection from "@/components/home-components/Schedule";
import CommentSection from "@/components/home-components/Comments";
import { Hheader } from "@/components/home-components/header";
import InquiryPopup from "@/components/home-components/inquirypopup";
import { useEffect, useState } from "react";

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("popupShown");

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);

        sessionStorage.setItem("popupShown", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Hheader />
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />
      {/* <Slider /> */}
      <WhyChooseUs />
      <SchedulingSection />

      <CommentSection />
      <Footer />
      <Bottomfoot />
      <InquiryPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}

export default Home;
