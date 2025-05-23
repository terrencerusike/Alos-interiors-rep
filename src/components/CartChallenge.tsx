import React, { useState } from "react";
import logo from "./Assets/logo.png";

const CartChallenge = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "T-shirt", price: 20 },
    { id: 2, name: "Sneakers", price: 60 },
    { id: 3, name: "Hat", price: 15 },
  ]);

  function handleRemove(id: number) {
    const filter = cart.filter((item) => {
      return item.id !== id;
    });

    setCart(filter);
  }

  return (
    <div style={{ padding: "20px" }}>
      <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleRemove(item.id)}
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

export default CartChallenge;
