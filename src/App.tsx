import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Frontpage from "./Pages/Frontpage";
import Singlepage from "./Pages/Singlepage";
import { ProductProvider } from "./components/ShopContextShopContext";
import Checkout from "./Pages/Checkout";
import LoginSignup from "./Pages/LoginSignup";
import Loginpage from "./Pages/Loginpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shop from "./Pages/Shop";
import men_banner from "./components/Assets/banner_mens.webp";
import Contactus from "./Pages/Contactus";

function App() {
  return (
    <ProductProvider>
      <Router>
        <ToastContainer />
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/product/:id" element={<Singlepage />} />
          <Route path="/Signup/" element={<LoginSignup />} />
          <Route path="/Cart/" element={<Checkout />} />
          <Route path="/Login/" element={<Loginpage />} />
          <Route path="/Shop" element={<Shop banner={men_banner} />} />
          <Route
            path="/Shop/:id"
            element={<Shop banner={men_banner} category="men" />}
          />
          <Route path="/Contact/" element={<Contactus />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
