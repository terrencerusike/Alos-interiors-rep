import React from "react";
import "./IntroSection_products.css";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";

function IntroSection_products() {
  const { products } = useProducts();

  console.log("Product data:", products); // <-- Here

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <div className="intro-section-products">
        <div className="all-intro-section-products">
          <div className="intro-section-products-header">
            <h1>
              Popular{" "}
              <span>
                <u style={{ color: "rgb(255, 149, 0)" }}>Collection</u>
              </span>
            </h1>
            <p className="intro-section-products-header-p">
              a curated selection of customer favorites and best-selling
              furniture pieces that combine style, comfort, and quality. From
              timeless classics to modern must-haves, these designs are loved by
              our shoppers for their beauty, functionality, and lasting appeal.
            </p>
          </div>
        </div>
        <div className="intro-section-products-right">
          {featuredProducts.map((product) => {
            console.log(
              "Image URL for product",
              product.id,
              ":",
              product.image
            );
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="intro-section-products-right-item">
                  <span>SAVE 20%</span>
                  <img src={product.image} alt={product.name} />
                  <p className="title">{product.name}</p>
                  <p className="price">R{product.price}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link to="/Shop" className="intro-section-text">
          View All &gt;
        </Link>
      </div>
    </div>
  );
}

export default IntroSection_products;
