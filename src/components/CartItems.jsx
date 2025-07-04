import "./CartItems.css";
import { useProducts } from "./ShopContextShopContext";
import remove_icon from "./Assets/cart_cross_icon.png";
import { useState } from "react";
import OrderForm from "./OrderForm";

const CartItems = () => {
  const { cart, products, removeFromCart } = useProducts();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const getTotalCartAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function remove(id) {
    removeFromCart(id);
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cart.map((e) => (
        <div key={e.id}>
          <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className="carticon-product-icon" />
            <p>{e.name}</p>
            <p>${e.price}</p>
            <button className="cartitems-quantity">{e.quantity}</button>
            <p>${e.price * e.quantity}</p>
            <img
              className="cartitems-remove-icon"
              onClick={() => remove(e.id)}
              src={remove_icon}
              alt=""
            />
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount}</h3>
            </div>
          </div>
          <button
            className="checkout-button"
            onClick={() => setShowOrderForm(true)}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          cartItems={cart}
          totalAmount={getTotalCartAmount}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
};

export default CartItems;
