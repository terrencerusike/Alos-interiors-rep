// src/components/CatalogSection.js
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";
import "./CatalogSection.css";

function CatalogSection() {
  const { categories, loading, error } = useProducts();

  console.log("Categories:", categories);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error}</p>;
  if (!categories || categories.length === 0) return <p>No categories found</p>;

  return (
    <div className="catalog-section">
      <div className="grid">
        {categories.map((category, index) => (
          <div key={category.id} className={`item item${index + 1}`}>
            <Link to={`/Shop/${category.id}`}>
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogSection;
