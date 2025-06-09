import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";
import "./CatalogSection.css";

function CatalogSection() {
  const { categories, loading } = useProducts();
  console.log("Categories:", categories);

  if (loading) return <p>Loading categories...</p>;

  // Helper to find a category by name
  const getCategory = (name) => categories.find((cat) => cat.name === name);

  // Grab each category safely by name
  const accessories = getCategory("Accessories");
  const bedroom = getCategory("Bedroom");
  const dining = getCategory("Dining Room");
  const living = getCategory("Living Room");
  const office = getCategory("Office");
  const sales = getCategory("Sales");

  return (
    <div className="catalog-section">
      <div className="grid">
        {accessories && (
          <div className="item item1">
            <Link to={`/Shop/${accessories.id}`}>
              <p>{accessories.name}</p>
            </Link>
          </div>
        )}
        {bedroom && (
          <div className="item item2">
            <Link to={`/Shop/${bedroom.id}`}>
              <p>{bedroom.name}</p>
            </Link>
          </div>
        )}
        {dining && (
          <div className="item item3">
            <Link to={`/Shop/${dining.id}`}>
              <p>{dining.name}</p>
            </Link>
          </div>
        )}
        {living && (
          <div className="item item4">
            <Link to={`/Shop/${living.id}`}>
              <p>{living.name}</p>
            </Link>
          </div>
        )}
        {office && (
          <div className="item item5">
            <Link to={`/Shop/${office.id}`}>
              <p>{office.name}</p>
            </Link>
          </div>
        )}
        {sales && (
          <div className="item item6">
            <Link to={`/Shop/${sales.id}`}>
              <p>{sales.name}</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogSection;
