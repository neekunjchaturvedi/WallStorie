import Navbar from "@/components/home-components/Navbar";
import { Hero } from "@/components/home-components/Hero";
import OurStorySection from "@/components/home-components/OurStory";
import OurCollections from "@/components/home-components/OurCollections";
import WhyChooseUs from "@/components/home-components/Chooseus";
import Footer from "@/components/home-components/Footer";
import { Bottomfoot } from "@/components/home-components/Bottomfoot";
import SchedulingSection from "@/components/home-components/Schedule";
import CommentSection from "@/components/home-components/Comments";
import { Hheader } from "@/components/home-components/header";
import InquiryPopup from "@/components/home-components/inquirypopup";
import { useEffect, useState } from "react";

// Import SEO component
import SEO from "@/components/common/SEO";

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

  // Schema.org structured data for the homepage
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "WallStorie",
    url: "https://www.wallstorie.in",
    logo: "https://www.wallstorie.in/images/logo.png",
    image: "https://www.wallstorie.in/images/og-image.jpg",
    description:
      "Shop premium wallpapers & wall decor at WallStorie. Trendy designs, easy installation & fast delivery across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "1st floor, Hanuman plywood complex, Beside PSR Convention centre, Kompally",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500014",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <SEO
        title="WallStorie | Premium Wallpapers & Wall Decor Online in India"
        description="Shop premium wallpapers & wall decor at WallStorie. Trendy designs, easy installation & fast delivery across India."
        keywords="wallpapers, wall decor, premium wallpapers India, bedroom wallpaper, living room wallpaper"
        image="https://www.wallstorie.in/images/og-image.jpg"
        url="https://www.wallstorie.in/"
        schema={schemaData}
      />

      <Hheader />
      <Navbar />
      <Hero />
      <OurStorySection />
      <OurCollections />
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
