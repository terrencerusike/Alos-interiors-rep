// src/components/CatalogSection.js
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";
import "./CatalogSection.css";

function CatalogSection() {
  const { categories, loading } = useProducts();

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="catalog-section">
      <div className="grid">
        {categories[11] && (
          <div className="item item1">
            <Link to={`/Shop/${categories[11].id}`}>
              <p>{categories[11].name}</p>
            </Link>
          </div>
        )}
        {categories[1] && (
          <div className="item item2">
            <Link to={`/Shop/${categories[1].id}`}>
              <p>{categories[1].name}</p>
            </Link>
          </div>
        )}
        {categories[2] && (
          <div className="item item3">
            <Link to={`/Shop/${categories[2].id}`}>
              <p>{categories[2].name}</p>
            </Link>
          </div>
        )}
        {categories[3] && (
          <div className="item item4">
            <Link to={`/Shop/${categories[3].id}`}>
              <p>{categories[3].name}</p>
            </Link>
          </div>
        )}
        {categories[4] && (
          <div className="item item5">
            <Link to={`/Shop/${categories[4].id}`}>
              <p>{categories[4].name}</p>
            </Link>
          </div>
        )}
        {categories[0] && (
          <div className="item item6">
            <Link to={`/Shop/${categories[0].id}`}>
              <p>{categories[0].name}</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogSection;
