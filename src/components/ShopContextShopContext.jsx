// src/context/ProductContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productRes = await fetch(
          `https://alos-strapi-repo-3.onrender.com/api/products?populate=*`
        );
        const productData = await productRes.json();
        console.log("Fetch response:", productData);

        if (productData.data) {
          const formattedProducts = productData.data.map((item) => {
            const imageObj = item.images?.[0];
            const mediumImage = imageObj?.formats?.medium?.url;
            const originalImage = imageObj?.url;

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              description: item.description,
              image: mediumImage
                ? `https://alos-strapi-repo-3.onrender.com${mediumImage}`
                : originalImage
                ? `https://alos-strapi-repo-3.onrender.com${originalImage}`
                : "/fallback-image.png",
              category: item.category,
            };
          });

          setProducts(formattedProducts);
        }

        // Fetch categories
        const categoryRes = await fetch(
          "https://alos-strapi-repo-3.onrender.com/api/categories",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!categoryRes.ok) {
          throw new Error(`HTTP error! status: ${categoryRes.status}`);
        }

        const categoryData = await categoryRes.json();
        console.log("Category response:", categoryData);

        if (categoryData.data) {
          const formattedCategories = categoryData.data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            image: cat.image,
          }));

          setCategories(formattedCategories);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
        toast.error(`Failed to fetch products or categories: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success("Item removed");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Item added to cart!");
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        cart,
        addToCart,
        removeFromCart,
        getTotalCartItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
