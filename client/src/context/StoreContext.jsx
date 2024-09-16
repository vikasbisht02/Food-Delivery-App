import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Add to Cart function
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } } // Use the correct Authorization header
        );
      } catch (error) {
        console.error("Error adding item to cart:", error.response?.data || error.message);
      }
    }
  };

  // Remove from Cart function
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } } // Use the correct Authorization header
        );
      } catch (error) {
        console.error("Error removing item from cart:", error.response?.data || error.message);
      }
    }
  };

  // Get total cart amount function
  const getTotalCartAmount = () => {
    if (!cartItems || !food_list) return 0; // Add a check to ensure cartItems and food_list are defined

    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (itemInfo) {
        return total + itemInfo.price * cartItems[itemId];
      }
      return total;
    }, 0);
  };

  // Fetch the food list from the API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []); // Ensure food_list is set to an empty array if data is undefined
    } catch (error) {
      console.error("Error fetching food list:", error.response?.data || error.message);
    }
  };

  // Load cart data if token is available
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Use the correct Authorization header
      );
      setCartItems(response.data.cartData || {}); // Ensure cartItems is set to an empty object if data is undefined
    } catch (error) {
      console.error("Error loading cart data:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
