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
import Makeyours from "@/components/home-components/Makeyours";

function Home() {
  return (
    <>
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

export default Home;
