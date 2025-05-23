import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "./Assets/star_icon.png";
import star_dull_icon from "./Assets/star_dull_icon.png";
import mobicred from "./Assets/mobicred.webp";
import mastercard from "./Assets/mastercard.png";
import ozow from "./Assets/ozow.png";
import productbig from "./Assets/productbig.png";
import { useParams } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";

const ProductDisplay = () => {
  const { id } = useParams();
  const { products, addToCart } = useProducts();
  const product = products.find((product) => product.id === parseInt(id));

  // Get all categories for this product
  const getCategories = () => {
    if (!product || !product.category) return "Uncategorized";

    // If category is an object (from API), use its name
    if (typeof product.category === "object" && product.category.name) {
      return product.category.name;
    }

    // If category is a string, use it directly
    if (typeof product.category === "string") {
      return product.category;
    }

    return "Uncategorized";
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            R{product.pricewas || product.price + 20}
          </div>
          <div className="productdisplay-right-price-new">R{product.price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Safe & Secure Checkout</h1>
          <div className="productdisplay-right-sizes">
            <div>
              <img src={ozow} alt="logo" />
            </div>
            <div>
              <img src={mastercard} alt="logo" />{" "}
            </div>
            <div>
              <img src={ozow} alt="logo" />
            </div>
          </div>
        </div>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
