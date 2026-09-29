// src/context/CartContext.js
import { createContext, useContext, useState, useEffect, useRef } from "react";
import api from "../api"; // 👈 api.js import kar liya jo Render URL use karta hai

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const isInitialLoad = useRef(true);

  // 🔁 Watch for localStorage userId changes (e.g. login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedId = localStorage.getItem("userId");
      setUserId(storedId || null);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fetch cart from backend when userId changes using api.js
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await api.get(`/cart/${userId}`);
        setCartItems(res.data?.items || []);
        console.log("🛒 Cart fetched from backend:", res.data?.items);
      } catch (error) {
        console.error("❌ Failed to fetch cart:", error.message);
      }
    };

    fetchCart();
  }, [userId]);

  // ✅ Sync cart to backend when cartItems change using api.js
  useEffect(() => {
    if (!userId) return;
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const syncCart = async () => {
      try {
        await api.post(`/cart/${userId}`, {
          items: cartItems,
        });
        console.log("🛒 Cart synced to backend");
      } catch (error) {
        console.error("❌ Failed to save cart:", error.message);
      }
    };

    syncCart();
  }, [cartItems, userId]);

  // ✅ Add item to cart
  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedUserId = localStorage.getItem("userId");

    if (!user || !storedUserId) {
      alert("⚠️ Please login to add items to cart.");
      return;
    }

    setCartItems((prev) => {
      const exists = prev.find((item) => item.productId === product._id);
      if (exists) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    alert("✅ Product added to cart!");
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);