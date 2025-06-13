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

  // Define the intended order for categories to match background images
  const orderedCategoryNames = [
    "Sales", // item1
    "Dining Room", // item2
    "Accessories", // item3
    "Bedroom", // item4
    "Living Room", // item5
    "Office", // item6
  ];

  // Match categories to that order
  const sortedCategories = orderedCategoryNames
    .map((name) => categories.find((cat) => cat.name === name))
    .filter(Boolean); // remove undefined if a name is not found

  return (
    <div className="catalog-section">
      <div className="grid">
        {sortedCategories.map((category, index) => (
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
