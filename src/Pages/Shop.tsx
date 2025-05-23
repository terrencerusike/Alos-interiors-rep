import React from "react";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import ShopCategory from "../components/ShopCategory";

interface ShopProps {
  banner: string;
  category?: string;
}

const Shop: React.FC<ShopProps> = ({ banner, category }) => {
  return (
    <div>
      <SecondNavbar />
      <ShopCategory banner={banner} category={category} />
      <Footer />
    </div>
  );
};

export default Shop;
