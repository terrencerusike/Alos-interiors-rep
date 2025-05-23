import React, { useEffect } from "react";
import ProductDisplay from "../components/ProductDisplay";
import SecondNavbar from "../components/SecondNavbar";
import DescriptionBox from "../components/DescriptionBox";
import Footer from "../components/Footer";
import RecentProducts from "../components/RecentProducts";
import { useParams } from "react-router-dom";

function Singlepage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <SecondNavbar />
      <ProductDisplay />
      <DescriptionBox />
      <RecentProducts currentProductId={parseInt(id)} />
      <Footer />
    </div>
  );
}

export default Singlepage;
