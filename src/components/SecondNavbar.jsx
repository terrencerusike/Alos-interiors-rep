import React, { useState } from "react";
import loogo from "./Assets/loogo.png";
import { Link } from "react-router-dom";
import "./SecondNavbar.css";
import cart_icon from "./Assets/cart_icon.png";
import { useProducts } from "./ShopContextShopContext";
import { useNavigate } from "react-router-dom";

function SecondNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { getTotalCartItems, categories } = useProducts();

  const handleCategoryClick = (categoryId) => {
    navigate(`/Shop/${categoryId}`);
    setIsServicesOpen(false);
    setIsOpen(false);
  };

  return (
    <nav>
      <div className="nav_container">
        <div className="nav_left">
          <Link to="/">
            {" "}
            <img src={loogo} alt="logo" />
          </Link>
        </div>
        <div className="nav_right">
          <ul className="nav_link_desktop">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/#about">About</Link>
            </li>
            <li
              className="services_item"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              Products <span className="arrow">▼</span>
              {isServicesOpen && (
                <ul className="services_dropdown">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>Blogs</li>
          </ul>
          <ul className="nav_link_desktop_right">
            <li className="nav_link_desktop_right_login">
              <Link to="/Signup">Login</Link>
            </li>

            <li
              style={{
                border: "1px solid #1473e2",
                padding: "8px 23px",
                borderRadius: "5px",
              }}
            >
              <Link to="/Contact">Contact</Link>
            </li>
            <li className="nav-cart">
              <Link to="/Cart">
                <img src={cart_icon} alt="cart" />
              </Link>
              <div className="nav-cart-count">{getTotalCartItems()}</div>
            </li>
          </ul>
          <div className="mobile_menu" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✕" : "☰"}
          </div>
          <div className={`mobile_nav ${isOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li
                className={`mobile_services_item ${
                  isServicesOpen ? "active" : ""
                }`}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Products <span className="arrow">▼</span>
                <ul
                  className={`mobile_services_dropdown ${
                    isServicesOpen ? "active" : ""
                  }`}
                >
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </li>
              <li>Blogs</li>
              <li>
                <Link to="/Signup" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/Contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/Cart" onClick={() => setIsOpen(false)}>
                  Cart ({getTotalCartItems()})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SecondNavbar;
