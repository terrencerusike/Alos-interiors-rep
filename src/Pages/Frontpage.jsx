import React from "react";
import IntroSection from "../components/IntroSection";
import IntroSection_products from "../components/IntroSection_products";
import CatalogSection from "../components/CatalogSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Frontpage() {
  return (
    <div>
      <Navbar />
      <IntroSection />
      <IntroSection_products />
      <CatalogSection />
      <Footer />
    </div>
  );
}

export default Frontpage;
