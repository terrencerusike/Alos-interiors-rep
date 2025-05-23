import React, { useState } from "react";

const Addtocart = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Apple", price: 5 },
    { id: 2, name: "Banana", price: 3 },
    { id: 3, name: "Orange", price: 4 },
  ];

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove if quantity is 0

    setCart(updatedCart);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <strong>{product.name}</strong> - ${product.price}
          <button
            onClick={() => handleAddToCart(product)}
            style={{ marginLeft: "10px" }}
          >
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} × {item.quantity}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Addtocart;
