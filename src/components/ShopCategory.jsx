import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";
import dropdown_icon from "./Assets/dropdown_icon.png";
import "./ShopCategory.css";
import Item from "./Item";

function ShopCategory(props) {
  const { id } = useParams(); // id from URL
  const { products, categories, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  // If no category ID is provided, show all products
  const filtered = id
    ? products.filter(
        (product) => product.category && String(product.category.id) === id
      )
    : products;

  // Find the current category object for display
  const category = id ? categories.find((cat) => String(cat.id) === id) : null;

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filtered.length}</span> out of {filtered.length}{" "}
          products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filtered.map((prod) => {
          return (
            <Item
              key={prod.id}
              id={prod.id}
              name={prod.name}
              image={prod.image}
              new_price={prod.price}
            />
          );
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default ShopCategory;
