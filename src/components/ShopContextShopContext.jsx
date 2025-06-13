import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STRAPI_BASE_URL = "https://alos-strapi-repo-3.onrender.com";

  // Ensure HTTPS
  const getSecureImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http://") ? url.replace("http://", "https://") : url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(
            `${STRAPI_BASE_URL}/api/products?populate=*&timestamp=${Date.now()}`
          ),
          fetch(
            `${STRAPI_BASE_URL}/api/categories?populate=*&timestamp=${Date.now()}`
          ),
        ]);

        if (!prodRes.ok || !catRes.ok) {
          throw new Error(
            `HTTP error! Products: ${prodRes.status}, Categories: ${catRes.status}`
          );
        }

        const { data: rawProducts } = await prodRes.json();
        const { data: rawCategories } = await catRes.json();

        const formattedProducts = rawProducts.map((item) => {
          const source = item.attributes ?? item;
          const { id, name, price, description, category, image } = source;

          let rawUrl = null;
          if (image?.data) {
            rawUrl = image.data.attributes?.url;
          } else if (Array.isArray(image?.data)) {
            rawUrl = image.data[0]?.attributes?.url;
          }

          if (rawUrl?.startsWith("/")) {
            rawUrl = `${STRAPI_BASE_URL}${rawUrl}`;
          }

          const secureImageUrl = getSecureImageUrl(rawUrl);

          return {
            id,
            name,
            price,
            description,
            image: secureImageUrl || "/fallback-image.png",
            category: category?.data?.attributes ?? category,
          };
        });

        const formattedCategories = rawCategories.map((item) => {
          const source = item.attributes ?? item;
          const { id, name, image } = source;

          let rawUrl = null;
          if (image?.data) {
            rawUrl = image.data.attributes?.url;
          } else if (Array.isArray(image?.data)) {
            rawUrl = image.data[0]?.attributes?.url;
          }

          if (rawUrl?.startsWith("/")) {
            rawUrl = `${STRAPI_BASE_URL}${rawUrl}`;
          }

          const secureImageUrl = getSecureImageUrl(rawUrl);

          return {
            id,
            name,
            image: secureImageUrl || "/category-fallback.png",
          };
        });

        setProducts(formattedProducts);
        setCategories(formattedCategories);
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
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success("Item added to cart!");
  };

  const getTotalCartItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

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
