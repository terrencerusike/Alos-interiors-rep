import React from "react";
import CartItems from "../components/CartItems";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";

function Checkout() {
  return (
    <div>
      <SecondNavbar />
      <CartItems />
      <Footer />
    </div>
  );
}

export default Checkout;
