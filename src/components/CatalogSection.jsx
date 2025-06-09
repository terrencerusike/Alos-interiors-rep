// src/components/CatalogSection.js
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./ShopContextShopContext";
import "./CatalogSection.css";

function CatalogSection() {
  const { categories, loading, error } = useProducts();

  console.log("Categories:", categories); // Debug log

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error}</p>;
  if (!categories || categories.length === 0) return <p>No categories found</p>;

  // Define the category positions and their corresponding indices
  const categoryPositions = [
    { index: 5, className: "item1" },
    { index: 1, className: "item2" },
    { index: 2, className: "item3" },
    { index: 3, className: "item4" },
    { index: 4, className: "item5" },
    { index: 0, className: "item6" },
  ];

  return (
    <div className="catalog-section">
      <div className="grid">
        {categoryPositions.map(({ index, className }) => {
          const category = categories[index];
          return category ? (
            <div key={category.id} className={`item ${className}`}>
              <Link to={`/Shop/${category.id}`}>
                <p>{category.name}</p>
              </Link>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default CatalogSection;
